import { Text, View, TextInput, Pressable, Modal, Alert } from "react-native";
import { SectorProps, Weekday } from "../types/types";
import React, { useState, useEffect, useRef } from "react";
import { styles } from "../styles";
import CheckBox from "expo-checkbox";
import { decimalToTime, toDecimalHours } from "../utils/timeConversion";
import { WEEKDAY_LABELS, weekdaysOrdered } from "../types/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorSelector from "../components/ColorPicker";
import { confirmContrast } from "../utils/confirmColorContrast";
import { useSectors } from "../hooks/useSectors";
import { useSectorState } from "../hooks/useSectorState"

const EditSector = ({ sector, setSectorToEdit }: SectorProps) => {
    const { id: sectorId, name: sectorName, color: sectorColor } = sector;
    const { sectors, addSector, updateSector } = useSectors();
    const [currentlyEditingTime, setCurrentlyEditingTime] = useState<{day: Weekday, type: 'start' | 'end'} | null>(null);

    const fullSector = sectors.find(s => s.id === sectorId);
    const sectorSchedule = fullSector ? fullSector.activeDays : [];
    const newSector = sectorId === 0;

    const [name, setName] = useState(newSector ? "" : sectorName);
    const initialScheduleRef = useRef(() => {
        const fullSector = sectors.find(s => s.id === sectorId);
        return fullSector ? [...fullSector.activeDays] : [];
    });
    const [schedule, setSchedule] = useState(initialScheduleRef.current);
    const [color, setColor] = useState(sectorColor ? sectorColor : '#ffffff');
    const [showColorPanel, setShowColorPanel] = useState(false);
    const [editingDate, setEditingDate] = useState<Date | null>(null);

    const [selectedDays, setSelectedDays] = useState(newSector ? [] : schedule.map(s => s.day));

    const [modalVisible, setModalVisible] = useState(false);
    const [initialSector, setInitialSector] = useState({
            id: sectorId,
            name: sectorName,
            color: sectorColor ?? '#ffffff',
            activeDays: sectorSchedule
        });

    const { sectorEdited, setSectorEdited, sectorSaved, setSectorSaved, setShowTabs } = useSectorState();

    const inputRef = useRef<TextInput>(null);

    const reset = () => {
        setSectorToEdit(undefined);
        setSectorEdited(false);
        setSectorToEdit(undefined);
        setShowTabs(true);
        setInitialSector({
            id: sectorId,
            name: sectorName,
            color: sectorColor ?? '#ffffff',
            activeDays: sectorSchedule
        })
    };

    useEffect(() => {
        if (newSector) {
            const edited = name !== "" || color !== "#ffffff" || schedule.length > 0;
            setSectorEdited(edited);
            if (edited) {
                setSectorSaved(false);
                setShowTabs(false);
            };
            return;
        }

        let edited = false;

        if (name !== initialSector.name) edited = true;
        if (color !== initialSector.color) edited = true;

        if (schedule.length !== initialSector.activeDays.length) edited = true;

        if (!edited) {
            const length = Math.min(schedule.length, initialSector.activeDays.length);
            for (let i = 0; i < length; i++) {
                const s1 = schedule[i];
                const s2 = initialSector.activeDays[i];
                if (!s2) continue;
                if (s1.day !== s2.day || s1.start !== s2.start || s1.end !== s2.end) {
                    edited = true;
                    break;
                }
            }
        }

        setSectorEdited(edited);

        if (edited) {
            setShowTabs(false);
            setSectorSaved(false);
        };
    }, [name, color, schedule, initialSector, newSector]);

    useEffect(() => {
        if (modalVisible) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [modalVisible]);

    const saveSector = () => {
        const saveOrUpdateSector = () => {
            if (newSector) {
                addSector({ name, activeDays: schedule, color})
            } else {
                updateSector({ id: sectorId, name, activeDays: schedule, color });
            };

            setSectorSaved(true);

            Alert.alert(
                newSector ? "Sektori tallennettu onnistuneesti!" : "Muutokset tallennettu" , "",
            [{text: "OK", style: "default", onPress: () => {reset()}}])
        };

        if (!name || !color || schedule.length === 0) {
            Alert.alert(
                "Pakollisia tietoja puuttuu!",
                "Valitse sektorille nimi, väri sekä viikkoaikataulu.",
            [{text: "OK", style: "default", onPress: () => {}}])
            return;
        } else if (!newSector && !sectorId) {
            Alert.alert(
                "VIRHE",
                "Palaa edelliseen näkymään ja yritä valita muokattava sektori uudelleen. Mikäli virhe toistuu, poista muokattava sektori ja syötä aikataulu uudelleen.",
            [{text: "OK", style: "default", onPress: () => {}}])
            return;
        }

        if (!confirmContrast(color)) {
            Alert.alert(
                "Valittu väri on vaalea.",
                "Varmista, että asettamasi väri on riittävän erottuva. Voit muokata väriä tarvittaessa myöhemmin. Haluatko jatkaa tallentamista vai valita uuden värin?",
            [{
                    text: "Jatka tallentamista",
                    style: "default",
                    onPress: () => saveOrUpdateSector()
                },
                {
                    text: "Valitse uusi väri",
                    style: "default",
                    onPress: () => setShowColorPanel(true)
                }
            ])

        return;
        }

        saveOrUpdateSector();
    };

    const cancelSectorEdit = () => {
        if (!sectorSaved && sectorEdited) {
            Alert.alert(
                "Muutoksia ei ole tallennettu.",
                "Haluatko poistua tallentamatta?",
            [{
                    text: "Hylkää muutokset",
                    style: "destructive",
                    onPress: () => {
                        setSectorSaved(true);
                        setSectorEdited(false);
                        setShowTabs(true);
                        setSectorToEdit(undefined)
                    }
                },
                {
                    text: "Peruuta",
                    style: "default",
                    onPress: () => {}
                }
            ])
        } else if (!sectorEdited) {
            setShowTabs(true);
            setSectorToEdit(undefined);
        }
    };

    const startEditingTime = (day: Weekday, type: 'start' | 'end') => {
        const scheduleItem = schedule.find(s => s.day === day);
        const hours = type === 'start' ? Math.floor(scheduleItem?.start ?? 8) : Math.floor(scheduleItem?.end ?? 17);
        const minutes = type === 'start' ? Math.round(((scheduleItem?.start ?? 8) % 1) * 60) : Math.round(((scheduleItem?.end ?? 17) % 1) * 60);
        setCurrentlyEditingTime({ day, type });
        setEditingDate(new Date(new Date().setHours(hours, minutes, 0, 0)));
    };

    return (
        <>
            <View style={styles.sectorsRow}>
                <ColorSelector showColorPanel={showColorPanel} setShowColorPanel={setShowColorPanel} color={color} setColor={setColor} name={name} />
                    <View style={{...styles.editColOne, width: '25%'}}>
                        <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}} onPress={() => setShowColorPanel(true)}>
                            <Text style={styles.sectorEdit}>Väri:</Text>
                            <View style={[styles.colorBox, { backgroundColor: color }]} />
                        </Pressable>
                    </View>

                <View style={{ ...styles.editColTwo, width: '75%' }}>
                    <Text style={{ ...styles.sectorEdit, width: '18%' }}>Nimi:</Text>

                    <Pressable
                        style={{ ...styles.sectorEditText, width: '80%', justifyContent: 'center' }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{textAlign: 'center'}}>{name}</Text>
                    </Pressable>

                    <View style={{ width: '1%' }} />
                </View>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#00000088",
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                backgroundColor: "#ffffff",
                                padding: 20,
                                borderRadius: 8,
                            }}
                        >
                            <TextInput
                                ref={inputRef}
                                value={name}
                                onChangeText={setName}
                                placeholder={name ? name : "Sektorin nimi"}
                                style={{ borderBottomWidth: 1, padding: 8 }}
                            />

                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{...styles.lockButton, alignSelf: 'center', backgroundColor: 'lightblue', marginTop: 20}}
                            >
                                <Text>Tallenna nimi</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>       
            </View>

            <View style={styles.sectorsRow}>
                <View style={styles.editColOne}>
                    <Text style={styles.sectorEdit}>Päivät:</Text>
                </View>

                <View style={{...styles.editColTwo, width: '47%'}}>
                    <Text style={styles.sectorEdit}>Aika:</Text>
                </View>
            </View>

            <View style={styles.sectorsRow}>
                <View style={{ ...styles.editTimeColumn, marginStart: 15 }}>
                    {weekdaysOrdered.map((day, i) => {
                        const daySchedule = schedule.filter(s => s.day === day);
                        const disabled = !selectedDays.includes(day);

                        return (
                            <View key={i} style={{ flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
                                
                                <View style={{width: '33%', alignItems: 'flex-start'}}>
                                    <Text style={styles.sectorText}>
                                        {WEEKDAY_LABELS[day]}
                                    </Text>
                                </View>

                                <View style={{marginRight: 40}}>
                                    <CheckBox
                                        value={!disabled}
                                        onValueChange={(newValue) => {
                                            if (newValue) {
                                                setSelectedDays(prev => [...prev, day]);
                                                if (!schedule.some(s => s.day === day)) {
                                                    setSchedule(prev => [...prev, { day, start: 8, end: 17 }]);
                                                }
                                            } else {
                                                setSelectedDays(prev => prev.filter(item => item !== day));
                                                setSchedule(prev => prev.filter(s => s.day !== day));
                                            }
                                        }}
                                    />
                                </View>

                                {daySchedule.map((sector, index) => (
                                    <View key={index} style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                                        <Pressable
                                            style={!disabled ? styles.timeButton : styles.timeButtonDisabled}
                                            onPress={() => startEditingTime(day, 'start')}    
                                        >
                                            <Text>{decimalToTime(sector.start)}</Text>
                                        </Pressable>

                                        <Text> - </Text>

                                        <Pressable
                                            style={!disabled ? styles.timeButton : styles.timeButtonDisabled}
                                            onPress={() => startEditingTime(day, 'end')}
                                        >
                                            <Text>{decimalToTime(sector.end)}</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        )
                    })}
                    {currentlyEditingTime && editingDate && (
                        <DateTimePicker
                            value={editingDate}
                            mode="time"
                            is24Hour
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (event.type === 'set' && selectedDate) {
                                    setEditingDate(selectedDate);
                                    setSchedule(prev =>
                                        prev.map(s =>
                                            s.day === currentlyEditingTime.day
                                                ? {
                                                    ...s,
                                                    [currentlyEditingTime.type]: toDecimalHours({
                                                        hours: selectedDate.getHours(),
                                                        minutes: selectedDate.getMinutes(),
                                                    }),
                                                }
                                                : s
                                        )
                                    );
                                }
                                if (event.type === 'dismissed' || event.type === 'set') {
                                    setCurrentlyEditingTime(null);
                                    setEditingDate(null);
                                }
                            }}
                        />
                    )}
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                {!sectorSaved && sectorEdited &&
                <View style={styles.addSectorButtonContainer}>
                    <Pressable style={styles.saveOrCancelButton} onPress={saveSector}>
                        <Text>Tallenna</Text>
                    </Pressable>
                </View>}

                <View style={styles.addSectorButtonContainer}>
                    <Pressable style={styles.saveOrCancelButton} onPress={cancelSectorEdit}>
                        <Text>{sectorSaved || !sectorEdited ? "Poistu" : "Peruuta"}</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default React.memo(EditSector);