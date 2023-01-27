import { ScrollView, StyleSheet } from "react-native"
import AnimalCard from "./Card"


// Get animals
const animals = [
    {
        'key': 0,
        'binomial': 'Mustela Putorius',
        'commonName': 'European Polecat',
        'summary': 'Best animal ever.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Storm_the_polecat.jpg'
    },
    {
        'key': 1,
        'binomial': 'Alcedo atthis',
        'commonName': 'Common Kingfisher aaaaaaaaa aaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa',
        'summary': 'The flight of the kingfisher is fast, direct and usually low over water.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/9/92/%E2%99%82_Common_Kingfisher_%28Alcedo_atthis%29_Photograph_By_Shantanu_Kuveskar%2C_Mangaon%2C_Maharashtra%2C_India.jpg'
    },
]


function CardList(props) {
    return (
    <ScrollView style={styles.scrollViewContainer}>
        {animals.map((animal) => (
          <AnimalCard
            key={animal.key}
            binomial={animal.binomial}
            commonName={animal.commonName}
            summary={animal.summary}
            image={animal.image}
            setAnimalProps={props.setAnimalProps}
            setShowAnimal={props.setShowAnimal}
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