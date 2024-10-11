const baseUrl = 'http://localhost:3001';

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}, ${error.message}`);
}

function getItems() {
    return request(`${baseUrl}/items`);
}

function addNewItem(name, imageUrl, weather) {
    return request(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        imageUrl: imageUrl,
        weather: weather,
      })
    });
};

function deleteItem(itemId) {
    return request(`${baseUrl}/items/${itemId}`,{
        method: "Delete"
    });
}


export { getItems, addNewItem, deleteItem };