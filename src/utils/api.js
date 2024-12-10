const baseUrl = 'http://localhost:3001';

function request(url, options) {
    const token = localStorage.getItem("token"); // Assume the token is stored in localStorage
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }) // Conditionally add Authorization header if token exists
    };

    return fetch(url, { ...options, headers }).then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}, ${res.statusText}`);
}

function getItems() {
    return request(`${baseUrl}/items`, {
        method: "GET",
    });
}

function addNewItem(name, imageUrl, weather) {
    return request(`${baseUrl}/items`, {
      method: "POST",
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
    });
}

export { getItems, addNewItem, deleteItem, checkResponse };