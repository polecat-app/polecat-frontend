import { animals } from "./AnimalData";

// Get filtered list of matching animal names from server
async function getAnimals({ filterProps, page }) {
  // // Dummy url
  // const apiResponse = await fetch(
  //   "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  // );
  // const data = await apiResponse.json();

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

  // filter the data (will be done server side)
  if (animals.length <= page) { return []}
  const result = animals[page].filter((animal) =>
    [
      checkName(animal.commonName, filterProps.commonName),
      checkTags(animal.tags, filterProps.tags),
      checkSaved(animal.liked, filterProps.liked),
      checkSaved(animal.seen, filterProps.seen),
    ].every(Boolean)
  );
  return result
}

export { getAnimals };
