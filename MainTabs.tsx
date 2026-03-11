import { useSectorState } from "./hooks/useSectorState";
import ChildScreen from "./screens/ChildScreen";
import ConfirmPin from "./screens/ConfirmPin";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from "./styles";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
    const { showTabs } = useSectorState();
    const test = false;
    const speed = 36000 / 24;

    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: false,
                tabBarIndicatorStyle: styles.navigatorIndicator,
                tabBarStyle: showTabs ? styles.navigatorBg : { display: "none" },
                tabBarLabelStyle: styles.navigatorText,
            }}
            >
            <Tab.Screen name="Kello">
                {() => <ChildScreen />}
            </Tab.Screen>

            <Tab.Screen name="Asetukset" component={ConfirmPin} />
        </Tab.Navigator>
    );
}