import React, { useState } from 'react';
import { Vehicle, Brand, Article } from '../types/automotive.js';
import { SearchBar } from '../components/search/SearchBar.js';
import { VehicleCard } from '../components/vehicles/VehicleCard.js';
import { ImageFallback } from '../components/vehicles/ImageFallback.js';
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Zap,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  vehicles: Vehicle[];
  brands: Brand[];
  articles: Article[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectBrand: (brand: Brand) => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
  onSearch: (query: string) => void;
}

export function HomeView({
  vehicles,
  brands,
  articles,
  onSelectVehicle,
  onSelectBrand,
  onSelectArticle,
  onNavigate,
  onSearch
}: HomeViewProps) {
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>('all');

  const heroVehicle =
    vehicles.find((v) => v.id === 'car-porsche-taycan-turbo-s') || vehicles[0];

  const trendingVehicles = vehicles.filter((v) => v.isTrending);
  const latestLaunches = vehicles.filter((v) => v.isLatestLaunch);

  const displayedVehicles =
    selectedBodyStyle === 'all'
      ? vehicles.slice(0, 6)
      : vehicles.filter((v) => v.bodyStyle.toLowerCase() === selectedBodyStyle.toLowerCase());

  const bodyStyles = [
    { label: 'All Styles', value: 'all' },
    { label: 'Sedans', value: 'sedan' },
    { label: 'SUVs & 4x4s', value: 'suv' },
    { label: 'Sports & Coupes', value: 'sports car' },
    { label: 'Hatchbacks', value: 'hatchback' }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">
              Independent Global Automotive Intelligence
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Every Car. Every Detail. One World.
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8">
              Explore verified technical specifications, certified crash testing,
              multi-market pricing, and objective cross-model comparisons across the world’s foremost automakers.
            </p>

            {/* Central Autocomplete Search Bar */}
            <SearchBar vehicles={vehicles} onSearch={onSearch} />
          </div>

          {/* Featured Spotlight Card */}
          {heroVehicle && (
            <div className="mt-12 bg-gradient-to-b from-[#141822] to-[#0f1218] border border-zinc-800 rounded-3xl overflow-hidden p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-5">
                  <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                    <span className="text-rose-400 font-semibold">{heroVehicle.brandName}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{heroVehicle.modelYear} Specification</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{heroVehicle.brandCountry}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {heroVehicle.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {heroVehicle.expertVerdict}
                  </p>

                  {/* High Impact Spec KPIs (tabular numerals) */}
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-zinc-800 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-sans uppercase block">Output</span>
                      <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                        {heroVehicle.specs.maxPowerHp} hp
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-sans uppercase block">0–100 km/h</span>
                      <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                        {heroVehicle.specs.zeroToHundredKphSec}s
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-sans uppercase block">WLTP Range</span>
                      <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                        {heroVehicle.specs.electricRangeKm} km
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectVehicle(heroVehicle)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-2"
                    >
                      <span>Complete Technical Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('compare')}
                      className="px-4 py-2.5 bg-zinc-900 border border-zinc-750 hover:border-zinc-600 text-zinc-200 text-xs font-medium rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Compare Matrix</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <ImageFallback
                      src={heroVehicle.gallery[0]?.url}
                      alt={heroVehicle.name}
                      fallbackTitle={`${heroVehicle.brandName} ${heroVehicle.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-[11px] font-mono text-zinc-300">
                      Verified OEM Media &middot; Stuttgart
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collection & Body Style Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
              Verified Database Lineup
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Global Automobiles
            </h2>
          </div>

          {/* Interactive filter segmented control */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-x-auto">
            {bodyStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => setSelectedBodyStyle(style.value)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedBodyStyle === style.value
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('browse')}
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-white font-medium text-xs rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <span>View All {vehicles.length} Vehicles in Registry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Automakers Directory Carousel / Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
              Global Manufacturing Heritage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified Automaker Directory
            </h2>
          </div>
          <button
            onClick={() => onNavigate('brands')}
            className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>All Brands</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.slice(0, 12).map((brand) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className="p-4 bg-[#11141c] hover:bg-[#161a24] border border-zinc-850 hover:border-zinc-700 rounded-2xl cursor-pointer transition-all text-center flex flex-col items-center justify-between group"
            >
              <div className="my-2">
                <span className="text-sm font-bold text-white tracking-widest group-hover:text-rose-400 transition-colors">
                  {brand.name}
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">{brand.country}</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-2">
                Est. {brand.foundedYear} &middot; {brand.modelsCount} Models
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electric & Hybrid Innovations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121622] border border-zinc-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Electrification Intelligence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Compare Battery Architecture, 800V DC Speeds, and Verified WLTP Range
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Dive deep into lithium iron phosphate (LFP), nickel-cobalt-manganese (NCM),
              and next-generation solid-state battery specifications alongside real-world charging curves.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('electric')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Electric Vehicle Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-750 text-zinc-200 hover:text-white font-medium text-xs rounded-xl transition-colors"
              >
                Launch Multi-Car Comparison
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Intelligence & Editorial Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
              Automotive Journalism & Technical Analysis
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Latest Industry Intelligence
            </h2>
          </div>
          <button
            onClick={() => onNavigate('intelligence')}
            className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>All Articles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700/80 rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span className="text-rose-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.author}</span>
                <span className="font-mono text-[11px]">{article.publishedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regulatory & Homologation Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                Standardized Global Homologation Records
              </h4>
              <p className="text-zinc-400 leading-relaxed max-w-xl">
                All technical dimensions, kerb weights, crash metrics, and powertrain outputs are
                strictly verified against Euro NCAP, KBA Germany, ARAI India, and NHTSA official test registries.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('sources')}
            className="px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 font-medium text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 border border-zinc-750"
          >
            Review Data Registry
          </button>
        </div>
      </section>
    </div>
  );
}
