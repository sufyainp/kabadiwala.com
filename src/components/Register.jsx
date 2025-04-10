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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form ref={registerForm} onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
            { label: 'Password', name: 'password1', type: 'password', placeholder: 'Create password' },
            { label: 'Confirm Password', name: 'password2', type: 'password', placeholder: 'Confirm password' },
          ].map((field, i) => (
            <div key={i}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                required
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
