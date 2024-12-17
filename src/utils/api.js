import { getToken } from "./token";

const baseUrl = 'http://localhost:3001';
const token = getToken();

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
    return request(`${baseUrl}/items`, {
        method: "GET",
    });
}

function addNewItem(name, imageUrl, weather) {
    return request(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        imageUrl: imageUrl,
        weather: weather,
      })
    });
}

function deleteItem(itemId) {
    return request(`${baseUrl}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export { getItems, addNewItem, deleteItem, checkResponse };