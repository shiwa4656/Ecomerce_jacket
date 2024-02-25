

const checkoutList = document.querySelector('.table-shopping-cart')
const checkoutBtn = document.querySelector('.checkoutbutton')
console.log(checkoutList)

shoppingCart=[]

// fetch from local storage
if(localStorage.getItem('shoppingCart')){
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    renderCheckout()
}

function renderCheckout(){
    checkoutList.innerHTML = ''
    // get from local storage
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    let html = shoppingCart.map((item)=>{
        return `<tr id=${item.id}>
        <td> <img src="${item.image.url}" alt="">${item.title}</td>
        <td> <span class="decrease-product">-</span> ${item.quantity} <span class="increase-product">+</span></td>
        <td>$${(item.price*item.quantity).toFixed(2)}</td>
        <td><span class="delete-product">
        <i class="fas fa-trash-alt"></i>
        </span></td>
        </tr>`
    }).join('')


    const totalPrice = shoppingCart.reduce((acc,curr)=>{
        return acc + (curr.price * curr.quantity)
    },0)


    // check if the cart is empty, from local storage
    if(shoppingCart.length === 0){
        html += `<h1>Your cart is empty</h1>`
    }else{
        html += `<tr>
        <td>Total</td>
        <td></td>
        <td>$${totalPrice.toFixed(2)}</td>
        <td></td>
        </tr>`
    }

    checkoutList.insertAdjacentHTML('beforeend',html)

    
    // add events to the increase and decrease buttons
    const decreaseBtns = document.querySelectorAll('.decrease-product')
    const increaseBtns = document.querySelectorAll('.increase-product')
    const deleteBtns = document.querySelectorAll('.delete-product')

    decreaseBtns.forEach((btn)=>{
        btn.addEventListener('click', decreaseProduct)
    })

    increaseBtns.forEach((btn)=>{
        btn.addEventListener('click', increaseProduct)
    })

    deleteBtns.forEach((btn)=>{
        btn.addEventListener('click', deleteProduct)
    })



}


function decreaseProduct(e){
    console.log(e.target)
    const id = e.target.parentElement.parentElement.id
    const item = shoppingCart.find((i)=>{
        return i.id === id
    })
    
    if(item.quantity > 1){
        item.quantity--
        localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
        renderCheckout()
    }
    console.log(item)
}

function increaseProduct(e){
    console.log(e.target)
    const id = e.target.parentElement.parentElement.id
    const item = shoppingCart.find((i)=>{
        return i.id === id
    })
    
    item.quantity++
    console.log(item)
    localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
    renderCheckout()
}

function deleteProduct(e){
    console.log(e.target)
    const id = e.target.parentElement.parentElement.id
    console.log(id) 
    //  find the id from local
    const localdata = localStorage.getItem('shoppingCart')
    let data = JSON.parse(localdata)
    const index = data.findIndex((i)=>{
        return i.id === id
    })

    data.splice(index,1)
    localStorage.setItem('shoppingCart',JSON.stringify(data))
    renderCheckout()
    // reload the page
    location.reload()
}


checkoutBtn.addEventListener('click',()=>{
    // redirect to checkout page
    window.location.href = 'checkout.html'

    // CLEAR THE LOCAL STORAGE
    localStorage.removeItem('shoppingCart')
})