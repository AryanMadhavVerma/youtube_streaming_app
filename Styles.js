import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:2,
      height: "100%",
    },
    videoItem: {
        marginBottom: 16,
      },
    deleteButton: {
        backgroundColor: '#FF0000',
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        textAlign: 'center',
        marginTop: -16,
    },
    addButton: {
        backgroundColor: '#000011',
        opacity: 0.3,
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        textAlign: 'center',
        marginTop:-4,
        marginBottom:10,

    },
    input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    },
    watchButton: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 8,
      textAlign: 'center',
      borderRadius: 4,
    },
  });

  export default styles