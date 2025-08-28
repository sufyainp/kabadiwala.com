import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../utils/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PencilSimple, 
  User, 
  Phone, 
  MapPin, 
  EnvelopeSimple,
  Camera,
  Check,
  X,
  Warning,
  CheckCircle
} from "phosphor-react";
import ProductUploadPage from "./Artisans";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  
  // State management
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    postalCode: "",
    profilePicture: ""
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // Initialize form data from user or localStorage
  useEffect(() => {
    const savedData = {
      phoneNumber: localStorage.getItem("phoneNumber") || user?.phone || "",
      address: localStorage.getItem("address") || user?.address || "",
      postalCode: localStorage.getItem("postalCode") || user?.postalCode || "",
      profilePicture: localStorage.getItem("profilePicture") || user?.avatar || ""
    };
    setFormData(savedData);
  }, [user]);

  // Dynamic greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "☀️", bg: "from-yellow-400 to-orange-500" };
    if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "🌤️", bg: "from-blue-400 to-blue-600" };
    return { text: "Good Evening", emoji: "🌙", bg: "from-indigo-500 to-purple-600" };
  }, []);

  // Validation functions
  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'phoneNumber':
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be exactly 10 digits";
        return "";
      case 'postalCode':
        if (!value) return "Postal code is required";
        if (!/^\d{6}$/.test(value)) return "Postal code must be exactly 6 digits";
        return "";
      case 'address':
        if (!value) return "Address is required";
        if (value.length < 10) return "Address must be at least 10 characters";
        return "";
      default:
        return "";
    }
  }, []);

  // Handle input changes with validation
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    
    // Save to localStorage for persistence
    localStorage.setItem(field, value);
  }, [validateField]);

  // Handle profile picture upload
  const handleProfilePictureChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: "File size must be less than 5MB" }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: "Please select a valid image file" }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('profilePicture', reader.result);
        setErrors(prev => ({ ...prev, profilePicture: "" }));
      };
      reader.readAsDataURL(file);
    }
  }, [handleInputChange]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'profilePicture') {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Save profile changes
  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    setLoading(true);
    try {
      // Update user profile via API if available
      if (updateUserProfile) {
        await updateUserProfile(formData);
      }
      
      // Update localStorage
      Object.keys(formData).forEach(key => {
        localStorage.setItem(key, formData[key]);
      });

      setSaveStatus('success');
      setEditMode(false);
      
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, updateUserProfile]);

  // Cancel edit mode
  const handleCancel = useCallback(() => {
    // Reset form data from localStorage/user
    const savedData = {
      phoneNumber: localStorage.getItem("phoneNumber") || user?.phone || "",
      address: localStorage.getItem("address") || user?.address || "",
      postalCode: localStorage.getItem("postalCode") || user?.postalCode || "",
      profilePicture: localStorage.getItem("profilePicture") || user?.avatar || ""
    };
    setFormData(savedData);
    setErrors({});
    setEditMode(false);
  }, [user]);

  // Form field component
  const FormField = ({ label, field, type = "text", icon: Icon, placeholder, multiline = false }) => {
    const InputComponent = multiline ? 'textarea' : 'input';
    const isError = !!errors[field];
    
    return (
      <div className="space-y-2">
        <label className="flex items-center space-x-2 font-medium text-gray-700">
          <Icon size={18} className="text-green-600" />
          <span>{label}</span>
        </label>
        {editMode ? (
          <div className="space-y-1">
            <InputComponent
              type={type}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className={`w-full p-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                isError 
                  ? 'border-red-300 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
              } ${multiline ? 'h-24 resize-none' : ''}`}
              rows={multiline ? 4 : undefined}
            />
            <AnimatePresence>
              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-red-600 text-sm"
                >
                  <Warning size={16} />
                  <span>{errors[field]}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <p className="p-3 bg-gray-50 rounded-lg min-h-[48px] flex items-center">
            {formData[field] || <span className="text-gray-400">Not provided</span>}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${greeting.bg} text-white rounded-2xl p-6 shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center space-x-3">
                <span>{greeting.emoji}</span>
                <span>{greeting.text}, {user?.name || "User"}!</span>
              </h1>
              <p className="text-white/90 mt-2">Manage your profile and products</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <AnimatePresence>
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex space-x-2"
                  >
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <X size={18} />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <PencilSimple size={18} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Save Status Alert */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg flex items-center space-x-2 ${
                saveStatus === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {saveStatus === 'success' ? (
                <>
                  <CheckCircle size={20} />
                  <span>Profile updated successfully!</span>
                </>
              ) : (
                <>
                  <Warning size={20} />
                  <span>Failed to update profile. Please check your information and try again.</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Profile Picture Section */}
            <div className="lg:col-span-1 flex flex-col items-center space-y-4">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profilePictureInput"
                />
                <label 
                  htmlFor="profilePictureInput" 
                  className="cursor-pointer block"
                >
                  <div className="relative">
                    <img
                      src={formData.profilePicture || "/profilepichard.png"}
                      alt="Profile"
                      className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-green-300 transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Camera size={32} className="text-white" />
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">Click to change picture</p>
                <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
              </div>
              
              {errors.profilePicture && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <Warning size={16} />
                  <span>{errors.profilePicture}</span>
                </div>
              )}

              {/* User Stats */}
              <div className="bg-gray-50 rounded-lg p-4 w-full max-w-xs">
                <h3 className="font-semibold text-gray-800 mb-3">Profile Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Member since</span>
                    <span className="text-gray-800 font-medium">2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Products listed</span>
                    <span className="text-green-600 font-medium">5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-medium text-gray-700">
                      <EnvelopeSimple size={18} className="text-green-600" />
                      <span>Email</span>
                    </label>
                    <p className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {user?.email || "Not provided"}
                    </p>
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <FormField
                    label="Phone Number"
                    field="phoneNumber"
                    type="tel"
                    icon={Phone}
                    placeholder="Enter 10-digit phone number"
                  />
                </div>
              </div>

              {/* Address Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
                <div className="space-y-6">
                  <FormField
                    label="Address"
                    field="address"
                    icon={MapPin}
                    placeholder="Enter your full address"
                    multiline={true}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Postal Code"
                      field="postalCode"
                      type="text"
                      icon={MapPin}
                      placeholder="Enter 6-digit postal code"
                    />
                    
                    {/* City/State (Future enhancement) */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 font-medium text-gray-700">
                        <MapPin size={18} className="text-green-600" />
                        <span>City</span>
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                        Auto-detected from postal code
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-3 text-2xl font-bold text-gray-800 mb-2">
              <span>🛠️</span>
              <span>Manage Your Products</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload, edit, or manage your product listings. Keep your inventory up-to-date to attract more customers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <ProductUploadPage />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
