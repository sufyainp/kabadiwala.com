import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen w-full overflow-y-auto font-sans">
      {/* Hero Section */}
        <section
    className="relative flex flex-col justify-center items-center text-center px-4 pt-20 pb-40 min-h-screen"
    style={{
      backgroundImage:
        "linear-gradient(rgba(174, 255, 189, 0.5), rgba(174, 255, 189, 0.5)), url('https://kabadwala.pk/wp-content/uploads/2023/12/scrap-metal-concept-people-bring-old-things-vector-31237159-e1703940012754.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay",
    }}
  >





        <h1 className="mb-6 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent">
          Welcome to Kabadiwala.com
        </h1>
        <p
          className="text-lg md:text-2xl text-gray-800 p-4 rounded-lg shadow max-w-2xl mb-4"
          style={{ backgroundColor: '#d7ffde' }}
        >
          Buy or sell your scrap at the best prices. Join the green revolution and be part of a cleaner, greener future.
        </p>
        <p
          className="text-md md:text-lg text-gray-700 p-3 rounded-md shadow max-w-xl"
          style={{ backgroundColor: '#d7ffde' }}
        >
          Our mission is to uplift and empower local scrap collectors by connecting them to a broader market via our digital platform.
        </p>

        <Link to="/shop" className="mt-8">
          <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:scale-105">
            Start Shopping
          </button>
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white/80 backdrop-blur-sm py-16 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold text-green-800 mb-4">
              Why Choose Kabadiwala.com?
            </h2>
            <p className="text-gray-700 mb-4">
              We’re not just a platform — we’re a movement. We connect consumers with verified local collectors and scrap dealers, streamlining the recycling process and contributing to a circular economy.
            </p>
            <p className="text-gray-600">
              From home decluttering to industrial waste management, we make recycling easier and more rewarding.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="./public/whyus.png"
              alt="Why Choose Us"
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "1. List or Choose Scrap you want",
              desc: "Upload details and pictures of scrap items you want to sell or recycle.",
            },
            {
              title: "2. Choose the best offer",
              desc: "Choose from a wide range of products.",
            },
            {
              title: "3. Hassle-Free Pickup",
              desc: "They’ll schedule a pickup at your convenience.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Info */}
      <section className="py-12 px-6 bg-white border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-green-800">
            Kabadiwala.com
          </h1>
          <p className="max-w-md text-gray-700">
            Kabadiwala Online - Your hassle-free scrap marketplace. Buy and Sell your scrap to scrapsellers.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-6 text-green-800 text-xl">
          <i className="fab fa-facebook-f" title="Facebook" />
          <i className="fab fa-instagram" title="Instagram" />
          <i className="fab fa-linkedin" title="LinkedIn" />
          <i className="fab fa-twitter" title="Twitter" />
        </div>

        {/* Quick Links */}
        <div className=" text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-gray-800">
          
          <div>
            <h6 className=" font-semibold text-lg mb-2">Quick Links</h6>
            <ul className="space-y-1">
              <li>Scrap Rates</li>
              <li>E-Waste Scrap</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-lg mb-2">Other Pages</h6>
            <ul className="space-y-1">
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-lg mb-2">Get in touch</h6>
            <ul className="space-y-1">
              <li>Address</li>
              <li>Contact Us</li>
            </ul>
          </div>
          
        </div>
      </section>
          
      {/* Footer */}
      <footer className="text-center py-6 bg-emerald-800 text-white text-sm">
        Made by Sufyain Posharkar © 2025
      </footer>
    </main>
  );
};

export default Home;
