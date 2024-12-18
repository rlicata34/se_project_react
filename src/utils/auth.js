import { getToken } from "./token";

const token = getToken();

const baseUrl = "http://localhost:3001"

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}, ${error.message}`);
}

export const register = (name, avatar, password, email) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, password, email }),
  }).then((data) => {
      console.log("Register response:", data); // Debug log
      return data;
  });
};

export const login = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    }).then((data) => {
      console.log("Login response:", data); // Debug log
      return data; 
    });
};

export const getUserInfo = (token) => {
  console.log("Sending token in /users/me request:", token);

  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
};

export const updateUserInfo = (name, avatar) => {

  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name, avatar}),
  }).then((data) => {
      console.log("Edit profile response:", data); // Debug log
      return data; 
    });
}