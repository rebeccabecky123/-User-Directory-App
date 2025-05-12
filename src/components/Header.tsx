import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string): string => {
    return location.pathname === path 
      ? 'bg-blue-600 text-white'
      : 'hover:bg-blue-100';
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">User Directory</h1>
          
          <nav>
            <ul className="flex space-x-2">
              <li>
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded ${isActive('/')}`}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link 
                  to="/add-user" 
                  className={`px-3 py-2 rounded ${isActive('/add-user')}`}
                >
                  Add User
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;