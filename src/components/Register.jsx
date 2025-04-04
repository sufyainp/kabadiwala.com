import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Register = () => {
  const registerForm = useRef(null);
  const { registerUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password1, password2 } = registerForm.current;

    if (password1.value.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    if (password1.value !== password2.value) {
      alert('Passwords did not match!');
      return;
    }

    const userInfo = {
      name: name.value,
      email: email.value,
      password1: password1.value,
      password2: password2.value,
    };

    registerUser(userInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-[89.45vh] bg-gradient-to-br from-green-50 via-emerald-100 to-white">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
          <form ref={registerForm} onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
              { label: 'Password', name: 'password1', type: 'password', placeholder: 'Create password' },
              { label: 'Confirm Password', name: 'password2', type: 'password', placeholder: 'Confirm password' },
            ].map((field, i) => (
              <div key={i}>
                <label htmlFor={field.name} className="block mb-1 font-medium text-sm text-gray-700">
                  {field.label}:
                </label>
                <input
                  required
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://www.pixelstalk.net/wp-content/uploads/images2/Free-Download-Green-Leaves-Wallpapers.jpg')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
