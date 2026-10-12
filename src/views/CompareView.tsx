import React, { useState } from 'react';
import { Vehicle, VehicleVariant } from '../types/automotive.js';
import { useComparison } from '../../src/context/ComparisonContext.js';
import { ImageFallback } from '../components/vehicles/ImageFallback.js';
import {
  Plus,
  X,
  Scale,
  Share2,
  Trash2,
  ChevronDown,
  Check,
  Zap,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CompareViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate: (view: string) => void;
}

export function CompareView({ vehicles, onSelectVehicle, onNavigate }: CompareViewProps) {
  const { comparisonIds, removeVehicle, addVehicle, clearComparison } = useComparison();
  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedVariants, setSelectedVariants] = useState<{ [carId: string]: string }>({});

  // Active compared vehicles
  const comparedVehicles = comparisonIds
    .map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined);

  const handleShare = () => {
    if (navigator.clipboard) {
      const url = `${window.location.origin}/#compare?ids=${comparisonIds.join(',')}`;
      navigator.clipboard.writeText(url);
      alert('Comparison matrix link copied to clipboard!');
    }
  };

  const getVariant = (v: Vehicle): VehicleVariant => {
    const varId = selectedVariants[v.id];
    return v.variants.find((variant) => variant.id === varId) || v.variants[0];
  };

  // Helper to check if row values differ across columns
  const areValuesDifferent = (values: any[]) => {
    if (values.length <= 1) return false;
    const first = values[0];
    return values.some((val) => val !== first);
  };

  // Row comparison definitions
  const specRows = [
    {
      label: 'Base MSRP (USD)',
      getValue: (v: Vehicle) => getVariant(v).price.formatted,
      isNumeric: false
    },
    {
      label: 'Powertrain',
      getValue: (v: Vehicle) => v.powertrainType,
      isNumeric: false
    },
    {
      label: 'Maximum Power',
      getValue: (v: Vehicle) => `${getVariant(v).powerHp} hp`,
      isNumeric: true
    },
    {
      label: 'Maximum Torque',
      getValue: (v: Vehicle) => `${getVariant(v).torqueNm} Nm`,
      isNumeric: true
    },
    {
      label: 'Acceleration (0–100 km/h)',
      getValue: (v: Vehicle) => `${getVariant(v).zeroToHundredKphSec}s`,
      isNumeric: true
    },
    {
      label: 'Top Speed',
      getValue: (v: Vehicle) => `${getVariant(v).topSpeedKph} km/h`,
      isNumeric: true
    },
    {
      label: 'Drivetrain',
      getValue: (v: Vehicle) => getVariant(v).driveType,
      isNumeric: false
    },
    {
      label: 'Electric Range (WLTP)',
      getValue: (v: Vehicle) => (getVariant(v).rangeKm ? `${getVariant(v).rangeKm} km` : 'N/A (Combustion)'),
      isNumeric: false
    },
    {
      label: 'Battery Pack',
      getValue: (v: Vehicle) => (getVariant(v).batteryKwh ? `${getVariant(v).batteryKwh} kWh` : 'N/A'),
      isNumeric: false
    },
    {
      label: 'DC Fast Charge',
      getValue: (v: Vehicle) => (v.specs.chargingSpeedKw ? `${v.specs.chargingSpeedKw} kW` : 'N/A'),
      isNumeric: false
    },
    {
      label: 'Overall Length',
      getValue: (v: Vehicle) => `${v.dimensions.lengthMm} mm`,
      isNumeric: true
    },
    {
      label: 'Wheelbase',
      getValue: (v: Vehicle) => `${v.dimensions.wheelbaseMm} mm`,
      isNumeric: true
    },
    {
      label: 'Ground Clearance',
      getValue: (v: Vehicle) => `${v.dimensions.groundClearanceMm} mm`,
      isNumeric: true
    },
    {
      label: 'Kerb Weight',
      getValue: (v: Vehicle) => `${v.dimensions.kerbWeightKg} kg`,
      isNumeric: true
    },
    {
      label: 'Boot Capacity',
      getValue: (v: Vehicle) => `${v.dimensions.bootCapacityLiters} L`,
      isNumeric: true
    },
    {
      label: 'Seating Capacity',
      getValue: (v: Vehicle) => `${v.dimensions.seatingCapacity} Seats`,
      isNumeric: false
    },
    {
      label: 'Crash Safety Rating',
      getValue: (v: Vehicle) => `${v.safetyRating.ncapOrganization} (${'★'.repeat(v.safetyRating.stars)})`,
      isNumeric: false
    },
    {
      label: 'Factory Warranty',
      getValue: (v: Vehicle) => v.equipment.warranty,
      isNumeric: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
            Engineering Benchmark Matrix
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Vehicle Comparison</span>
            <span className="text-sm font-mono text-zinc-500 font-normal">
              ({comparedVehicles.length} of 4)
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Compare mechanical power, battery architecture, dimensions, and crash ratings side-by-side.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Highlight Differences Toggle */}
          <button
            onClick={() => setOnlyDifferences(!onlyDifferences)}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors flex items-center gap-1.5 ${
              onlyDifferences
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span>Highlight Differences</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-300 hover:text-white transition-colors"
            title="Share Comparison"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {comparedVehicles.length > 0 && (
            <button
              onClick={clearComparison}
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-rose-400 transition-colors"
              title="Clear Comparison"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {comparedVehicles.length < 4 && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}
        </div>
      </div>

      {comparedVehicles.length === 0 ? (
        <div className="text-center py-20 px-4 bg-[#10131b] border border-zinc-800 rounded-2xl space-y-4">
          <Scale className="w-12 h-12 text-zinc-600 mx-auto stroke-[1.2]" />
          <h3 className="text-lg font-bold text-white">No Vehicles Added to Comparison</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Select vehicles from the catalog or click below to launch a side-by-side technical evaluation.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Choose Vehicles</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Table Header: Vehicle cards */}
            <thead>
              <tr>
                <th className="p-4 w-48 bg-[#0d0f14] border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider align-bottom">
                  Specification Parameter
                </th>
                {comparedVehicles.map((v) => (
                  <th
                    key={v.id}
                    className="p-4 bg-[#11141c] border-b border-zinc-800 border-l border-zinc-800/80 align-top relative min-w-[240px]"
                  >
                    <button
                      onClick={() => removeVehicle(v.id)}
                      className="absolute top-3 right-3 p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 mb-3 border border-zinc-800">
                      <ImageFallback
                        src={v.gallery[0]?.url}
                        alt={v.name}
                        fallbackTitle={`${v.brandName} ${v.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-[11px] text-zinc-400 font-mono">
                      {v.brandName} &middot; {v.modelYear}
                    </div>

                    <h3
                      onClick={() => onSelectVehicle(v)}
                      className="text-sm font-bold text-white hover:text-rose-400 transition-colors cursor-pointer line-clamp-1 mb-2"
                    >
                      {v.name}
                    </h3>

                    {/* Variant Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase block font-sans">
                        Trim Variant
                      </label>
                      <select
                        value={selectedVariants[v.id] || v.variants[0]?.id}
                        onChange={(e) =>
                          setSelectedVariants({ ...selectedVariants, [v.id]: e.target.value })
                        }
                        className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
                      >
                        {v.variants.map((varItem) => (
                          <option key={varItem.id} value={varItem.id}>
                            {varItem.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                ))}
                {/* Empty placeholder column if < 4 vehicles */}
                {comparedVehicles.length < 4 && (
                  <th className="p-4 bg-zinc-950/40 border-b border-zinc-800 border-l border-zinc-850 align-middle text-center min-w-[200px]">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="p-8 w-full border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl text-zinc-500 hover:text-zinc-300 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-xs font-medium">Add Next Vehicle</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body: Specification rows */}
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {specRows.map((row, idx) => {
                const values = comparedVehicles.map((v) => row.getValue(v));
                const isDifferent = areValuesDifferent(values);

                if (onlyDifferences && !isDifferent) return null;

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-zinc-850/30 transition-colors ${
                      isDifferent ? 'bg-rose-950/10' : ''
                    }`}
                  >
                    <td className="p-4 font-medium text-zinc-300 bg-[#0d0f14]/50">
                      <div className="flex items-center gap-2">
                        {isDifferent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        )}
                        <span>{row.label}</span>
                      </div>
                    </td>

                    {comparedVehicles.map((v) => {
                      const val = row.getValue(v);
                      return (
                        <td
                          key={v.id}
                          className={`p-4 border-l border-zinc-800/80 font-mono text-zinc-200 ${
                            row.isNumeric ? 'tabular-nums' : ''
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}

                    {comparedVehicles.length < 4 && (
                      <td className="p-4 border-l border-zinc-850 bg-zinc-950/20 text-zinc-600 text-center">
                        &mdash;
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#10131a] border border-zinc-800 rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Select Vehicle to Compare</h3>
                <p className="text-xs text-zinc-400">Choose from available verified models</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-zinc-800/60">
              {vehicles.map((v) => {
                const alreadyAdded = comparisonIds.includes(v.id);
                return (
                  <div
                    key={v.id}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-zinc-900 rounded-md overflow-hidden shrink-0 border border-zinc-800">
                        <img
                          src={v.gallery[0]?.url}
                          alt={v.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {v.brandName} {v.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">
                          {v.bodyStyle} &middot; {v.specs.maxPowerHp} hp &middot; {v.basePrice.formatted}
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={alreadyAdded}
                      onClick={() => {
                        addVehicle(v.id);
                        setIsAddModalOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        alreadyAdded
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      {alreadyAdded ? 'Added' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
