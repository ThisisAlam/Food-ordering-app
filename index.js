import {menuArray as testArray} from '/data.js'
console.log(testArray)

const menuContainer = document.getElementById('menu-container');
function displayMenu(testArray){
    const menuList = testArray.map((arr) => {
        return `<div class="menu-item">
                    <img class="food-img" src="${arr.emoji}">
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
                id: arr.id,
                emoji: arr.emoji
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

    //  document.getElementById('complete-order-btn')
    if(e.target.dataset.completeOrderBtn){
        if(selectedOrderArray.length > 0){
            document.getElementById('overlay').classList.remove('hidden')
        }
    }

    if(e.target.dataset.payFormCloseBtn){
        document.getElementById('overlay').classList.add('hidden')
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
                <button class="complete-order-btn" id="complete-order-btn" data-complete-order-btn="true">Complete Order</button>
            </div>`
}


function selectedOrder(selectedOrderArray){
    const orderList = selectedOrderArray.map((orderArr) => {
        return `<div class="order">
                    <div class="selected-food-image-container">
                        <img class="selected-food-img" src="${orderArr.emoji}">
                    </div>
                    <p class="name">${orderArr.name}</p>
                    <div class="button-container">
                        <button class="remove-btn" data-remove-btn="${orderArr.id}">remover</button>
                    </div>
                <p class="price">$${orderArr.price}</p>
            </div>`
    }).join('')
    return orderList
}

const overlay = document.getElementById('overlay')
function paymentForm(){
    return `<form class="card-details">
                <div class="close-btn">
                    <button id="pay-form-close-btn" data-pay-form-close-btn="true">x</button>
                </div>
                <p class="form-title">Enter card details</p>
                <input type="text" name="username" placeholder="Enter your name" required>
                <input type="number" name="card" placeholder="Enter card number" required>
                <input type="number" name="CVV" placeholder="Enter CVV" required>
                <button type="submit" class="pay-btn">Pay</button>
            </form>`
}

const formUpdateContainer = document.getElementById('form-update-container')
function render() {
    menuContainer.innerHTML = displayMenu(testArray)
        
        if(selectedOrderArray.length>0){
            document.getElementById('menu-container').classList.add('overflow')
        } else {
            document.getElementById('menu-container').classList.remove('overflow')
        }
    
    formUpdateContainer.innerHTML = displaySelectedMenu(selectedOrderArray)
    
    const orderContainer = document.getElementById('order-container');
    orderContainer.innerHTML = selectedOrder(selectedOrderArray)

    overlay.innerHTML = paymentForm()
}

render ()