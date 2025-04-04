// Load PRODUCTS array from localStorage or use a default value if it's not available
let PRODUCTS = JSON.parse(localStorage.getItem("products")) || [
  
  {
    id: 1,
    productName: "Aluminum Metal",
    price: 300.0,
    productImage: "imga.png",
  },
  {
    id: 2,
    productName: "Plastic Scrap",
    price: 20.0,
    productImage: "imgb.png",
  },
  {
    id: 3,
    productName: "Cardboard Scrap",
    price: 18.0,
    productImage: "imgc.png",
},
{
    id: 4,
    productName: "Glass Scrap",
    price: 25.0,
    productImage: "imgd.png",
},
{
    id: 5,
    productName: "Electronic Scrap",
    price: 50.0,
    productImage: "imge.png",
},
{
    id: 6,
    productName: "Cholthing Scrap",
    price: 30.0,
    productImage: "imgf.png",
},

];

const addProduct = (newProduct) => {
PRODUCTS = [...PRODUCTS, newProduct];
localStorage.setItem("products", JSON.stringify(PRODUCTS));
};

export { PRODUCTS, addProduct };
