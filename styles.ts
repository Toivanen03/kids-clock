import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    backgroundColor: "#ccc",
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },

  previewButton: {
    marginBottom: 200,
    padding: 20,
    alignItems: 'center',
    backgroundColor: "#444",
    borderRadius: '50%',
    width: 'auto'
  },

  previewText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
});