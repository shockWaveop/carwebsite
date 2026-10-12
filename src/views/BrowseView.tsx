import React, { useState, useMemo } from 'react';
import { Vehicle } from '../types/automotive.js';
import { VehicleCard } from '../components/vehicles/VehicleCard.js';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Fuel,
  Car,
  Globe,
  DollarSign
} from 'lucide-react';

interface BrowseViewProps {
  vehicles: Vehicle[];
  initialSearchQuery?: string;
  initialFilter?: string;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onRecordSearchHistory?: (query: string, filters: any) => void;
}

export function BrowseView({
  vehicles,
  initialSearchQuery = '',
  initialFilter = '',
  onSelectVehicle,
  onRecordSearchHistory
}: BrowseViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>(
    ['SUV', 'Sedan', 'Hatchback', 'Sports Car', 'Coupe'].includes(initialFilter)
      ? initialFilter
      : 'all'
  );
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>(
    ['Battery Electric', 'Hybrid', 'Plug-in Hybrid', 'Petrol', 'Diesel'].includes(initialFilter)
      ? initialFilter
      : 'all'
  );
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(400000);
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState<boolean>(false);

  // Filter calculation
  const filteredVehicles = useMemo(() => {
    let result = vehicles;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brandName.toLowerCase().includes(q) ||
          v.bodyStyle.toLowerCase().includes(q) ||
          v.powertrainType.toLowerCase().includes(q) ||
          v.brandCountry.toLowerCase().includes(q)
      );
    }

    if (selectedBodyStyle !== 'all') {
      result = result.filter(
        (v) => v.bodyStyle.toLowerCase() === selectedBodyStyle.toLowerCase()
      );
    }

    if (selectedPowertrain !== 'all') {
      result = result.filter(
        (v) => v.powertrainType.toLowerCase() === selectedPowertrain.toLowerCase()
      );
    }

    if (selectedCountry !== 'all') {
      result = result.filter(
        (v) => v.brandCountry.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    if (priceMax < 400000) {
      result = result.filter((v) => v.basePrice.amount <= priceMax);
    }

    // Sort
    const sorted = [...result];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => a.basePrice.amount - b.basePrice.amount);
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => b.basePrice.amount - a.basePrice.amount);
    } else if (sortBy === 'power_desc') {
      sorted.sort((a, b) => b.specs.maxPowerHp - a.specs.maxPowerHp);
    } else if (sortBy === 'accel_asc') {
      sorted.sort((a, b) => a.specs.zeroToHundredKphSec - b.specs.zeroToHundredKphSec);
    } else if (sortBy === 'year_desc') {
      sorted.sort((a, b) => b.modelYear - a.modelYear);
    }

    return sorted;
  }, [
    vehicles,
    searchQuery,
    selectedBodyStyle,
    selectedPowertrain,
    selectedCountry,
    priceMax,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBodyStyle('all');
    setSelectedPowertrain('all');
    setSelectedCountry('all');
    setPriceMax(400000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedBodyStyle !== 'all' ||
    selectedPowertrain !== 'all' ||
    selectedCountry !== 'all' ||
    priceMax < 400000;

  const countries = Array.from(new Set(vehicles.map((v) => v.brandCountry))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
            Global Automobile Repository
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Browse All Vehicles
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Displaying <span className="text-white font-mono font-bold tabular-nums">{filteredVehicles.length}</span> of {vehicles.length} verified records
          </p>
        </div>

        {/* Search input & Mobile filter trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search make or model..."
              className="w-full pl-10 pr-9 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowMobileFilterDrawer(!showMobileFilterDrawer)}
            className="md:hidden p-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-zinc-300 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Layout with Desktop Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar (Desktop) */}
        <aside
          className={`space-y-6 bg-[#10131b] border border-zinc-850 p-5 rounded-2xl ${
            showMobileFilterDrawer ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
              Filter Parameters
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Body Style */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">Body Architecture</label>
            <select
              value={selectedBodyStyle}
              onChange={(e) => setSelectedBodyStyle(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            >
              <option value="all">All Styles</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV & 4x4</option>
              <option value="Sports Car">Sports Car</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>

          {/* Powertrain */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">Powertrain System</label>
            <select
              value={selectedPowertrain}
              onChange={(e) => setSelectedPowertrain(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            >
              <option value="all">All Powertrains</option>
              <option value="Battery Electric">Battery Electric (BEV)</option>
              <option value="Plug-in Hybrid">Plug-in Hybrid (PHEV)</option>
              <option value="Hybrid">Mild/Full Hybrid</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>

          {/* Country of Origin */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">Country of Origin</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            >
              <option value="all">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Ceiling Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Max Base Price</span>
              <span className="font-mono text-zinc-400 tabular-nums">
                ${priceMax.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="25000"
              max="400000"
              step="10000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-rose-600 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <label className="text-xs font-semibold text-zinc-300 block">Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            >
              <option value="featured">Featured Order</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="power_desc">Power: Highest (hp)</option>
              <option value="accel_asc">Acceleration: Quickest (0-100)</option>
              <option value="year_desc">Model Year: Newest</option>
            </select>
          </div>
        </aside>

        {/* Vehicles Grid / Empty State */}
        <main className="md:col-span-3">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20 px-4 bg-[#10131b] border border-zinc-800 rounded-2xl space-y-4">
              <Car className="w-12 h-12 text-zinc-600 mx-auto stroke-[1.2]" />
              <h3 className="text-lg font-bold text-white">No Vehicles Match Active Filters</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try widening your price range, clearing specific powertrain filters, or searching for broader terms like &ldquo;SUV&rdquo; or &ldquo;Electric&rdquo;.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={onSelectVehicle}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
