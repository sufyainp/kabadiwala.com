import React, { useState } from "react";
import { addProduct } from "../shop/products";

const ProductUploadPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    imagePreview: null
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setProductData((prev) => ({ ...prev, image: file, imagePreview: preview }));
    } else {
      setProductData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      productName: productData.name,
      price: parseFloat(productData.price),
      description: productData.description,
      productImage: productData.imagePreview
    };

    addProduct(newProduct);
    console.log(newProduct);

    setMessage("✅ Product uploaded successfully!");

    setProductData({
      name: "",
      description: "",
      price: "",
      image: null,
      imagePreview: null
    });

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-600 py-10">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Upload Your Product</h1>
        {message && <p className="text-green-600 text-center font-medium mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Product Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {productData.imagePreview && (
              <img
                src={productData.imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadPage;
