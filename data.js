
let state={
    data:[],
    shoppingCart:[],
    loading: true

}



// // loading data from the api
async function fetchDataApi(){
    try{
    const response = await fetch('https://v2.api.noroff.dev/rainy-days');
    const data = await response.json();
    if(data){
        console.log(data)
        state.data=data
        return data;

    }
}
    catch(error){
        throw new Error('Something went wrong')

    }
}

window.onload =fetchDataApi()


function addShoppingcart(id){
    const item = state.data.data.find((item)=>item.id===id)
    state.data.shoppingCart.push(item)
}

console.log('data.js is running...')
console.log(state)

export {state, addShoppingcart}
