import { Text, View, TextInput, Pressable, Modal, Alert } from "react-native";
import { SectorProps, Weekday } from "../types/types";
import React, { useState } from "react";
import { styles } from "../styles";
import CheckBox from "expo-checkbox";
import { decimalToTime, toDecimalHours } from "../utils/timeConversion";
import { WEEKDAY_LABELS, weekdaysOrdered } from "../types/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorSelector from "../components/ColorPicker";
import { confirmContrast } from "../utils/confirmColorContrast";
import { useSectors } from "../hooks/useSectors";

const EditSector = ({ sector, setSectorToEdit }: SectorProps) => {
    const { id: sectorId, name: sectorName, color: sectorColor } = sector;
    const { sectors, addSector, updateSector } = useSectors();
    const [currentlyEditingTime, setCurrentlyEditingTime] = useState<{day: Weekday, type: 'start' | 'end'} | null>(null);

    const fullSector = sectors.find(s => s.id === sectorId);
    const sectorSchedule = fullSector ? fullSector.activeDays : [];
    const newSector = sectorId === 0;

    const [name, setName] = useState(newSector ? "" : sectorName);
    const [schedule, setSchedule] = useState(() => sectorSchedule);
    const [color, setColor] = useState(sectorColor ? sectorColor : '#ffffff');
    const [showColorPanel, setShowColorPanel] = useState(false);
    const [editingDate, setEditingDate] = useState<Date | null>(null);

    const [selectedDays, setSelectedDays] = useState(newSector ? [] : schedule.map(s => s.day));

    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(false);

    const saveSector = () => {
        const saveOrUpdateSector = () => {
            if (newSector) {
                addSector({ name, activeDays: schedule, color})
            } else {
                updateSector({ id: sectorId, name, activeDays: schedule, color });
            };

            setSectorToEdit(undefined)

            Alert.alert(
                newSector ? "Sektori tallennettu onnistuneesti!" : "Muutokset tallennettu" , "",
            [{text: "OK", style: "default", onPress: () => {}}])
        };

        if (!name || !color || schedule.length === 0) {
            setError(true);

            Alert.alert(
                "Pakollisia tietoja puuttuu!",
                "Valitse sektorille nimi, väri sekä viikkoaikataulu.",
            [{text: "OK", style: "default", onPress: () => {}}])
            return;
        } else if (!newSector && !sectorId) {
            setError(true);

            Alert.alert(
                "VIRHE",
                "Palaa edelliseen näkymään ja yritä valita muokattava sektori uudelleen. Mikäli virhe toistuu, poista muokattava sektori ja syötä aikataulu uudelleen.",
            [{text: "OK", style: "default", onPress: () => {}}])
            return;
        }

        if (!confirmContrast(color)) {
            setError(true);

            Alert.alert(
                "Valittu väri on vaalea.",
                "Varmista, että asettamasi väri on riittävän erottuva. Voit muokata väriä tarvittaessa myöhemmin. Haluatko jatkaa tallentamista vai valita uuden värin?",
            [{
                    text: "Jatka tallentamista",
                    style: "default",
                    onPress: () => {
                        setError(false);
                        saveOrUpdateSector();
                    }
                },
                {
                    text: "Valitse uusi väri",
                    style: "default",
                    onPress: () => {
                        setError(false);
                        setShowColorPanel(true);
                    }
                }
            ])

        return;
        }

        if (!error) saveOrUpdateSector();
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
                                value={name}
                                onChangeText={setName}
                                autoFocus
                                placeholder={name ? name : "Sektorin nimi"}
                                style={{ borderBottomWidth: 1, padding: 8 }}
                            />

                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ marginTop: 20, alignItems: "center" }}
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
                <View style={styles.addSectorButtonContainer}>
                    <Pressable style={styles.saveOrCancelButton} onPressIn={() => saveSector()}>
                        <Text>Tallenna</Text>
                    </Pressable>
                </View>

                <View style={styles.addSectorButtonContainer}>
                    <Pressable style={styles.saveOrCancelButton} onPressIn={() => setSectorToEdit(undefined)}>
                        <Text>Peruuta</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default React.memo(EditSector);