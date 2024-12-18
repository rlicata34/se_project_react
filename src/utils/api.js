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

function addCardLike (itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
  }).then((data) => {
      console.log("Card like response:", data); // Debug log
      return data;
  });
}

function removeCardLike(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
      console.log("Card dislike respose:", data); // Debug log
      return data;
  });
}

export { getItems, addNewItem, deleteItem, checkResponse, addCardLike, removeCardLike };