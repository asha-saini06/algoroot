import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { createColumnHelper } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const mockData: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor'][Math.floor(Math.random() * 3)],
  status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
  lastActive: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}));

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        info.getValue() === 'Admin' 
          ? 'bg-purple-50 text-purple-700'
          : info.getValue() === 'Editor'
          ? 'bg-blue-50 text-blue-700'
          : 'bg-gray-50 text-gray-700'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        info.getValue() === 'Active' 
          ? 'bg-emerald-50 text-emerald-700'
          : info.getValue() === 'Inactive'
          ? 'bg-red-50 text-red-700'
          : 'bg-yellow-50 text-yellow-700'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('lastActive', {
    header: 'Last Active',
    cell: (info) => info.getValue(),
  }),
];

export const DetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="pl-64 pt-16">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">View and manage user information</p>
          </div>
          <DataTable data={mockData} columns={columns} />
        </div>
      </div>
    </div>
  );
};