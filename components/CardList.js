import { ScrollView, StyleSheet } from "react-native"
import AnimalCard from "./Card"


// Get animals
const animals = [
    {
        'key': 0,
        'binomial': 'Mustela Putorius',
        'commonName': 'European Polecat',
        'summary': 'Best animal ever.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Storm_the_polecat.jpg',
        'tags': ['mammal', 'endangered']
    },
    {
        'key': 1,
        'binomial': 'Alcedo atthis asdlfkj asdifj sidfjo sdflkj sfdjkljsfdlk asdfasdf asdfasdfasdfasdf asdf axdf',
        'commonName': 'Common Kingfisher And Some Longer Descriptions Unreasonably Long in Fact Some Might Say Too Long for Line Wrapping',
        'summary': 'The flight of the kingfisher is fast, direct and usually low over water. Aaaa AAA aaaaa aaaaaaaaaaaaaaaa.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/9/92/%E2%99%82_Common_Kingfisher_%28Alcedo_atthis%29_Photograph_By_Shantanu_Kuveskar%2C_Mangaon%2C_Maharashtra%2C_India.jpg',
        'tags': ['bird', 'rare']
    },
]


function CardList(props) {
    return (
    <ScrollView style={styles.scrollViewContainer}>
        {animals.map((animal) => (
          <AnimalCard
            key={animal.key}
            {...animal} 
            {...props}
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