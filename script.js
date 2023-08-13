"use strict";

const formElement = document.querySelector(".form-section");
const inputElement = document.querySelector(".input-section");
const buttonElement = document.querySelector(".submit-button");
const countriesCard = document.querySelector(".country-card");
const resetElement = document.querySelector(".reset-button");

formElement.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const country = inputElement.value.toLowerCase();
    const data = await getData(country);
    renderCountry(data);
  } catch (err) {
    displayAlert(
      `Error. Please try again one more time. Error message: ${err.message}`
    );
  }
});

const renderCountry = function (data) {
  formElement.style.display = "none";
  countriesCard.classList.toggle("hidden");
  const markup = ` 
  <img class="country-card__flag" src="${data.flags.svg}" alt="Country Flag">
  <div class="country-card__info">
    <h2 class="country-card__name">${data.name}</h2>
    <p class="country-card__region">🗺️ ${data.region}</p>
    <p class="country-card__population">🧑‍🤝‍🧑 ${(
      data.population / 1000000
    ).toFixed(1)} million </p>
    <p class="country-card__language">🗣️ ${data.languages[0]?.name}</p>
    <p class="country-card__currency">💸 ${data.currencies[0]?.name}</p>
    `;
  countriesCard.insertAdjacentHTML("afterbegin", markup);
  resetElement.classList.remove("hidden");
};

const getData = async function (name) {
  const response = await fetch(`https://restcountries.com/v2/name/${name}`);
  const [data] = await response.json();
  console.log(data);
  return data;
};

const resetFormAndCard = function () {
  formElement.style.display = "block";
  countriesCard.classList.add("hidden");
  countriesCard.innerHTML = "";
  inputElement.value = "";
  resetElement.classList.add("hidden");
  inputElement.focus();
};

const displayAlert = function (message) {
  const markup = `
      <div class="alert">
        ${message}
      </div>
    `;
  document.querySelector("body").insertAdjacentHTML("afterend", markup);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 5000);
};

resetElement.addEventListener("click", resetFormAndCard);
