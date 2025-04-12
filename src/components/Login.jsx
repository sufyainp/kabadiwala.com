import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { user, loginUser, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className="flex justify-center items-center min-h-[89.45vh] bg-gradient-to-br from-green-50 via-emerald-100 to-white">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg overflow-hidden flex">
        {/* Left Side Image */}
        <div
          className="w-1/2 hidden md:block bg-cover bg-center "
          style={{ backgroundImage: 'url(/login.png)',backgroundSize: 'contain',backgroundRepeat: 'no-repeat', }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-4 text-green-700">Login to Kabadiwala</h1>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              loginUser(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="admin@kabadiwala.com"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Login Error */}
                {error && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 p-2 rounded">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {/* Admin Demo Info */}
                <div className="text-xs text-gray-600 mt-2 bg-emerald-50 p-2 rounded">
                  <p><strong>Demo Admin Login</strong></p>
                  <p>Email: <code>admin@gmail.com</code></p>
                  <p>Password: <code>admin123</code></p>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-sm">
            Don’t have an account?{' '}
            <Link to="/register" className="text-green-600 hover:text-green-800 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
