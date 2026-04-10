import {menuArray as testArray} from '/data.js'
console.log(testArray)

const menuContainer = document.getElementById('menu-container');
function displayMenu(testArray){
    const menuList = testArray.map((arr) => {
        return `<div class="menu-item">
                    <img class="food-img" src="${arr.emoji}" alt="pizza image">
                    <div class="description">
                        <p class="name" id="name">${arr.name}</p>
                        <p class="ingredients" id="ingredients">${arr.ingredients}</p>
                        <p class="price" id="price">$${arr.price}</p>
                    </div>
                    <div class="add-btn-container">
                        <button class="add-btn" id="${arr.id}" data-btn="${arr.id}">+</button>
                    </div>
                </div>`
    }).join('')
    return menuList
}
const selectedOrderArray = []
document.addEventListener('click', function(e){
    const targetId = e.target.dataset.btn
    if(!targetId) {return} //ignore clicks

    for (let arr of testArray){
        if (targetId === `${arr.id}`){
            selectedOrderArray.push({
                name: arr.name,
                price: arr.price
            })
            render ()
            return  
        }
    }
})
console.log(selectedOrderArray)
const orderContainer = document.getElementById('order-container');
function selectedOrder(selectedOrderArray){
    const orderList = selectedOrderArray.map((orderArr) => {
        return `<div class="order">
                    <p class="name">${orderArr.name}</p>
                    <div class="button-container">
                        <button class="remove-btn">remover</button>
                    </div>
                    <p class="price">$${orderArr.price}</p>
                </div>`
    }).join('')
    return orderList
}

function render() {
    menuContainer.innerHTML = displayMenu(testArray)
    orderContainer.innerHTML = selectedOrder(selectedOrderArray)
}
render ()