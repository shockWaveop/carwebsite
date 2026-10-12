import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useComparison } from '../../context/ComparisonContext.js';
import { User, ShieldCheck, Heart, History, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const { user, openAuthModal, logout } = useAuth();
  const { comparisonIds } = useComparison();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d11]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, clean display type) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-lg font-bold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm inline-block" />
          <span>AutoVerse Global</span>
        </button>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => onNavigate('browse')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 text-left ${
              currentView === 'browse' ? 'text-white border-b border-rose-500' : 'hover:text-white'
            }`}
          >
            Browse Cars
          </button>
          <button
            onClick={() => onNavigate('brands')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 text-left ${
              currentView === 'brands' ? 'text-white border-b border-rose-500' : 'hover:text-white'
            }`}
          >
            Brands
          </button>
          <button
            onClick={() => onNavigate('compare')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 text-left flex items-center gap-1.5 ${
              currentView === 'compare' ? 'text-white border-b border-rose-500' : 'hover:text-white'
            }`}
          >
            <span>Compare</span>
            {comparisonIds.length > 0 && (
              <span className="text-xs font-mono text-rose-400 font-semibold tabular-nums">
                ({comparisonIds.length})
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('electric')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 text-left ${
              currentView === 'electric' ? 'text-white border-b border-rose-500' : 'hover:text-white'
            }`}
          >
            Electric
          </button>
          <button
            onClick={() => onNavigate('intelligence')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 text-left ${
              currentView === 'intelligence' ? 'text-white border-b border-rose-500' : 'hover:text-white'
            }`}
          >
            Intelligence
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                {user.role === 'ADMIN' && (
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                )}
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl py-1.5 text-xs text-zinc-300 z-50"
                >
                  <div className="px-3.5 py-2 border-b border-zinc-800/80">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[11px] font-mono text-zinc-500 truncate">{user.phoneNumber}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('profile');
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-zinc-800/80 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>My Profile & Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('favorites');
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-zinc-800/80 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Saved Favourites</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('history');
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-zinc-800/80 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <History className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Search History</span>
                  </button>

                  {user.role === 'ADMIN' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('admin');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-950/40 text-rose-400 flex items-center gap-2 transition-colors border-t border-zinc-800/80"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                      <span>Admin Control Center</span>
                    </button>
                  )}

                  <div className="border-t border-zinc-800/80 my-1" />

                  <button
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await logout();
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-zinc-800/80 text-zinc-400 hover:text-red-400 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1117] border-b border-zinc-800 px-4 pt-2 pb-4 space-y-2 text-sm font-medium">
          <button
            onClick={() => {
              onNavigate('browse');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Browse Cars
          </button>
          <button
            onClick={() => {
              onNavigate('brands');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Brands Directory
          </button>
          <button
            onClick={() => {
              onNavigate('compare');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Compare Vehicles ({comparisonIds.length})
          </button>
          <button
            onClick={() => {
              onNavigate('electric');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Electric Vehicles
          </button>
          <button
            onClick={() => {
              onNavigate('intelligence');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Intelligence & Reviews
          </button>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-rose-400 font-semibold"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
}
