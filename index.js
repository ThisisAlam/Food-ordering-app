import {menuArray as testArray} from '/data.js'
console.log(testArray)


const menuContainer = document.getElementById('menu-container')
let selectedOrderArray = []
let paymentComplete = false
let orderIsPlaced = false

document.addEventListener('click', function(e){
    
    const targetId = e.target.dataset.btn
    
    if(targetId){
        const existingAddItem = selectedOrderArray.find((item) => {
            return  item.id === Number(targetId)
        })
        if(existingAddItem){
            existingAddItem.count += 1
        }else {
            const newItem = testArray.find((arr) => {
                return arr.id === Number(targetId)
            })
                selectedOrderArray.push({
                name: newItem.name,
                price: newItem.price,
                id: newItem.id,
                count: 1,
                emoji: newItem.emoji
                }
            )
        }
        render()
    }
    
    const targetIdRemoveBtn = e.target.dataset.removeBtn
    if(targetIdRemoveBtn){
        const existingRemoveItem = selectedOrderArray.find((item) => {
            return  item.id === Number(targetIdRemoveBtn)
        })
        if (existingRemoveItem){
            existingRemoveItem.count -= 1
            if(existingRemoveItem.count === 0)  {
                selectedOrderArray = selectedOrderArray.filter(obj => {
                    return obj.id !== Number(targetIdRemoveBtn)
                })
            }
        } 
        render()
    }
    
    if(e.target.dataset.completeOrderBtn){
        if(selectedOrderArray.length > 0){
            orderIsPlaced = true
            render()
        }
    }

    if(e.target.dataset.payFormCloseBtn){
        orderIsPlaced = false
        overlayEl.classList.add('hidden')
        render()
    }
    
    const makePayment = e.target.dataset.payBtn
    if (makePayment && orderIsPlaced) {
        e.preventDefault()

        const usernameId = document.getElementById('username-id')
        const cardId = document.getElementById('card-id')
        const cvvId = document.getElementById('cvv-id')

        if(usernameId.value && cardId.value && cvvId.value){
            overlayEl.classList.add('hidden')
            paymentComplete = true
            render()
        }
    }

    if(e.target.classList.contains('back-btn')){
        selectedOrderArray = []
        paymentComplete = false
        orderIsPlaced = false
        render()
    }
})


function displayMenu(testArray){
    const menuList = testArray.map((arr) => {
        return `<div class="menu-item ">
                    <img class="food-img" src="${arr.emoji}">
                    <div class="description">
                        <p class="name" id="name">${arr.name}</p>
                        <p class="ingredients" id="ingredients">${arr.ingredients.join(', ')}</p>
                        <p class="price" id="price">$${arr.price}</p>
                    </div>
                    <div class="add-btn-container">
                        <button class="add-btn" id="${arr.id}" data-btn="${arr.id}" ${paymentComplete ? 'disabled' :''}>+</button>
                    </div>
                </div>`
    }).join('')
    return menuList
}

function displaySelectedMenu(selectedOrderArray){
    let sumOfPrices = 0
    for (let obj of selectedOrderArray){
        sumOfPrices += obj.price * obj.count
    }
    return `<div class="form-order">
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
                    <p class="name">${orderArr.name} <span>x</span> <span class="food-count">${orderArr.count}</span></p>
                    <div class="button-container">
                        <button class="remove-btn" data-remove-btn="${orderArr.id}">remover</button>
                    </div>
                <p class="price">$${orderArr.price * orderArr.count}</p>
            </div>`
    }).join('')
    return orderList
}

const overlayEl = document.getElementById('overlay')
function paymentForm(){
    return `<form class="card-details">
                <div class="close-btn">
                    <button type="button" id="pay-form-close-btn" data-pay-form-close-btn="true">x</button>
                </div>
                <p class="form-title">Enter card details</p>
                <label for="username-id">Full Name</label>
                <input id="username-id" type="text" name="username" placeholder="Enter your name" required>
                <label for="card-id">Card Number</label>
                <input id="card-id" type="number" name="card" placeholder="Enter card number" required>
                <label for="cvv-id">CVV Number</label>
                <input id="cvv-id" type="number" name="cvv" placeholder="Enter CVV" required>
                <button type="button" class="pay-btn" data-pay-btn="true">Pay</button>
            </form>`
        }
function thankYouMessage(){
    return `<div class="thank-you">
                <p class="thank-you-text">Thanks! Your order is on its way 🚀</p>
                <button class="back-btn">Order Again</button>
            </div>`
}
const formUpdateContainer = document.getElementById('form-update-container')

function render() {
    menuContainer.innerHTML = displayMenu(testArray)

        const count = selectedOrderArray.length
        menuContainer.classList.remove('overflow1', 'overflow2')

        if (count === 1 ) {
            menuContainer.classList.remove('overflow2')
            menuContainer.classList.add('overflow1')
        } 
        else if (count >= 2) {
            menuContainer.classList.remove('overflow1')
            menuContainer.classList.add('overflow2')
        }
        
    if(paymentComplete){
        menuContainer.classList.remove('overflow1', 'overflow2')
        formUpdateContainer.innerHTML = thankYouMessage()
    } else {
        formUpdateContainer.innerHTML = displaySelectedMenu(selectedOrderArray)
    }
    
    const orderContainer = document.getElementById('order-container')

    if (orderContainer) {
        orderContainer.innerHTML = selectedOrder(selectedOrderArray)
    }

    if(orderIsPlaced && !paymentComplete){
        overlayEl.classList.remove('hidden')
        overlayEl.innerHTML = paymentForm()
    } else {
        overlayEl.classList.add('hidden')
    }
}

render ()