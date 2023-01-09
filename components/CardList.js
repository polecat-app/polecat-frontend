import { ScrollView, StyleSheet } from "react-native"
import AnimalCard from "./Card"


function CardList(props) {
    return (
    <ScrollView style={styles.scrollViewContainer}>
        {props.animals.map((animal) => (
          <AnimalCard
            key={animal.key}
            binomial={animal.binomial}
            commonName={animal.commonName}
            summary={animal.summary}
            image={animal.image}
            />
        ))}
    </ScrollView>
    )
}

export default CardList

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginHorizontal: 10,
    }
  })