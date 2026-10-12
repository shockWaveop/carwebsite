import React, { useState } from 'react';
import { Mail, Shield, FileText, CheckCircle2 } from 'lucide-react';

export function PrivacyPolicyView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">Last Updated: March 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Data Collection & Phone Authentication</h2>
        <p>
          AutoVerse Global respects individual privacy. When authenticating via international phone number,
          we process your number solely for dispatching time-limited one-time password (OTP) verification tokens.
          We do not sell, barter, or distribute user telephone numbers to third-party marketing brokers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Vehicle Research History & Analytics</h2>
        <p>
          Search queries, filtered vehicle parameters, and saved favorites are tied to your authenticated session
          to provide cross-device synchronization. You maintain full sovereignty over your data and may clear
          your search history or permanently delete your account at any time within Account Settings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. Cookies & Session Storage</h2>
        <p>
          Our application utilizes local browser storage and authenticated Bearer tokens solely for maintaining
          login states, temporary comparison baskets, and interface theme preferences.
        </p>
      </section>
    </div>
  );
}

export function TermsOfServiceView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">Effective: March 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Homologation Data Integrity</h2>
        <p>
          Technical specifications, acceleration metrics, battery capacities, and prices are sourced
          from official manufacturer releases and regulatory type-approval records. While AutoVerse Global
          exercises rigorous editorial verification, manufacturer specifications and market prices
          are subject to localized changes and regional taxation variations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Intellectual Property & Brand Marks</h2>
        <p>
          Automaker trademarks, model nomenclature, and official press photography are the property
          of their respective owners and used under editorial fair use and news reporting doctrines.
        </p>
      </section>
    </div>
  );
}

export function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Data Correction');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Contact Editorial Board</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Submit homologation corrections, manufacturer press kits, or platform feedback.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Inquiry Dispatched</h3>
          <p className="text-xs text-zinc-300">
            Thank you for contacting AutoVerse Global. Our editorial team will review your inquiry within 24 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-[#11141c] border border-zinc-800 rounded-2xl space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 block mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-zinc-300 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-zinc-300 block mb-1">Topic</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Data Correction">Technical Specification Correction</option>
              <option value="Manufacturer Press">Manufacturer Press Ingestion</option>
              <option value="General">General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-300 block mb-1">Detailed Message</label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl transition-colors"
          >
            Dispatch Message to Editors
          </button>
        </form>
      )}
    </div>
  );
}

export function NotFoundView({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="text-6xl font-extrabold text-rose-500 font-mono">404</div>
      <h2 className="text-2xl font-bold text-white">Vehicle Record Not Found</h2>
      <p className="text-xs text-zinc-400">
        The requested model specification or directory route may have been moved or archived.
      </p>
      <button
        onClick={() => onNavigate('home')}
        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors"
      >
        Return to Home Overview
      </button>
    </div>
  );
}
