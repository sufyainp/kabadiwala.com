import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "phosphor-react";

function Checkout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <CheckCircle size={48} className="text-green-600 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-green-800">Checkout Complete!</h1>
        <p className="text-gray-700 mb-6 text-center">
          Thank you for your order. This is a dummy checkout page.<br />
          Payment integration will be added soon.
        </p>
        <div className="w-full mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
            <p className="font-semibold">Order Summary</p>
            <p className="text-sm text-green-700 mt-2">Your order has been placed successfully. You can track your order status from your profile or orders page.</p>
          </div>
        </div>
        <Link
          to="/orders"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
        >
          Track My Order
        </Link>
      </div>
    </div>
  );
}

export default Checkout;