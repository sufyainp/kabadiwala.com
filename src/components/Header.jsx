import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import MobileMenu from "./MobileMenu";
import { ShoppingCart, User, House, Storefront } from "phosphor-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser, isLoading } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Clear products from localStorage on component mount (consider moving this logic elsewhere)
  useEffect(() => {
    localStorage.removeItem("products");
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logoutUser, navigate]);

  // Close menu when clicking outside (for mobile)
  const handleOverlayClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Navigation items configuration
  const navigationItems = [
    { path: "/", label: "Home", icon: House },
    { path: "/shop", label: "Shop", icon: Storefront },
    { path: "/cart", label: "Cart", icon: ShoppingCart, showIconOnly: true },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-white font-bold text-xl md:text-2xl hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
                aria-label="Kabadiwala.com - Go to homepage"
              >
                Kabadiwala.com
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {user ? (
                <>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(item.path);
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-green-700 text-white' 
                            : 'text-green-100 hover:bg-green-700 hover:text-white'
                          }
                          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                        `}
                        aria-label={item.label}
                        title={item.label}
                      >
                        <Icon size={20} className={item.showIconOnly ? '' : 'mr-2'} />
                        {!item.showIconOnly && (
                          <span className="hidden lg:block">{item.label}</span>
                        )}
                      </Link>
                    );
                  })}
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="ml-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200"
                    aria-label="Logout from account"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="hidden sm:inline">Logging out...</span>
                      </div>
                    ) : (
                      'Logout'
                    )}
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200 border border-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        logoutUser={handleLogout}
        navigationItems={navigationItems}
        user={user}
        isLoading={isLoading}
        onClose={() => setMenuOpen(false)}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Header;
