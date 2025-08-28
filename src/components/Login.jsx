import React, { useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { user, loginUser, error, isLoading } = useAuth();
  const navigate = useNavigate();

  // Memoize validation schema to prevent recreation on every render
  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      }),
    []
  );

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Memoize form submission handler
  const handleSubmit = useCallback(
    async (values, { setSubmitting, setFieldError }) => {
      try {
        await loginUser(values);
      } catch (err) {
        // Handle specific field errors if needed
        if (err?.field) {
          setFieldError(err.field, err.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [loginUser]
  );

  // Demo credentials handler
  const fillDemoCredentials = useCallback((setFieldValue) => {
    setFieldValue('email', 'admin@gmail.com');
    setFieldValue('password', 'admin123');
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[89.45vh] bg-gradient-to-br from-green-50 via-emerald-100 to-white px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex">
        {/* Left Side Image */}
        <div
          className="w-1/2 hidden md:block bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(/login.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        >
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0 bg-green-900 bg-opacity-10"></div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-green-700">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Kabadiwala account</p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6" noValidate>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1 flex items-center"
                    role="alert"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1 flex items-center"
                    role="alert"
                  />
                </div>

                {/* Login Error */}
                {error && (
                  <div
                    className="text-red-700 text-sm font-medium bg-red-50 border border-red-200 p-3 rounded-lg flex items-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-blue-900">
                      Demo Account
                    </p>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials(setFieldValue)}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      Use Demo
                    </button>
                  </div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>
                      Email: <code className="bg-blue-100 px-1 rounded">admin@gmail.com</code>
                    </p>
                    <p>
                      Password: <code className="bg-blue-100 px-1 rounded">admin123</code>
                    </p>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="flex items-center justify-between text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-green-600 hover:text-green-800 hover:underline transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
