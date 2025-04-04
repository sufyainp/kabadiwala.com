import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { BsPencilSquare } from "react-icons/bs";
import ProductUploadPage from "./Artisans";

const Profile = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [background, setBackground] = useState("bg-white");
  const [editMode, setEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("phoneNumber") || user.phone || "");
  const [address, setAddress] = useState(localStorage.getItem("address") || user.address || "");
  const [postalCode, setPostalCode] = useState(localStorage.getItem("postalCode") || user.postalCode || "");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || "");

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "☀️ Good Morning";
    if (hour >= 12 && hour < 17) return "🌤️ Good Afternoon";
    return "🌙 Good Evening";
  };

  useEffect(() => {
    setGreeting(getTimeOfDay());
  }, []);

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhoneNumber(input);
      localStorage.setItem("phoneNumber", input);
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("Phone number should be numeric and maximum 10 digits.");
    }
  };

  const handlePostalCodeChange = (e) => {
    const input = e.target.value;
    setPostalCode(input);
    localStorage.setItem("postalCode", input);
    setPostalCodeError("");
  };

  const handleAddressChange = (e) => {
    const input = e.target.value;
    setAddress(input);
    localStorage.setItem("address", input);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);

  return (
    <div className={`min-h-screen ${background} py-10 px-6`}>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {greeting}, <span className="text-gray-600">{user.name}</span>
          </h1>
          <button
            onClick={toggleEditMode}
            className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            <BsPencilSquare /> {editMode ? "Done" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Picture */}
          <div className="col-span-1 flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
              id="profilePictureInput"
            />
            <label htmlFor="profilePictureInput" className="cursor-pointer">
              <img
                src={profilePicture || "profilepichard.png"}
                alt="Profile"
                className="rounded-full h-48 w-48 object-cover border-4 border-green-300"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">Click to change picture</p>
          </div>

          {/* User Info */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-gray-700 mb-1">Phone Number</h2>
              {editMode ? (
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full p-2 border rounded-md"
                  maxLength={10}
                />
              ) : (
                <p>{phoneNumber}</p>
              )}
              {phoneNumberError && <p className="text-red-500 text-sm">{phoneNumberError}</p>}
            </div>
            <div>
              <h2 className="font-semibold text-gray-700 mb-1">Postal Code</h2>
              {editMode ? (
                <input
                  type="text"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{postalCode}</p>
              )}
            </div>
            <div className="col-span-2">
              <h2 className="font-semibold text-gray-700 mb-1">Address</h2>
              {editMode ? (
                <textarea
                  value={address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md h-24"
                />
              ) : (
                <p>{address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Separator */}
      <div className="my-10 text-center">
        <hr className="my-4 border-gray-300" />
        <h2 className="text-2xl font-bold text-gray-700">🛠️ Manage Your Products</h2>
        <p className="text-gray-500 mt-1">Upload, edit, or delete your product listings below.</p>
      </div>

      {/* Product Upload Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <ProductUploadPage />
      </div>
    </div>
  );
};

export default Profile;
