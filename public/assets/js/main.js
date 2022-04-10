'use strict';
//Constantes
const text = document.querySelector('.js-text');
const searchBtn = document.querySelector('.js-searchbutton');
const btnReset = document.querySelector('.js-reset');
const urlServer = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const drinkList = document.querySelector('.js-list');
const favList = document.querySelector('.js-fav');
const favouritesDrinks = window.localStorage.getItem('drinks') ? JSON.parse(window.localStorage.getItem('drinks')) : []

//botón de búsqueda para encontrar la bebida deseada
searchBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    fetch(urlServer + text.value)
    .then(response => response.json())
    .then(data => {
        let html = '';
        for (const item of data.drinks) {
            html += `<li class ="drinks js-drinks" id=${item.idDrink}>`
            html += `<div><div>${item.strDrink}</div>` 
                if (item.strDrinkThumb) {
                    html += `<img src="${item.strDrinkThumb}" width="80px"/>`
                } else {
                    html += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=drink" width="80px"/>`    
                }
            html += `</div></li>`; 
        }
        drinkList.innerHTML = html;
    //seleccionar bebidas favoritas
        const drinkSelection = document.querySelectorAll('.js-drinks');
        for (const item of drinkSelection) {
            item.addEventListener('click', (event)=>{
            const drinkSelect = event.currentTarget;
            drinkSelect.className += " favourite "
            const drinkInformation = data.drinks.filter((drink)=>{
            if (drink.idDrink === drinkSelect.id) {
                return true;
            } else {
                return false;
            }
            })

    //añadir bebida favorita a lista favoritos

            const favouritesDrinks = window.localStorage.getItem('drinks') ? JSON.parse(window.localStorage.getItem('drinks')) : []

            favouritesDrinks.push(drinkInformation[0])
                window.localStorage.setItem('drinks', JSON.stringify(favouritesDrinks))
                
                for (let cont=0;cont<favouritesDrinks.length;cont++){
                    for (let cont1=1; cont1 < favouritesDrinks.length-1; cont1++) 
                    {
                    }
                    const l = favouritesDrinks[cont].strDrink;
                    favList.innerHTML += `<li class ="fav js-fav" id=${favouritesDrinks[cont].strDrink}>`
                    if (favouritesDrinks[cont].strDrinkThumb) {
                    favList.innerHTML += `<div><div><button class="delete__button js-delete">
                        <img src="../assets/images/cancel.png">
                  </button>
                  ${favouritesDrinks[cont].strDrink}<br><img src="${favouritesDrinks[cont].strDrinkThumb}" width="80px"/></div>`
                    }   
                    else {
                        html += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=drink" width="80px"/>`  //no puedo comprobar que la imagen se aplique bien
                    }
                }

                //funcion eliminar individualmente
                
                const btnDel = document.querySelector('.js-delete');
                btnDel.addEventListener('click',(delInd) => {
                console.log("borrar");

                });
            });
        }
        }
    ).catch(
        function (error){
            if(error){
                alert("¡No hay lo que tu pides mami!");
            }
        }
    );
});

//funcion eliminar lista favoritos por recarga
    btnReset.addEventListener('click', (del)=>{
        //del.preventDefault();
            //if (favouritesDrinks !== null) {
                while(favouritesDrinks.length > 0) {
                //console.log(favouritesDrinks.length);
                favouritesDrinks.length = 0;
                //console.log(favouritesDrinks.length, "pop");
                window.localStorage.clear();
                //console.log(favouritesDrinks.length, "clear");
                favList.innerHTML = "";
                //console.log(favouritesDrinks,"algo");
                //}
            }
 });


//# sourceMappingURL=main.js.map
