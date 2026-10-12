import React, { useState, useMemo } from 'react';
import { Brand } from '../types/automotive.js';
import { Search, Globe, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BrandsViewProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
}

export function BrandsView({ brands, onSelectBrand }: BrandsViewProps) {
  const [search, setSearch] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countries = useMemo(() => {
    return Array.from(new Set(brands.map((b) => b.country))).sort();
  }, [brands]);

  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      const matchesSearch =
        search.trim() === '' ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.country.toLowerCase().includes(search.toLowerCase()) ||
        b.primarySegments.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesCountry =
        selectedCountry === 'all' || b.country.toLowerCase() === selectedCountry.toLowerCase();

      return matchesSearch && matchesCountry;
    });
  }, [brands, search, selectedCountry]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Directory Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
            Verified Automaker Registry
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Global Car Brands Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Historical lineage, homologation records, and model lineups from world manufacturers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter brand name or origin..."
              className="pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Origin Markets</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brands Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => onSelectBrand(brand)}
            className="bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700/80 rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors tracking-tight">
                    {brand.name}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {brand.country} &middot; Est. {brand.foundedYear}
                  </div>
                </div>

                {brand.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                {brand.description}
              </p>

              {/* Segments (unboxed inline text) */}
              <div className="text-[11px] text-zinc-400 font-mono pb-4 border-b border-zinc-800/80">
                <span>Segments: </span>
                <span className="text-zinc-300">{brand.primarySegments.join(' · ')}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-white font-semibold">
                {brand.modelsCount} Models Indexed
              </span>
              <span className="text-rose-500 group-hover:translate-x-1 transition-transform font-medium flex items-center gap-1">
                <span>Explore Lineup</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BrandDetailViewProps {
  brand: Brand;
  onNavigate: (view: string) => void;
  onSelectVehicle: (vehicle: any) => void;
  allVehicles: any[];
}

export function BrandDetailView({
  brand,
  onNavigate,
  onSelectVehicle,
  allVehicles
}: BrandDetailViewProps) {
  const brandModels = allVehicles.filter(
    (v) => v.brandId === brand.id || v.brandName.toLowerCase() === brand.name.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">
          Brands
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-white font-medium">{brand.name}</span>
      </nav>

      {/* Brand Header Showcase */}
      <div className="bg-[#10131b] border border-zinc-850 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="text-xs text-rose-500 font-semibold uppercase tracking-widest mb-1">
              Automotive Manufacturer Overview
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {brand.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Headquarters: {brand.headquarters} &middot; Founded {brand.foundedYear}
            </p>
          </div>

          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-750 hover:border-zinc-600 text-zinc-200 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Official Web Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Brand Profile & Engineering Philosophy
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
            {brand.description}
          </p>

          <div className="pt-2 text-xs text-zinc-400 font-mono">
            <span>Verified Type-Approval Sources: </span>
            <span className="text-zinc-300">{brand.dataSources.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Models Lineup */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Current {brand.name} Models ({brandModels.length})
        </h2>

        {brandModels.length === 0 ? (
          <div className="p-12 text-center bg-[#10131b] border border-zinc-800 rounded-2xl text-xs text-zinc-500">
            Additional models for {brand.name} are currently in homologation verification pipeline.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandModels.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => onSelectVehicle(vehicle)}
                className="bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700/80 rounded-2xl overflow-hidden cursor-pointer transition-all p-4 group"
              >
                <div className="aspect-[16/10] bg-zinc-950 rounded-xl overflow-hidden mb-3">
                  <img
                    src={vehicle.gallery[0]?.url}
                    alt={vehicle.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {vehicle.bodyStyle} &middot; {vehicle.modelYear}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 mt-0.5">
                  {vehicle.name}
                </h3>
                <div className="flex items-center justify-between text-xs font-mono pt-3 mt-3 border-t border-zinc-800/80">
                  <span className="text-zinc-400">{vehicle.specs.maxPowerHp} hp</span>
                  <span className="font-bold text-white tabular-nums">
                    {vehicle.basePrice.formatted}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
