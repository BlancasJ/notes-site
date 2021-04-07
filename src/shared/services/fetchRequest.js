const REQUEST_URL = 'http://18.188.97.141/api/postIt';

export const fetchRequest = {
  get: () => {
    return fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  },

  post: (data) => {
    return fetch(REQUEST_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
  },

  deleteItem: (id) => {
    return fetch(`${REQUEST_URL}/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
  },

  getById: (id) => {
    return fetch(`${REQUEST_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  },
  
  editItem: (id, data) => {
    return fetch(`${REQUEST_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
  }
};
