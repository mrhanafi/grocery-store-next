const { default: axios } = require("axios");


const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*');

const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
    return resp.data.data
})

const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
    return resp.data.data;
})

const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp =>{
    return resp.data.data;
})

const getProductsByCategory = (category) => axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(resp =>{
    return resp.data.data;
})

const registerUser = (username,email,password) => axiosClient.post('/auth/local/register',{
    username:username,
    email:email,
    password:password
});

const signInUser = (email,password) => axiosClient.post('/auth/local/',{
    identifier: email,
    password: password
});

const addToCart = (data,jwt) => axiosClient.post('/user-carts',data,{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+jwt
    }
});

const getCartItems = (userId,jwt) => axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&[populate][product][populate][images][populate][0]=url',{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+jwt
    }
}).then(resp => {
    const data = resp.data.data;
    const cartItemsList = data.map((item,index) => ({
        name:  item.attributes.product?.data?.attributes?.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image: item.attributes.product?.data?.attributes?.images?.data[0]?.attributes?.url,
        actualPrice: item.attributes.product?.data.attributes.mrp,
        id: item.id
    }))
    return cartItemsList;
})

const deleteCartItem = (id,jwt) => axiosClient.delete('/user-carts/'+id,{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+jwt
    }
})

export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    signInUser,
    addToCart,
    getCartItems,
    deleteCartItem
}