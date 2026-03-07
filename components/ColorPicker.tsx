import { Text, View, Pressable, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ColorSelectorProps } from '../types/types';
import { styles } from '../styles';
import { useState } from 'react';

const ColorSelector = ({showColorPanel, setShowColorPanel, color, setColor, name}: ColorSelectorProps) => {
    const [originalColor, setOriginalColor] = useState(color);

    return (
        <Modal visible={showColorPanel} animationType="slide" style={styles.colorModalStyle}>
            <View style={styles.colorModalTop}>
                <ColorPicker
                    color={color}
                    onColorChange={c => setColor(c)}
                    thumbSize={20}
                    sliderHidden={true}
                    swatches={false}
                />
            </View>
            <View style={{flex: 0.1, alignItems: 'center', backgroundColor: '#ffffff'}}>
                <Text style={{...styles.colorButtonText, fontSize: 36, fontWeight: 'bold', color: color}}>{name}</Text>
            </View>
            <View style={{...styles.colorModalBottom, flexDirection: 'row'}}>
                <Pressable
                    style={{...styles.colorPreview, backgroundColor: color}}
                    onPress={() => {
                        setOriginalColor(color);
                        setShowColorPanel(false);
                    }}   
                >
                    <Text style={styles.colorButtonText}>Valitse väri</Text>
                </Pressable>

                <Pressable
                    style={{...styles.colorPreview, backgroundColor: originalColor}}
                    onPress={() => {
                        setColor(originalColor);
                        setShowColorPanel(false);
                    }}   
                >
                    <Text style={styles.colorButtonText}>Peruuta</Text>
                </Pressable>
            </View>
        </Modal>
    );
    }

export default ColorSelector;