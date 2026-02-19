import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChildScreen from './screens/ChildScreen';
import SettingsScreen from './screens/SettingsScreen';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const test = false;
  const speed = 3600;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
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
            <Tab.Screen name="Asetukset" component={SettingsScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}