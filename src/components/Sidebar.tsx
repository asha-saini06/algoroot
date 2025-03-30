import React from 'react';
import { LayoutDashboard, Users, Settings, HelpCircle } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-100 fixed left-0 top-0 pt-16">
      <div className="p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer mb-1 transition-colors ${
              item.active
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 ${item.active ? 'text-emerald-600' : 'text-gray-400'}`} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};