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
    binomial: "Panthera tigris",
    commonName: "Tiger",
    summary: `The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside. An apex predator, it primarily preys on ungulates, such as deer and wild boar. It is territorial and generally a solitary but social predator, requiring large contiguous areas of habitat to support its requirements for prey and rearing of its offspring. Tiger cubs stay with their mother for about two years and then become independent, leaving their mother's home range to establish their own.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Panthera_tigris_corbetti_%28Tierpark_Berlin%29_832-714-%28118%29.jpg/1280px-Panthera_tigris_corbetti_%28Tierpark_Berlin%29_832-714-%28118%29.jpg",
    tags: ["mammal", "endangered"],
    liked: false,
    seen: true,
  },
  {
    key: 4,
    binomial: "Lepus europaeus",
    commonName: "European Hare",
    summary: `The European hare.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Lepus_europaeus_%28Causse_M%C3%A9jean%2C_Loz%C3%A8re%29-cropped.jpg",
    tags: ["mammal", "common"],
    liked: false,
    seen: true,
  },
  {
    key: 5,
    binomial: "Ailurus fulgens",
    commonName: "Red Panda",
    summary: `The red panda is a mammal native to the eastern Himalayas and southwestern China. It is listed as Endangered on the IUCN Red List because the wild population is estimated at fewer than 10,000 mature individuals.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1280px-Red_Panda_%2824986761703%29.jpg",
    tags: ["mammal", "endangered"],
    liked: true,
    seen: false,
  },
  {
    key: 6,
    binomial: "Cygnus olor",
    commonName: "Mute Swan",
    summary: `The mute swan is a species of swan and a member of the waterfowl family Anatidae. It is native to much of Eurasia, and it has been introduced to North America, Australia, and New Zealand.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Mute_swan_Vrhnika.jpg/1280px-Mute_swan_Vrhnika.jpg",
    tags: ["bird", "common"],
    liked: false,
    seen: true,
  },
  {
    key: 7,
    binomial: "Panthera onca",
    commonName: "Jaguar",
    summary: `The jaguar is a large felid species and the only extant member of the genus Panthera native to the Americas. The jaguar's present range extends from the Southwestern United States and Mexico in North America, across much of Central America, and south to Paraguay and northern Argentina in South America.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg",
    tags: ["mammal", "endangered"],
    liked: false,
    seen: true,
  },
  {
    key: 8,
    binomial: "Phascolarctos cinereus",
    commonName: "Koala",
    summary: `The koala is an arboreal herbivorous marsupial native to Australia. It is the only extant representative of the family Phascolarctidae and its closest living relatives are the wombats.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Koala_climbing_tree.jpg",
    liked: false,
    Seen: false,
  },
];

export { animals };
