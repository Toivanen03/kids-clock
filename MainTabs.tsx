import { useNavigationPrevent } from "./hooks/useNavigationPrevent";
import ChildScreen from "./screens/childScreen";
import ConfirmPin from "./screens/ConfirmPin";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from "./styles";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
    const { sectorEdited, sectorSaved } = useNavigationPrevent();
    const test = false;
    const speed = 36000 / 24;

    const enabled = !sectorEdited || sectorSaved;

    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: false,
                tabBarIndicatorStyle: styles.navigatorIndicator,
                tabBarStyle: enabled ? styles.navigatorBg : { display: "none" },
                tabBarLabelStyle: styles.navigatorText,
            }}
            >
            <Tab.Screen name="Kello">
                {() => <ChildScreen test={test} speed={speed} />}
            </Tab.Screen>

            <Tab.Screen name="Asetukset" component={ConfirmPin} />
        </Tab.Navigator>
    );
}