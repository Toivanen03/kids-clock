import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChildScreen from './screens/childScreen';
import { styles } from './styles';
import { SettingsProvider } from './hooks/SettingsContext';
import ConfirmPin from './screens/ConfirmPin';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const test = false;
  const speed = 36000 / 24;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <SettingsProvider>
            <Tab.Navigator
              screenOptions={{
                swipeEnabled: true,
                tabBarIndicatorStyle: styles.navigatorIndicator,
                tabBarStyle: styles.navigatorBg,
                tabBarLabelStyle: styles.navigatorText
              }}
            >
              <Tab.Screen name="Kello">
                {() => <ChildScreen test={test} speed={speed} />}
              </Tab.Screen>
              <Tab.Screen name="Asetukset" component={ConfirmPin} />
            </Tab.Navigator>
          </SettingsProvider>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}