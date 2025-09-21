import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Gamepad2, 
  Users, 
  FolderOpen, 
  CreditCard, 
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Games', href: '/games', icon: Gamepad2, color: 'text-purple-600' },
    { name: 'Members', href: '/members', icon: Users, color: 'text-green-600' },
    { name: 'Collections', href: '/collections', icon: FolderOpen, color: 'text-orange-600' },
    { name: 'Transactions', href: '/transactions', icon: CreditCard, color: 'text-indigo-600' },
    { name: 'Recharges', href: '/recharges', icon: Wallet, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 bg-gradient-to-r from-purple-100 to-blue-100 border-b border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">🎮</span>
              </div>
              <h1 className="text-xl font-bold text-purple-800">GameNest</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-purple-600 hover:text-purple-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-200 to-blue-200 text-purple-800 border-l-4 border-purple-400 shadow-sm'
                      : 'text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-purple-800 hover:shadow-sm'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${item.color}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-purple-200">
            <div className="text-xs text-purple-600 text-center">
              <div className="font-semibold">GameNest</div>
              <div className="text-purple-500">Your Gaming Zone</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 border-r border-purple-200 shadow-lg">
          <div className="flex h-16 items-center px-4 bg-gradient-to-r from-purple-100 to-blue-100 border-b border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">🎮</span>
              </div>
              <h1 className="text-xl font-bold text-purple-800">GameNest</h1>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-200 to-blue-200 text-purple-800 border-l-4 border-purple-400 shadow-sm'
                      : 'text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-purple-800 hover:shadow-sm'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${item.color}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-purple-200">
            <div className="text-xs text-purple-600 text-center">
              <div className="font-semibold">GameNest</div>
              <div className="text-purple-500">Your Gaming Zone</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gradient-to-r from-purple-100 to-blue-100 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-purple-600 lg:hidden hover:text-purple-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="text-sm font-semibold text-purple-800">
                Your Gaming Zone
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
