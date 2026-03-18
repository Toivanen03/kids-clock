import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },

  colorModalStyle: {
    flex: 1
  },

  colorModalTop: {
    flex: 1,
    minWidth: '100%',
  },

  colorModalBottom: {
    flex: 0.25,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  colorPreview: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
    width: '45%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  colorButtonText: {
    fontSize: 24,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 2,
    fontWeight: 'bold',
    color: '#ffffff'
  },

  topContainer: {
    width: '100%',
    height: '57%',
    alignItems: 'center',
    padding: 8,
  },

  sectorEditContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15
  },

  changePINheader: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 10
  },

  addSectorTopBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
  },

  timeButton: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  colorButton: {
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    alignSelf: 'center'
  },

  timeButtonDisabled: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  weekdayButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  },

  weekDayButtonText: {
    fontSize: 20,
    color: '#999'
  },

  activeWeekDayButtonText: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 1

  },

  todayButtonText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black'
  },

  bottomContainerWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 5
  },

  bottomContainer: {
    flexGrow: 1,
  },

  addSectorClockContainer: {
    flex: 1,
    width: '100%',
    height: '75%',
  },

  sectorEdit: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  addSectorAMbuttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 75,
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
    backgroundColor: '#ffffff'
  },

  navigatorText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  eventContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  nowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },

  nextText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
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
    justifyContent: 'space-between',
    paddingVertical: 6
  },

  colorColumn: {
    marginStart: 8,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  nameColumn: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  timeColumn: {
    flex: 2.4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  editColOne: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    marginStart: 15,
  },

  editColTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },

  editTimeColumn: {
    flex: 2.4,
    justifyContent: 'center',
  },

  trashColumn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginEnd: 8,
  },

  sectorPreviewText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left'
  },

  sectorEditText: {
    fontSize: 16,
    textAlign: 'center',
    marginEnd: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 2,
    flex: 1
  },

  sectorText: {
    fontSize: 16,
    textAlign: 'center',
    marginEnd: 15
  },

  colorBox: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1
  },

  header: {
    backgroundColor: '#ccc',
    alignItems: 'flex-start',
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

  editSectorButton: {
    padding: 6,
    alignItems: 'center',
    marginStart: 53,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    width: '30%',
    height: 'auto',
    borderWidth: 1,
    borderColor: 'black',
  },

  addSectorButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  },

  saveOrCancelButton: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    gap: 10,
    width: '45%'
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