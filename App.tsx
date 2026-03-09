import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsProvider } from './hooks/SettingsContext';
import { SectorsProvider } from './hooks/SectorsContext';
import { NavigationPreventProvider } from './hooks/NavigationPreventContext';
import MainTabs from './MainTabs';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <SettingsProvider>
            <SectorsProvider>
              <NavigationPreventProvider>
                <MainTabs />
              </NavigationPreventProvider>
            </SectorsProvider>
          </SettingsProvider>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}