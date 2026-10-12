import React from 'react';
import { Vehicle, VehicleVariant } from '../../types/automotive.js';
import { ShieldCheck, Zap, Gauge, Maximize2, Award } from 'lucide-react';

interface SpecificationTableProps {
  vehicle: Vehicle;
  activeVariant?: VehicleVariant;
}

export function SpecificationTable({ vehicle, activeVariant }: SpecificationTableProps) {
  const specs = vehicle.specs;
  const dims = vehicle.dimensions;
  const safety = vehicle.safetyRating;

  // Use variant specific values if provided
  const powerHp = activeVariant ? activeVariant.powerHp : specs.maxPowerHp;
  const torqueNm = activeVariant ? activeVariant.torqueNm : specs.maxTorqueNm;
  const zeroToHundred = activeVariant ? activeVariant.zeroToHundredKphSec : specs.zeroToHundredKphSec;
  const topSpeed = activeVariant ? activeVariant.topSpeedKph : specs.topSpeedKph;
  const range = activeVariant?.rangeKm || specs.electricRangeKm;
  const battery = activeVariant?.batteryKwh || specs.batteryCapacityKwh;
  const transmission = activeVariant?.transmission || specs.transmission;
  const driveType = activeVariant?.driveType || specs.driveType;

  return (
    <div className="space-y-8">
      {/* Powertrain & Performance Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
          <Zap className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Powertrain & Mechanical Performance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-xs">
          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Powertrain Configuration</span>
            <span className="font-semibold text-white">{vehicle.powertrainType}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Maximum Power</span>
            <span className="font-mono font-semibold text-white tabular-nums">{powerHp} hp ({Math.round(powerHp * 0.7457)} kW)</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Maximum Torque</span>
            <span className="font-mono font-semibold text-white tabular-nums">{torqueNm} Nm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Acceleration (0–100 km/h)</span>
            <span className="font-mono font-semibold text-white tabular-nums">{zeroToHundred} seconds</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Top Speed</span>
            <span className="font-mono font-semibold text-white tabular-nums">{topSpeed} km/h</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Drivetrain</span>
            <span className="font-semibold text-white">{driveType}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Transmission</span>
            <span className="font-semibold text-white text-right max-w-[200px] truncate">{transmission}</span>
          </div>

          {battery && (
            <div className="flex justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Battery Capacity</span>
              <span className="font-mono font-semibold text-white tabular-nums">{battery} kWh</span>
            </div>
          )}

          {range && (
            <div className="flex justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">WLTP Driving Range</span>
              <span className="font-mono font-semibold text-white tabular-nums">{range} km</span>
            </div>
          )}

          {specs.chargingSpeedKw && (
            <div className="flex justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Max DC Fast Charge</span>
              <span className="font-mono font-semibold text-white tabular-nums">{specs.chargingSpeedKw} kW</span>
            </div>
          )}

          {specs.chargingTime10to80Min && (
            <div className="flex justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">10% to 80% DC Charging</span>
              <span className="font-mono font-semibold text-white tabular-nums">{specs.chargingTime10to80Min} mins</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Emission Standard</span>
            <span className="font-semibold text-white">{specs.emissionStandard}</span>
          </div>
        </div>
      </div>

      {/* Dimensions & Capacities */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
          <Maximize2 className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Dimensions, Geometry & Capacity
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-xs">
          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Overall Length</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.lengthMm} mm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Overall Width</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.widthMm} mm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Overall Height</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.heightMm} mm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Wheelbase</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.wheelbaseMm} mm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Ground Clearance</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.groundClearanceMm} mm</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Kerb Weight</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.kerbWeightKg} kg</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Boot Volume</span>
            <span className="font-mono font-semibold text-white tabular-nums">{dims.bootCapacityLiters} Liters</span>
          </div>

          {dims.frunkCapacityLiters && (
            <div className="flex justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Front Trunk (Frunk)</span>
              <span className="font-mono font-semibold text-white tabular-nums">{dims.frunkCapacityLiters} Liters</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Seating Capacity</span>
            <span className="font-semibold text-white">{dims.seatingCapacity} Passengers</span>
          </div>

          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span className="text-zinc-400">Wheels & Tyres</span>
            <span className="font-mono font-semibold text-white text-right max-w-[200px] truncate">{dims.tyreSpecs}</span>
          </div>
        </div>
      </div>

      {/* Crash Safety & NCAP Certification */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
          <Award className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Crash Safety & Homologation Ratings
          </h3>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{safety.ncapOrganization} Standard Evaluation</span>
                <span className="text-amber-400 text-xs">
                  {'★'.repeat(safety.stars)}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Tested Model Year: {safety.yearTested}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-zinc-850 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-sans block">Adult Occupant</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">{safety.adultSafetyPercent}%</span>
            </div>
            <div className="bg-zinc-850 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-sans block">Child Occupant</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">{safety.childSafetyPercent}%</span>
            </div>
            <div className="bg-zinc-850 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-sans block">Vulnerable User</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">{safety.vulnerableRoadUserPercent}%</span>
            </div>
            <div className="bg-zinc-850 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-sans block">Safety Assist</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">{safety.safetyAssistPercent}%</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mt-3 italic border-t border-zinc-800/80 pt-2">
            &ldquo;{safety.testNotes}&rdquo;
          </p>
        </div>
      </div>

      {/* Equipment & ADAS */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Standard Safety & Driver Assistance (ADAS)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-200">Active ADAS Suite</h4>
            <ul className="space-y-1.5 text-zinc-400">
              {vehicle.equipment.adasFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 shrink-0 font-bold">&check;</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-200">Passive & Structural Safety</h4>
            <ul className="space-y-1.5 text-zinc-400">
              {vehicle.equipment.safety.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 shrink-0 font-bold">&check;</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
