import { FC } from "react";
import { View } from "react-native";
import { styles } from "../styles";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockConfig, getSectorPath } from "../utils/constants";

const ClockBase: FC = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const activity = "sleep";

    return (
        <View style={styles.container}>
            <Svg height="100%" width="90%" viewBox="0 0 200 200">
                <Circle cx={clockConfig.cx} cy={clockConfig.cy} r={clockConfig.r} fill="#eee" />
                    <Path d={getSectorPath(
                        clockConfig.sectors.sleep.sleepStart,
                        clockConfig.sectors.sleep.sleepEnd)}
                        fill={clockConfig.sectors.sleep.color} />
            </Svg>
        </View>
    );
};

export default ClockBase;