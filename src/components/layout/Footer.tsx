import React from 'react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#08090c] border-t border-zinc-800/80 text-zinc-400 text-xs py-14 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm inline-block" />
              <span>AutoVerse Global</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Every Car. Every Detail. One World. An authoritative global automotive intelligence
              platform indexing verified technical specifications, homologation certifications,
              multi-market pricing, and comparative engineering data.
            </p>
            <div className="text-[11px] text-zinc-500 pt-1">
              Verified by Euro NCAP, KBA Germany, ARAI India & NHTSA registries.
            </div>
          </div>

          {/* Catalog Col */}
          <div className="space-y-2.5">
            <h4 className="text-zinc-200 font-semibold text-xs tracking-wider uppercase">Catalog</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('browse')} className="hover:text-white transition-colors">
                  All Vehicles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('electric')} className="hover:text-white transition-colors">
                  Electric Vehicles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', 'Hybrid')} className="hover:text-white transition-colors">
                  Hybrid Powertrains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', 'SUV')} className="hover:text-white transition-colors">
                  SUVs & Crossovers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', 'Sedan')} className="hover:text-white transition-colors">
                  Sedans & Limousines
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Col */}
          <div className="space-y-2.5">
            <h4 className="text-zinc-200 font-semibold text-xs tracking-wider uppercase">Directory</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">
                  Global Automakers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">
                  Vehicle Comparison
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('intelligence')} className="hover:text-white transition-colors">
                  Industry Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sources')} className="hover:text-white transition-colors">
                  Data Verification Sources
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Col */}
          <div className="space-y-2.5">
            <h4 className="text-zinc-200 font-semibold text-xs tracking-wider uppercase">Legal & Trust</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Staff Verification Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} AutoVerse Global Systems. All specifications grounded in verified OEM and homologation registries.
          </div>
          <div className="flex items-center gap-4">
            <span>ISO 9001 Homologation Standard</span>
            <span aria-hidden="true">&middot;</span>
            <span>English (Global)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
