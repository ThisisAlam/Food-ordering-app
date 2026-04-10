import {menuArray as testArray} from '/data.js'
console.log(testArray)

const menuContainer = document.getElementById('menu-container');
function displayMenu(testArray){
    const menuList = testArray.map((arr) => {
        return `<div class="menu-item">
                    <img class="food-img" src="${arr.emoji}" alt="pizza image">
                    <div class="description">
                        <p class="name" id="name">${arr.name}</p>
                        <p class="ingredients" id="ingredients">${arr.ingredients.join(', ')}</p>
                        <p class="price" id="price">$${arr.price}</p>
                    </div>
                    <div class="add-btn-container">
                        <button class="add-btn" id="${arr.id}" data-btn="${arr.id}">+</button>
                    </div>
                </div>`
    }).join('')
    return menuList
}

let selectedOrderArray = []
document.addEventListener('click', function(e){
    const targetId = e.target.dataset.btn
    for (let arr of testArray){
        if (Number(targetId) === arr.id){
            selectedOrderArray.push({
                name: arr.name,
                price: arr.price,
                id: arr.id
            })
            console.log(selectedOrderArray)
            render ()
            return
        }  
    }
    
    const targetIdRemoveBtn = e.target.dataset.removeBtn
    if(targetIdRemoveBtn){
        selectedOrderArray = selectedOrderArray.filter(obj => {
            return obj.id !== Number(targetIdRemoveBtn)
        })
        console.log(selectedOrderArray)        
        render()
    }
})

function displaySelectedMenu(selectedOrderArray){
    let sumOfPrices = 0
    for (let obj of selectedOrderArray){
        sumOfPrices += obj.price
    }
    return `<div class="form-order ">
                <p class="order-form-title">Your order</p>
            <div class="order-container" id="order-container">
            </div>
                 <div class="total-price-container">
                    <p class="total-price-text">Total Price:</p>
                    <p class="total-price">$${sumOfPrices}</p>
                </div>
                <button class="complete-order-btn">Complete Order</button>
            </div>`
}


function selectedOrder(selectedOrderArray){
    const orderList = selectedOrderArray.map((orderArr) => {
        return `<div class="order">
                    <p class="name">${orderArr.name}</p>
                    <div class="button-container">
                        <button class="remove-btn" data-remove-btn="${orderArr.id}">remover</button>
                    </div>
                <p class="price">$${orderArr.price}</p>
            </div>`
    }).join('')
    return orderList
}

const formUpdateContainer = document.getElementById('form-update-container')
function render() {
    menuContainer.innerHTML = displayMenu(testArray)
    formUpdateContainer.innerHTML = displaySelectedMenu(selectedOrderArray)
    
    const orderContainer = document.getElementById('order-container');
    orderContainer.innerHTML = selectedOrder(selectedOrderArray)
}
render ()