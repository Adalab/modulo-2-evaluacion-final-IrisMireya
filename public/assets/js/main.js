"use strict";
//Constantes
const text = document.querySelector(".js-text");
const searchBtn = document.querySelector(".js-searchbutton");
const btnReset = document.querySelector(".js-reset");
const btnLog = document.querySelector(".js-log");
const urlServer = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const drinkList = document.querySelector(".js-list");
const favList = document.querySelector(".js-fav");
let favouritesDrinks = window.localStorage.getItem("drinks")
  ? JSON.parse(window.localStorage.getItem("drinks"))
  : [];

//botón de búsqueda para encontrar la bebida deseada

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(urlServer + text.value)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      for (const item of data.drinks) {
        html += `<li class ="drinks js-drinks" id=${item.idDrink}>`;
        html += `<div><div>${item.strDrink}</div>`;
        html += `<div>${item.strIngredient1}${item.strIngredient2}${item.strIngredient3}</div>`;
        if (item.strIngredient4) {
          html += `<div>${item.strIngredient4}</div>`;
        }
        if (item.strDrinkThumb) {
          html += `<img src="${item.strDrinkThumb}" width="80px"/>`;
        }
        else {
          html += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=drink" width="80px"/>`;
        }
        html += `</div></li>`;
      }
      drinkList.innerHTML = html;

      //seleccionar bebidas favoritas

      const drinkSelection = document.querySelectorAll(".js-drinks");
      for (const item of drinkSelection) {
        item.addEventListener("click", (event) => {
          const drinkSelect = event.currentTarget;
          drinkSelect.className += " favourite ";
          const drinkInformation = data.drinks.find((drink) => {
            if (drink.idDrink === drinkSelect.id) {
              return drink;
            }
          });

          favouritesDrinks.push(drinkInformation);
          localStorage.setItem("drinks", JSON.stringify(favouritesDrinks)
          );

          const newFav = `<li class ="fav js-fav" id=${drinkInformation.strDrink}><div><div><button class="delete__button js-delete">
          <img src="./assets/images/cancel.png">
          </button>  ${drinkInformation.strDrink}<br><img src="${drinkInformation.strDrinkThumb}" width="80px"/></div></li>`;
          favList.innerHTML += newFav;

          //funcion eliminar individualmente

          const btnDel = document.querySelector(".js-delete");
          btnDel.addEventListener("click", (delInd) => {
          });
        });
      }
     
    })
    .catch(function (error) {
      if (error) {
        alert("¡No hay lo que tu pides mami!");
      }
    });    
});

//funcion eliminar lista favoritos por recarga

btnReset.addEventListener("click", (del) => {
  del.preventDefault();
  if (favouritesDrinks.length > 0) {
    favList.innerHTML = "";
    favouritesDrinks =[];
    localStorage.removeItem("drinks");
  }
});

//Botón log

btnLog.addEventListener("click", (add) => {
  let html = '';
  html += `<p>Tienes${favouritesDrinks.length}favoritos</p>`;
  console.log(html);
});
//# sourceMappingURL=main.js.map
