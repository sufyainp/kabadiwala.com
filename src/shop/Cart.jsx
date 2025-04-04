import React, { useContext } from "react";
import { ShopContext } from "./shop-context";
import { PRODUCTS } from "./products";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      {/* Cart Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Your Cart Items</h1>
        <div>
          {/* Button to Navigate to Orders Page */}
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
            onClick={() => navigate("/orders")}
          >
            Your Orders
          </button>
        </div>
      </div>

      {/* Display Cart Items */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null; 
        })}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.filter((product) => cartItems[product.id] > 0).map((product) => (
          <CartItem key={product.id} data={product} />
        ))}
      </div>

      {/* Display Total Amount and Checkout Options */}
      {totalAmount > 0 ? (
        <div className="mt-8">
          <p className="text-lg font-semibold mb-2">Subtotal: ${totalAmount}</p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              onClick={() => {
                checkout();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl mt-8">Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
