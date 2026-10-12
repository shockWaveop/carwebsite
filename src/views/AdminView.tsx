import React, { useState, useEffect } from 'react';
import { Vehicle, Brand, AuditLogEntry } from '../types/automotive.js';
import { api } from '../lib/api.js';
import { useAuth } from '../../src/context/AuthContext.js';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  FileSpreadsheet,
  Database,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AdminViewProps {
  vehicles: Vehicle[];
  brands: Brand[];
  onRefreshData: () => void;
  onNavigate: (view: string) => void;
}

export function AdminView({
  vehicles,
  brands,
  onRefreshData,
  onNavigate
}: AdminViewProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'vehicles' | 'import' | 'audit'>('metrics');
  const [metrics, setMetrics] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // CSV Import State
  const [csvInput, setCsvInput] = useState<string>(
    `brand,model,bodystyle,powertrain,price,powerhp\nLucid,Air Sapphire,Sedan,Battery Electric,249000,1234\nRivian,R1T Quad-Motor,Pickup,Battery Electric,87000,835\nMaserati,MC20 Cielo,Sports Car,Petrol,275000,621`
  );
  const [importResult, setImportResult] = useState<{ importedCount: number; errors: string[] } | null>(null);
  const [importing, setImporting] = useState<boolean>(false);

  // New Vehicle Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newVehicleBrand, setNewVehicleBrand] = useState<string>(brands[0]?.name || 'Porsche');
  const [newVehicleName, setNewVehicleName] = useState<string>('');
  const [newVehicleBody, setNewVehicleBody] = useState<string>('Sedan');
  const [newVehiclePowertrain, setNewVehiclePowertrain] = useState<string>('Battery Electric');
  const [newVehiclePrice, setNewVehiclePrice] = useState<number>(75000);
  const [newVehiclePower, setNewVehiclePower] = useState<number>(450);
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminMetrics();
      setMetrics(res.metrics);
      setAuditLogs(res.auditLogs);
    } catch (err) {
      console.warn('Admin metrics error (may need admin authorization key):', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImportCsv = async () => {
    if (!csvInput.trim()) return;
    setImporting(true);
    setImportResult(null);
    try {
      const res = await api.importCsv(csvInput);
      setImportResult(res);
      onRefreshData();
      loadAdminData();
    } catch (err: any) {
      setImportResult({ importedCount: 0, errors: [err.message || 'Import failed'] });
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteVehicle = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to archive record: ${name}?`)) {
      try {
        await api.deleteVehicle(id);
        onRefreshData();
        loadAdminData();
      } catch (err: any) {
        alert(err.message || 'Error deleting vehicle');
      }
    }
  };

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleName.trim()) return;
    setCreating(true);

    try {
      const brandObj = brands.find((b) => b.name === newVehicleBrand) || brands[0];
      const slug = `${brandObj.name.toLowerCase().replace(/\s+/g, '-')}-${newVehicleName.toLowerCase().replace(/\s+/g, '-')}`;

      const createdVehicle: Partial<Vehicle> = {
        id: `car-adm-${Date.now()}`,
        brandId: brandObj.id,
        brandName: brandObj.name,
        brandCountry: brandObj.country,
        name: newVehicleName,
        slug,
        modelYear: 2026,
        generation: 'Gen I',
        bodyStyle: newVehicleBody as any,
        primaryMarket: 'Global',
        availabilityStatus: 'Available Now',
        launchDate: new Date().toISOString().split('T')[0],
        powertrainType: newVehiclePowertrain as any,
        basePrice: {
          currency: 'USD',
          amount: newVehiclePrice,
          formatted: `$${newVehiclePrice.toLocaleString()}`
        },
        variants: [
          {
            id: `var-${Date.now()}`,
            name: 'Standard Edition',
            trimLevel: 'Base',
            price: { currency: 'USD', amount: newVehiclePrice, formatted: `$${newVehiclePrice.toLocaleString()}` },
            powerHp: newVehiclePower,
            torqueNm: Math.round(newVehiclePower * 1.3),
            zeroToHundredKphSec: 4.5,
            topSpeedKph: 240,
            transmission: 'Automatic Direct Drive',
            driveType: 'AWD',
            keyFeatures: ['Adaptive Suspension', 'Homologated ADAS']
          }
        ],
        specs: {
          maxPowerHp: newVehiclePower,
          maxPowerKw: Math.round(newVehiclePower * 0.745),
          maxTorqueNm: Math.round(newVehiclePower * 1.3),
          transmission: 'Automatic',
          driveType: 'AWD',
          zeroToHundredKphSec: 4.5,
          topSpeedKph: 240,
          emissionStandard: 'Euro 6e'
        },
        dimensions: {
          lengthMm: 4800,
          widthMm: 1900,
          heightMm: 1450,
          wheelbaseMm: 2900,
          groundClearanceMm: 145,
          bootCapacityLiters: 480,
          seatingCapacity: 5,
          doors: 4,
          kerbWeightKg: 2050,
          wheelSizeInches: 20,
          tyreSpecs: '255/40 R20'
        },
        equipment: {
          safety: ['8 Airbags', 'ESC', 'High-strength steel safety cage'],
          interior: ['Heated leatherette seating', 'Multi-zone climate control'],
          infotainment: ['14-inch Touchscreen', 'Wireless Apple CarPlay & Android Auto'],
          exterior: ['Matrix LED lights', 'Aero alloy wheels'],
          adasFeatures: ['Autonomous Emergency Braking', 'Lane Centering'],
          warranty: '5 Years / 100,000 km'
        },
        safetyRating: {
          ncapOrganization: 'Euro NCAP',
          stars: 5,
          yearTested: 2025,
          adultSafetyPercent: 90,
          childSafetyPercent: 88,
          vulnerableRoadUserPercent: 75,
          safetyAssistPercent: 85,
          testNotes: 'Homologation verified structural safety.'
        },
        internationalPricing: [
          { marketCode: 'US', marketName: 'United States', currency: 'USD', price: newVehiclePrice, formatted: `$${newVehiclePrice.toLocaleString()}`, localTaxNote: 'Base MSRP', updatedAt: '2026-03-01' }
        ],
        colors: [
          { name: 'Crystal White', hex: '#f0f0f0', finish: 'Metallic' },
          { name: 'Graphite Grey', hex: '#444444', finish: 'Metallic' }
        ],
        gallery: [
          {
            id: `img-${Date.now()}`,
            category: 'Hero',
            url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
            caption: `${brandObj.name} ${newVehicleName} manufacturer portrait`,
            isPrimary: true,
            verifiedSource: 'Administrator Management Portal'
          }
        ],
        pros: ['Engineered to rigorous global benchmarks'],
        cons: ['Recently launched with pending long-term owner reviews'],
        expertVerdict: 'A noteworthy addition to the verified AutoVerse Global repository.',
        verifiedDataSource: {
          sourceName: 'Official Manufacturer OEM Release',
          retrievedDate: new Date().toISOString().split('T')[0],
          officialCatalogUrl: brandObj.website,
          verificationLevel: 'Official OEM Specification',
          verifierNotes: 'Manually verified by editorial staff.'
        }
      };

      await api.createVehicle(createdVehicle);
      setIsAddModalOpen(false);
      setNewVehicleName('');
      onRefreshData();
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Error creating vehicle');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#10131b] border border-zinc-850 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Staff Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Database & Homologation Control
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Audit logging, CSV batch ingestion, and vehicle specification verification tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Vehicle Model</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Platform Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('vehicles')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'vehicles'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Manage Vehicles ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'import'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV Batch Ingestion</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-rose-600 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Audit History</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-[#11141c] border border-zinc-850 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-sans block">Total Models</span>
              <span className="text-2xl font-bold text-white font-mono tabular-nums">
                {metrics?.totalVehicles ?? vehicles.length}
              </span>
            </div>

            <div className="p-5 bg-[#11141c] border border-zinc-850 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-sans block">Verified Brands</span>
              <span className="text-2xl font-bold text-white font-mono tabular-nums">
                {metrics?.totalBrands ?? brands.length}
              </span>
            </div>

            <div className="p-5 bg-[#11141c] border border-zinc-850 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-sans block">Electric Share</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                {metrics?.electricVehiclesCount ?? vehicles.filter(v => v.powertrainType === 'Battery Electric').length} BEVs
              </span>
            </div>

            <div className="p-5 bg-[#11141c] border border-zinc-850 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-sans block">Data Sources</span>
              <span className="text-2xl font-bold text-rose-400 font-mono tabular-nums">
                {metrics?.totalDataSources ?? 5} Agencies
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-zinc-800 rounded-2xl bg-[#11141c]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-semibold bg-zinc-900/50">
                  <th className="p-3.5">Make & Model</th>
                  <th className="p-3.5">Body Style</th>
                  <th className="p-3.5">Powertrain</th>
                  <th className="p-3.5">Power</th>
                  <th className="p-3.5">Base Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-zinc-850/40 transition-colors">
                    <td className="p-3.5 font-bold text-white font-sans">
                      {v.brandName} {v.name}
                    </td>
                    <td className="p-3.5 text-zinc-300 font-sans">{v.bodyStyle}</td>
                    <td className="p-3.5 text-zinc-300 font-sans">{v.powertrainType}</td>
                    <td className="p-3.5 text-zinc-300 tabular-nums">{v.specs.maxPowerHp} hp</td>
                    <td className="p-3.5 text-zinc-200 tabular-nums">{v.basePrice.formatted}</td>
                    <td className="p-3.5 text-emerald-400 font-sans">{v.availabilityStatus}</td>
                    <td className="p-3.5 text-right font-sans">
                      <button
                        onClick={() => handleDeleteVehicle(v.id, v.name)}
                        className="p-1.5 text-zinc-400 hover:text-rose-400 transition-colors"
                        title="Archive Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'import' && (
        <div className="space-y-6 max-w-2xl">
          <div className="p-6 bg-[#11141c] border border-zinc-800 rounded-2xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Batch CSV Vehicle Ingestion</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Paste comma-separated vehicle specifications with headers: brand, model, bodystyle, powertrain, price, powerhp
              </p>
            </div>

            <textarea
              rows={8}
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            />

            {importResult && (
              <div
                className={`p-4 rounded-xl border text-xs ${
                  importResult.importedCount > 0
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                }`}
              >
                <div className="font-bold">
                  Successfully imported {importResult.importedCount} records.
                </div>
                {importResult.errors.length > 0 && (
                  <ul className="mt-2 list-disc list-inside space-y-1 text-rose-300">
                    {importResult.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button
              onClick={handleImportCsv}
              disabled={importing}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {importing ? <span>Processing Import...</span> : <span>Execute Ingestion Job</span>}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="divide-y divide-zinc-800/60 border border-zinc-800 rounded-2xl bg-[#11141c] overflow-hidden text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{log.action}</span>
                    <span className="text-zinc-400 font-mono">&middot; {log.targetEntity}</span>
                  </div>
                  <p className="text-zinc-400 mt-0.5">{log.details}</p>
                </div>
                <div className="text-right text-[11px] font-mono text-zinc-500 shrink-0">
                  <div>{log.adminUser}</div>
                  <div>{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#10131a] border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Create New Vehicle Record</h3>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 block mb-1">Manufacturer Brand</label>
                <select
                  value={newVehicleBrand}
                  onChange={(e) => setNewVehicleBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name} ({b.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1">Model Name</label>
                <input
                  type="text"
                  required
                  value={newVehicleName}
                  onChange={(e) => setNewVehicleName(e.target.value)}
                  placeholder="e.g. Taycan Cross Turismo"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1">Body Architecture</label>
                  <select
                    value={newVehicleBody}
                    onChange={(e) => setNewVehicleBody(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">Powertrain</label>
                  <select
                    value={newVehiclePowertrain}
                    onChange={(e) => setNewVehiclePowertrain(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="Battery Electric">Battery Electric (BEV)</option>
                    <option value="Plug-in Hybrid">Plug-in Hybrid (PHEV)</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Petrol">Petrol</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1">Base Price (USD)</label>
                  <input
                    type="number"
                    value={newVehiclePrice}
                    onChange={(e) => setNewVehiclePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">Max Power (hp)</label>
                  <input
                    type="number"
                    value={newVehiclePower}
                    onChange={(e) => setNewVehiclePower(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg disabled:opacity-50"
                >
                  {creating ? 'Saving...' : 'Create Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
