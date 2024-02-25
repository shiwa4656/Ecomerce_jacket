const grid = document.querySelector('.grid-container');
const shoppingCartLabel = document.querySelector('.shopping-cart-label');
const checkoutList = document.querySelector('.table-shopping-cart')
const filter = document.querySelector('.filter-options')


let dataArr=[]
let shoppingCart = []

// // loading data from the api
if(dataArr.length===0){
    grid.innerHTML = `<h1>Loading...</h1>`
}

filter.addEventListener('change', (e)=>{
    const filterArr = dataArr.data

    console.log(e.target.value)
    const filterValue = e.target.value
    if(filterValue === 'price'){
        // sort by price
        
        filterArr.sort((a,b)=>{
            return a.price - b.price

            
        })

        renderFilterList(filterArr)


    }

    
})


// filter func
function renderFilterList(filterArr){
    console.log(filterArr)
    console.log(dataArr.data)
    grid.innerHTML = '';
    const html =  filterArr.map((item) => {
        return `<div class="grid-item" id=${item.id}>
        <div class="products">
             <div>
               <img class="icon-Products" src="./pictures/icon-plus.png" alt="icon">
             </div>
             
               <img class="products-img product-details-btn" src="${item.image.url}" alt="Leather Jacket">  
                               
             <p class="product-paragraph">${item.title}</p>
             <h1 class="price-tag">$${item.price}</h1>
        </div>
        </div>`
   }).join('')

   grid.insertAdjacentHTML('beforeend',html)

//    add event all .add-cart btns
    const addCartBtns = document.querySelectorAll('.icon-Products')
    const productDetailsBtn = document.querySelectorAll('.product-details-btn')
    
    productDetailsBtn.forEach((btn)=>{
         btn.addEventListener('click', addproductDetailsLocal)
    })
    
    addCartBtns.forEach((btn)=>{
                btn.addEventListener('click', addToCart)
    })
}



async function fetchData(){
    const response = await fetch('https://v2.api.noroff.dev/rainy-days');
    const data = await response.json();
    try{
        if(data){
            grid.innerHTML = '';
            dataArr=data;

    
            console.log(dataArr)
    
            
       const html =  dataArr.data.map((item) => {
             return `<div class="grid-item" id=${item.id}>
             <div class="products">
                  <div>
                    <img class="icon-Products" src="./pictures/icon-plus.png" alt="icon">
                  </div>
                  
                    <img class="products-img product-details-btn" src="${item.image.url}" alt="Leather Jacket">  
                                    
                  <p class="product-paragraph">${item.title}</p>
                  <h1 class="price-tag">$${item.price}</h1>
             </div>
             </div>`
        }).join('')


    
     console.log(html)
     // dom
     grid.insertAdjacentHTML('beforeend',html)

        //  add event all .add-cart btns
        const addCartBtns = document.querySelectorAll('.icon-Products')
        const productDetailsBtn = document.querySelectorAll('.product-details-btn')

        productDetailsBtn.forEach((btn)=>{
            btn.addEventListener('click', addproductDetailsLocal)
        })

        addCartBtns.forEach((btn)=>{
                    btn.addEventListener('click', addToCart)
        })
            

        }
    }

    catch(error){
        console.log(error)
        grid.innerHTML = `<h1>Something went wrong!</h1>`


    }


}

function addproductDetailsLocal(e){
    const id = e.target.parentElement.parentElement.id
    console.log(e.target.parentElement)
    localStorage.setItem('productID',id)
    // redirect to product
    window.location.href = 'productchekout.html'
    
}


function fetchItem(id){
    
    const item = dataArr.data.find((item)=>{
        return item.id === id
    })
    console.log(item)
    return item 
}


function addToCart(e){
    const id = e.target.parentElement.parentElement.parentElement.id
    console.log(e.target.parentElement.parentElement)
    const item = fetchItem(id)

    // check if the item is already in the shopping cart, from local
    if(localStorage.getItem('shoppingCart')){
        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    }
    const existing = shoppingCart.find((i)=>{
        return i.id === item.id
    })
    if(existing){
        existing.quantity++
        // save to local storage
       localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
       updateShoppingCartLabel()
        return
    }

    item.quantity = 1
    shoppingCart.push(item)
    // save to local storage
    localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
    updateShoppingCartLabel()


}

fetchData()


//  update the shopping cart label, based on quitity of items in the shopping cart, get data
function updateShoppingCartLabel(){
    if(localStorage.getItem('shoppingCart')){
        let data = JSON.parse(localStorage.getItem('shoppingCart'))
        //  account for quintity of items in the shopping cart
        let labelNumber = 0;
        data.forEach((item) => {
            labelNumber += item.quantity;
        });
        shoppingCartLabel.textContent = labelNumber;
    }
}