import api from "./PolecatAPI";

async function like(token, animalID) {
  const url = '/save/';
  const response = await api.post(url, {
    animal_id: animalID,
    method: "like",
  }, 
  {headers: {
    Authorization: `Bearer ${token}`,
  }}
  );
}

async function see(token, animalID) {
  const url = '/save/';
  const response = await api.post(url, {
    animal_id: animalID,
    method: "see",
  }, 
  {headers: {
    Authorization: `Bearer ${token}`
  }}
  );
}

async function unLike(token, animalID) {
  const url = '/save/';
  const response = await api.delete(url, { data:{
    animal_id: animalID,
    method: "like",
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
});
}

async function unSee(token, animalID) {
  const url = '/save/';
  const response = await api.delete(url, { data:{
    animal_id: animalID,
    method: "see",
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
});
}


export { like, unLike, see, unSee };