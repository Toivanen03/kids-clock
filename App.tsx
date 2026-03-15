import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsProvider } from './hooks/SettingsContext';
import { SectorsProvider } from './hooks/SectorsContext';
import { SectorStateProvider } from './hooks/SectorStateContext';
import { ClockProvider } from './hooks/ClockProvider';
import MainTabs from './MainTabs';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <SettingsProvider>
            <ClockProvider>
              <SectorsProvider>
                <SectorStateProvider>
                  <MainTabs />
                </SectorStateProvider>
              </SectorsProvider>
            </ClockProvider>
          </SettingsProvider>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}