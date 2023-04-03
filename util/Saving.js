import api from "./PolecatAPI";

async function like(animalID) {
  const url = `/save/${animalID}`;
  const response = await api.post(url);
}

async function unLike(animalID) {
  const url = `/save/${animalID}`;
  const response = await api.delete(url);
}

async function see(animalID) {
  const url = `/seen/${animalID}`;
  const response = await api.post(url);
}

async function unSee(animalID) {
  const url = `/seen/${animalID}`;
  const response = await api.delete(url);
}

export { like, unLike, see, unSee };