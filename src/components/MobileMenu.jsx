import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  House, 
  User, 
  ShoppingCart, 
  Storefront, 
  SignOut, 
  SignIn,
  UserPlus,
  X 
} from "phosphor-react";

const MobileMenu = ({ isMenuOpen, onClose, logoutUser, user, isLoading }) => {
  const location = useLocation();

  // Navigation items configuration
  const navigationItems = [
    { path: "/", label: "Home", icon: House },
    { path: "/shop", label: "Shop", icon: Storefront },
    { path: "/cart", label: "Cart", icon: ShoppingCart },
    { path: "/profile", label: "Profile", icon: User },
  ];

  // Close menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      onClose();
    }
  }, [location.pathname, isMenuOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        onClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, onClose]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logoutUser, onClose]);

  const isActivePath = (path) => location.pathname === path;

  if (!isMenuOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-800 text-white">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* User Info Section */}
          {user && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.name || user.email || 'User'}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            {user ? (
              <div className="space-y-1 px-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                        ${isActive 
                          ? 'bg-green-100 text-green-800 border-l-4 border-green-600' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon 
                        size={20} 
                        className={isActive ? 'text-green-600' : 'text-gray-500'} 
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="my-4 border-t border-gray-200"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <SignOut size={20} />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              // Guest User Menu
              <div className="space-y-3 px-4">
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <SignIn size={20} />
                  <span>Login</span>
                </Link>
                
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Link>

                {/* Guest Navigation */}
                <div className="mt-6 space-y-1">
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                      ${isActivePath('/') 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <House size={20} className="text-gray-500" />
                    <span>Home</span>
                  </Link>
                  
                  <Link
                    to="/shop"
                    onClick={handleLinkClick}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                      ${isActivePath('/shop') 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Storefront size={20} className="text-gray-500" />
                    <span>Shop</span>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Kabadiwala.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
