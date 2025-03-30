import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Trash2, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-semibold text-gray-900">
              Dash<span className="text-emerald-600">Board</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600 focus:outline-none transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="font-medium">{user?.name}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};