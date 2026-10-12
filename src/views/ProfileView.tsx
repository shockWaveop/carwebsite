import React, { useState, useEffect } from 'react';
import { Vehicle, SearchHistoryEntry } from '../types/automotive.js';
import { useAuth } from '../../src/context/AuthContext.js';
import { useFavorites } from '../../src/context/FavoritesContext.js';
import { VehicleCard } from '../components/vehicles/VehicleCard.js';
import { api } from '../lib/api.js';
import {
  User,
  Heart,
  History,
  Settings,
  Trash2,
  ShieldCheck,
  Phone,
  CheckCircle2,
  RotateCcw,
  LogOut,
  AlertTriangle
} from 'lucide-react';

interface ProfileViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate: (view: string) => void;
  initialTab?: 'profile' | 'favorites' | 'history' | 'settings';
}

export function ProfileView({
  vehicles,
  onSelectVehicle,
  onNavigate,
  initialTab = 'profile'
}: ProfileViewProps) {
  const { user, openAuthModal, logout, updateProfile, deleteAccount } = useAuth();
  const { favoriteIds } = useFavorites();

  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'history' | 'settings'>(
    initialTab
  );
  const [historyList, setHistoryList] = useState<SearchHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  // Settings form state
  const [nameInput, setNameInput] = useState<string>(user?.name || '');
  const [emailInput, setEmailInput] = useState<string>(user?.email || '');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Delete modal state
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setNameInput(user.name);
      setEmailInput(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'history') {
      setLoadingHistory(true);
      api.getHistory()
        .then((res) => {
          setHistoryList(res.history);
          setLoadingHistory(false);
        })
        .catch(() => setLoadingHistory(false));
    }
  }, [activeTab]);

  const savedVehicles = vehicles.filter((v) => favoriteIds.includes(v.id));

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateProfile({ name: nameInput, email: emailInput });
      setSaveSuccess('Profile settings updated successfully.');
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating profile');
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your personal search history?')) {
      await api.clearHistory();
      setHistoryList([]);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('WARNING: This will permanently delete your account, saved vehicles, and research history. Proceed?')) {
      await deleteAccount();
      onNavigate('home');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Sign In to AutoVerse Global</h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Access your personal automotive garage, sync saved vehicles across devices, and manage search history.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-xl transition-colors"
        >
          Sign In with Phone Verification
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-[#10131b] border border-zinc-850 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
              {user.role === 'ADMIN' && (
                <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-[10px] text-rose-300 font-bold uppercase font-mono">
                  Administrator
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>{user.phoneNumber}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Verified Phone</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'ADMIN' && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Console</span>
            </button>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Cars ({savedVehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Search History</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Account Settings</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#11141c] border border-zinc-850 rounded-2xl space-y-3">
            <span className="text-[11px] font-bold text-zinc-500 uppercase">Account Status</span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Active & Verified</span>
            </div>
            <p className="text-xs text-zinc-400">
              Authenticated via international phone OTP protocol.
            </p>
          </div>

          <div className="p-6 bg-[#11141c] border border-zinc-850 rounded-2xl space-y-3">
            <span className="text-[11px] font-bold text-zinc-500 uppercase">Saved Collection</span>
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
              {savedVehicles.length}
            </div>
            <p className="text-xs text-zinc-400">
              Vehicles bookmarked in personal research garage.
            </p>
          </div>

          <div className="p-6 bg-[#11141c] border border-zinc-850 rounded-2xl space-y-3">
            <span className="text-[11px] font-bold text-zinc-500 uppercase">Access Tier</span>
            <div className="text-base font-bold text-white">
              {user.role === 'ADMIN' ? 'Chief Editorial Staff' : 'Registered Automotive Member'}
            </div>
            <p className="text-xs text-zinc-400 font-mono text-[11px]">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {savedVehicles.length === 0 ? (
            <div className="text-center py-16 bg-[#10131b] border border-zinc-800 rounded-2xl space-y-3">
              <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">No Saved Vehicles Yet</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Click the heart icon on any vehicle card to bookmark it for rapid review and comparison.
              </p>
              <button
                onClick={() => onNavigate('browse')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Explore Cars
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={onSelectVehicle}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-white">Personal Search Activity</h3>
              <p className="text-xs text-zinc-400">Recent vehicle lookups and filter configurations</p>
            </div>
            {historyList.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {loadingHistory ? (
            <p className="text-xs text-zinc-500">Loading search history...</p>
          ) : historyList.length === 0 ? (
            <div className="text-center py-12 bg-[#10131b] border border-zinc-800 rounded-2xl text-xs text-zinc-500">
              No recent search queries recorded.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60 border border-zinc-800 rounded-2xl bg-[#11141c] overflow-hidden">
              {historyList.map((entry) => (
                <div key={entry.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-white">&ldquo;{entry.query}&rdquo;</span>
                    {entry.filters && (
                      <span className="text-zinc-500 ml-2 font-mono text-[11px]">
                        ({Object.values(entry.filters).filter(Boolean).join(', ')})
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl space-y-8">
          <form onSubmit={handleSaveSettings} className="p-6 bg-[#11141c] border border-zinc-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Profile Details</h3>

            {saveSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                {saveSuccess}
              </div>
            )}

            <div>
              <label className="text-xs text-zinc-300 block mb-1">Display Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="optional@example.com"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 block mb-1">Verified Phone</label>
              <input
                type="text"
                disabled
                value={user.phoneNumber}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-zinc-500 font-mono cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Save Profile Changes
            </button>
          </form>

          {/* Danger Zone: Account Deletion */}
          <div className="p-6 bg-red-950/20 border border-red-900/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Danger Zone</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Permanently delete your account, session credentials, and associated research data. This action is irreversible.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Delete My Account Permanently
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
