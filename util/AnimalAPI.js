const animals = [
  {
    key: 0,
    binomial: "Mustela Putorius",
    commonName: "European Polecat",
    summary: `The European polecat (Mustela putorius), also known as the common polecat, 
black polecat, or forest polecat, is a species of mustelid native to western Eurasia and North 
Africa. It is of a generally dark brown colour, with a pale underbelly and a dark mask across 
the face. Occasionally, colour mutations including albinos, leucists, isabellinists, 
xanthochromists, amelanists and erythrists occur.[2] It has a shorter, more compact body 
than other Mustela species,[3] a more powerfully built skull and dentition,[4] is less agile,[5] 
and is well known for having the characteristic ability to secrete a 
particularly foul-smelling liquid to mark its territory.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Storm_the_polecat.jpg",
    tags: ["mammal", "endangered"],
    liked: true,
    seen: false,
  },
  {
    key: 1,
    binomial: "Alcedo atthis",
    commonName: "Common Kingfisher",
    summary: `The common kingfisher (Alcedo atthis), also known as the Eurasian kingfisher and river kingfisher, 
is a small kingfisher with seven subspecies recognized within its wide distribution across Eurasia and North Africa. It is resident in much of its range, but migrates from areas where rivers freeze in winter.
This sparrow-sized bird has the typical short-tailed, large-headed kingfisher profile; it has blue upperparts, orange underparts and a long bill. It feeds mainly on fish, caught by diving, and has special visual adaptations to enable it to see prey under water. The glossy white eggs are laid in a nest at the end of a burrow in a riverbank.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/92/%E2%99%82_Common_Kingfisher_%28Alcedo_atthis%29_Photograph_By_Shantanu_Kuveskar%2C_Mangaon%2C_Maharashtra%2C_India.jpg",
    tags: ["bird", "rare"],
    liked: true,
    seen: true,
  },
  {
    key: 2,
    binomial: "Felis catus",
    commonName: "Domestic Cat",
    summary: `The domestic cat (Felis catus) is a small carnivorous species of feline, bred and kept as a pet, 
as well as for hunting vermin and rodents. They have been associated with humans for thousands of years, and 
have been bred and kept as pets for at least 4,000 years. Domestic cats are small, usually weighing 4-5 kg. They 
have short fur and come in a variety of colours and patterns. They are known for their independence, their ability 
to purr, and their tendency to form strong bonds with their owners.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/220px-Cat03.jpg",
    tags: ["mammal", "common"],
    liked: true,
    seen: true,
  },
  {
    key: 3,
    binomial: "Gorilla gorilla",
    commonName: "Western Gorilla",
    summary: `The western gorilla (Gorilla gorilla) is a species of gorilla native to western and central Africa. 
It is one of two species of gorillas, the other being the eastern gorilla. Western gorillas are found in 
lowland tropical forests and montane forests of central Africa. They are herbivores, feeding on leaves, stems, 
and fruit. They are highly social, living in groups led by a dominant male known as a silverback. Western gorillas 
are threatened by habitat destruction and poaching, and their populations have declined significantly over the 
last few decades.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Gorilla_gorilla_%28cropped%29.jpg",
    tags: ["mammal", "endangered"],
    liked: true,
    seen: false,
  },
  {
    key: 4,
    binomial: "Didelphis virginiana",
    commonName: "Virginia Opossum",
    summary: `The Virginia opossum (Didelphis virginiana), also known as the North American opossum, is a marsupial 
native to North America. It is the largest species of opossum, and is well-known for its ability to "play dead", 
a defense mechanism in which it faints and secretes a foul-smelling fluid to deter predators. Virginia opossums 
are omnivores, eating a variety of plant and animal material. They are highly adaptable, and are found in a wide 
variety of habitats, from urban areas to forests.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Virginia_opossum_edit1.jpg/220px-Virginia_opossum_edit1.jpg",
    tags: ["mammal", "uncommon"],
    liked: false,
    seen: false,
  },
];

// Get filtered list of matching animal names from server
async function getAnimals({setLoading, setAnimals, filterProps}) {

  // Dummy url
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  );
  const data = await apiResponse.json();

  // Check filters
  function checkName(name, filterName) {
    if (filterName !== null)
      return name
        .toUpperCase()
        .includes(
          filterProps.commonName.toUpperCase().trim().replace(/\s/g, "")
        );
    return true;
  }
  function checkTags(tags, filterTags) {
    if (filterTags !== null) {
      for (const item of filterTags) {
        if (!tags.includes(item)) {
          return false;
        }
      }
    }
    return true;
  }
  function checkSaved(saved, filterSaved) {
    if (filterSaved !== null) {
      if (filterSaved && !saved) {
        return false;
      }
    }
    return true;
  }

  // filter the data (will eventually be done server side)
  const result = animals.filter((animal) =>
    [
      checkName(animal.commonName, filterProps.commonName),
      checkTags(animal.tags, filterProps.tags),
      checkSaved(animal.liked, filterProps.liked),
      checkSaved(animal.seen, filterProps.seen),
    ].every(Boolean)
  );
  setLoading(false);
  setAnimals(result);
}


export { getAnimals }