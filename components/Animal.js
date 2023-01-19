import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import cardStyle from "../styles/CardStyle";

function Animal(props) {
  return (
    <View style={containerStyle.container}>
        <View style={modalStyle.centeredView}>
            <View style={modalStyle.modalView}>
            <View style={{...cardStyle.textContainer, height: undefined}}>
                <Text style={cardStyle.commonName}>{props.commonName}</Text>
                <Text style={cardStyle.binomial}>{props.binomial}</Text>
                <Text style={cardStyle.summary}>{props.summary}</Text>
								<Pressable
									style={[modalStyle.button, modalStyle.buttonClose]}
									onPress={() => props.setShowAnimal(false)}
								>
									<Text style={modalStyle.textStyle}>Hide Modal</Text>
								</Pressable>
            </View>
            <Image style={cardStyle.image} source={{uri: props.image}}/>
            </View>
        </View>
    </View>
  );
};

const containerStyle = StyleSheet.create({
  container: {
      marginHorizontal: 10,
      flex: 1,
  }
})

const modalStyle = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "teal",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "stretch",
  },
})

export default Animal