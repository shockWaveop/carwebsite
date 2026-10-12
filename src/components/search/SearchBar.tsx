import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Zap, Shield } from 'lucide-react';
import { Vehicle } from '../../types/automotive.js';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  vehicles: Vehicle[];
}

export function SearchBar({ initialQuery = '', onSearch, vehicles }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase().trim();
    const matched = vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.brandName.toLowerCase().includes(q) ||
        v.bodyStyle.toLowerCase().includes(q) ||
        v.powertrainType.toLowerCase().includes(q)
    ).slice(0, 5);

    setSuggestions(matched);
    setIsOpen(matched.length > 0);
  }, [query, vehicles]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearch(query);
  };

  const handleSelectSuggestion = (v: Vehicle) => {
    setQuery(`${v.brandName} ${v.name}`);
    setIsOpen(false);
    onSearch(`${v.brandName} ${v.name}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-zinc-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by brand, model, horsepower, EV range, or keyword..."
          className="w-full pl-12 pr-24 py-3.5 bg-zinc-900/90 border border-zinc-750 focus:border-rose-500 rounded-2xl text-sm text-white placeholder-zinc-500 shadow-xl focus:outline-none transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute right-20 text-zinc-500 hover:text-zinc-300 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Explore
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#12151e] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-40">
          <div className="p-2 divide-y divide-zinc-800/60">
            {suggestions.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleSelectSuggestion(v)}
                className="w-full text-left p-3 hover:bg-zinc-800/60 rounded-xl flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-zinc-900 rounded-md overflow-hidden flex items-center justify-center border border-zinc-800">
                    <img
                      src={v.gallery[0]?.url}
                      alt={v.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                      {v.brandName} {v.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {v.bodyStyle} &middot; {v.specs.maxPowerHp} hp &middot; {v.basePrice.formatted}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
