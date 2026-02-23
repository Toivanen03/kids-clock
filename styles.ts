import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },

  topContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10
  },

  addSectorTopBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
  },

  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  addSectorClockContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addSectorAMbuttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: '50%',
    padding: 10
  },

  trashButtonContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16
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

  sectorsRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  sectorsColumn: {
    flexDirection: 'column',
    width: '43%',
    fontWeight: 'bold',
    color: '#dcfbff',
    fontSize: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
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

  lockButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7070',
    borderRadius: 10,
    width: '45%',
    height: 'auto',
    borderWidth: 1,
    borderColor: 'black',
  },

  pinContainer: {
    marginTop: 100,
    alignSelf: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  box: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
});