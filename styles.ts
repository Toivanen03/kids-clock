import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },

  navigatorBg: {
    backgroundColor: '#ccc'
  },

  navigatorIndicator: {
    backgroundColor: 'white'
  },

  navigatorText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  settingsScreen: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#ccc',
    justifyContent: "flex-start",
  },

  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  header: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  previewButton: {
    padding: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
    borderRadius: '50%',
    width: 'auto',
    height: 'auto'
  },
});