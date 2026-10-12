import React, { useState } from 'react';
import { Vehicle } from '../types/automotive.js';
import { VehicleCard } from '../components/vehicles/VehicleCard.js';
import { Zap, BatteryCharging, Gauge, ArrowRight } from 'lucide-react';

interface ElectricViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate: (view: string) => void;
}

export function ElectricView({ vehicles, onSelectVehicle, onNavigate }: ElectricViewProps) {
  const [filterType, setFilterType] = useState<'all' | 'bev' | 'phev'>('all');

  const electricVehicles = vehicles.filter((v) => {
    if (filterType === 'bev') return v.powertrainType === 'Battery Electric';
    if (filterType === 'phev') return v.powertrainType === 'Plug-in Hybrid';
    return v.powertrainType === 'Battery Electric' || v.powertrainType === 'Plug-in Hybrid';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#121624] to-[#0c0e14] border border-zinc-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold uppercase tracking-widest">
            <Zap className="w-4 h-4" />
            <span>Zero & Low Emission Powertrains</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Electric & Hybrid Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Index of high-voltage battery architecture, WLTP range benchmarks, 400V/800V DC rapid charging
            rates, and multi-motor torque vectoring.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'all'
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Electrified ({vehicles.filter((v) => v.powertrainType.includes('Electric') || v.powertrainType.includes('Hybrid')).length})
            </button>
            <button
              onClick={() => setFilterType('bev')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'bev'
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Pure Electric (BEV)
            </button>
            <button
              onClick={() => setFilterType('phev')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'phev'
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Plug-in Hybrid (PHEV)
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {electricVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={onSelectVehicle}
          />
        ))}
      </div>
    </div>
  );
}
