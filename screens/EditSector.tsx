import { Text, View, TextInput } from "react-native";
import { SectorProps } from "../types/types";
import { useState } from "react";
import { styles } from "../styles";
import { decimalToTime } from "../utils/timeConversion";
import { useSettings } from "../hooks/useSettings";
import { WEEKDAY_LABELS } from "../types/types";

const EditSector = ({ sector }: SectorProps) => {
    const { id: sectorId, name: sectorName, color: sectorColor } = sector[0];
    const { sectors, setSectors } = useSettings();

    const fullSector = sectors.find(s => s.id === sectorId);
    const sectorSchedule = fullSector ? fullSector.activeDays : [];

    const [id, setId] = useState(sectorId);
    const [name, setName] = useState(sectorName);
    const [schedule, setSchedule] = useState(sectorSchedule);
    const [color, setColor] = useState(sectorColor);

    return (
        <>
            <View style={styles.sectorsRow}>
                <View style={styles.editColOne}>
                    <Text style={styles.sectorEdit}>Väri:</Text>
                    <View style={[styles.colorBox, { backgroundColor: color }]} />
                </View>

                <View style={styles.editColTwo}>
                    <Text style={styles.sectorEdit}>Nimi:</Text>
                    <TextInput 
                        style={styles.sectorEditText}
                        value={name}
                        onChangeText={setName}
                        placeholder={name ? name : ""}
                    />
                </View>
            </View>

            <View style={styles.sectorsRow}>
                <View style={styles.editColOne}>
                    <Text style={styles.sectorEdit}>Päivät:</Text>
                </View>

                <View style={styles.editColTwo}>
                    <Text style={styles.sectorEdit}>Aika:</Text>
                </View>
            </View>

            <View style={styles.sectorsRow}>
                <View style={{ ...styles.editTimeColumn, marginStart: 15 }}>
                    {schedule.map((d, i) => 
                        <Text key={i} style={styles.sectorText}>
                            {WEEKDAY_LABELS[d.day]}
                        </Text>
                    )}
                </View>

                <View style={styles.editTimeColumn}>
                    {schedule.map((d, i) => 
                        <Text key={i} style={styles.sectorText}>
                           {decimalToTime(d.start)} - {decimalToTime(d.end)}
                        </Text>
                    )}
                </View>
            </View>
        </>
    );
};

export default EditSector;