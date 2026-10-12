import React from 'react';
import { Vehicle } from '../../types/automotive.js';
import { ImageFallback } from './ImageFallback.js';
import { useComparison } from '../../context/ComparisonContext.js';
import { useFavorites } from '../../context/FavoritesContext.js';
import { Heart, Scale, Zap, Gauge, Fuel } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const { isInComparison, addVehicle, removeVehicle } = useComparison();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCompare = isInComparison(vehicle.id);
  const isFav = isFavorite(vehicle.id);

  const primaryImage =
    vehicle.gallery.find((g) => g.isPrimary)?.url ||
    vehicle.gallery[0]?.url ||
    '';

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeVehicle(vehicle.id);
    } else {
      addVehicle(vehicle.id);
    }
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(vehicle.id);
  };

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="group bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Actions overlay */}
        <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
          <ImageFallback
            src={primaryImage}
            alt={`${vehicle.brandName} ${vehicle.name}`}
            fallbackTitle={`${vehicle.brandName} ${vehicle.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Action buttons (floating top-right) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={handleCompareToggle}
              title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                inCompare
                  ? 'bg-rose-600 text-white'
                  : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleFavoriteToggle}
              title={isFav ? 'Remove from saved' : 'Save to favourites'}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isFav
                  ? 'bg-rose-600 text-white'
                  : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Zero-Pill Quiet Market Origin Kicker */}
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300">
            {vehicle.brandCountry}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Unboxed Metadata (NO PILLS) */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300 tracking-wider uppercase text-[11px]">
              {vehicle.brandName}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{vehicle.bodyStyle}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="font-mono">{vehicle.modelYear}</span>
          </div>

          {/* Vehicle Name */}
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors line-clamp-1 mb-3">
            {vehicle.name}
          </h3>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-800/80 text-xs text-zinc-300 font-mono">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-sans">Power</span>
              <span className="font-semibold tabular-nums text-white">
                {vehicle.specs.maxPowerHp} hp
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-sans">0–100 km/h</span>
              <span className="font-semibold tabular-nums text-white">
                {vehicle.specs.zeroToHundredKphSec}s
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-sans">
                {vehicle.powertrainType === 'Battery Electric' ? 'Range' : 'Drive'}
              </span>
              <span className="font-semibold tabular-nums text-white">
                {vehicle.powertrainType === 'Battery Electric'
                  ? `${vehicle.specs.electricRangeKm} km`
                  : vehicle.specs.driveType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Price & Powertrain */}
      <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400">
          {vehicle.powertrainType === 'Battery Electric' ? (
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          ) : vehicle.powertrainType.includes('Hybrid') ? (
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Fuel className="w-3.5 h-3.5 text-zinc-400" />
          )}
          <span>{vehicle.powertrainType}</span>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold text-white font-mono tabular-nums">
            {vehicle.basePrice.formatted}
          </span>
        </div>
      </div>
    </div>
  );
}
