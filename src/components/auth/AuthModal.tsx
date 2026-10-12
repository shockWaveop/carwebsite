import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { X, Phone, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+1', country: 'United States / Canada', flag: 'US' },
  { code: '+44', country: 'United Kingdom', flag: 'GB' },
  { code: '+91', country: 'India', flag: 'IN' },
  { code: '+49', country: 'Germany', flag: 'DE' },
  { code: '+81', country: 'Japan', flag: 'JP' },
  { code: '+971', country: 'United Arab Emirates', flag: 'AE' },
  { code: '+61', country: 'Australia', flag: 'AU' },
  { code: '+86', country: 'China', flag: 'CN' },
  { code: '+33', country: 'France', flag: 'FR' },
  { code: '+39', country: 'Italy', flag: 'IT' },
  { code: '+46', country: 'Sweden', flag: 'SE' },
  { code: '+82', country: 'South Korea', flag: 'KR' }
];

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, requestOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);

  if (!isAuthModalOpen) return null;

  const fullPhone = `${countryCode} ${phoneNumber.trim()}`;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!phoneNumber.trim()) {
      setError('Please enter a valid telephone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(fullPhone);
      if (res.success) {
        setStep('otp');
        setSuccessMsg(res.message);
        if (res.devCode) setDevCode(res.devCode);
        setCooldown(res.cooldownSeconds);

        // Cooldown timer
        const timer = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || 'Error requesting verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setError('Please enter the 6-digit code received.');
      return;
    }

    setLoading(true);
    try {
      const ok = await verifyOtp(fullPhone, otpCode.trim(), countryCode, fullName || undefined);
      if (ok) {
        // Modal will close automatically in context
      } else {
        setError('Verification failed. Please retry.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10131a] border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm inline-block" />
            <h3 className="text-base font-bold text-white tracking-tight">AutoVerse Global Access</h3>
          </div>
          <p className="text-xs text-zinc-400">
            {step === 'phone'
              ? 'Sign in or create your personal automotive research account using secure SMS verification.'
              : `Enter the 6-digit verification code sent to ${fullPhone}.`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Development sandbox helper note */}
        <div className="mb-5 p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[11px] text-zinc-400">
          <span className="font-semibold text-zinc-300">Sandbox Test Credential:</span> Use{' '}
          <button
            type="button"
            onClick={() => {
              setCountryCode('+1');
              setPhoneNumber('555-0100');
              setFullName('Alex Vance');
            }}
            className="text-rose-400 underline font-mono"
          >
            +1 555-0100
          </button>{' '}
          (code: <code className="text-zinc-200 font-mono">123456</code>) or{' '}
          <button
            type="button"
            onClick={() => {
              setCountryCode('+1');
              setPhoneNumber('555-0199');
              setFullName('Chief Editor (Admin)');
            }}
            className="text-rose-400 underline font-mono"
          >
            +1 555-0199
          </button>{' '}
          for Staff Admin.
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Vance"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 shrink-0 font-mono"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.flag})
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 555-0100"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                  <Phone className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Dispatching Code...</span>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {devCode && (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs flex items-center justify-between">
                <span className="text-zinc-400">Development Mode OTP:</span>
                <button
                  type="button"
                  onClick={() => setOtpCode(devCode)}
                  className="font-mono text-sm font-bold text-rose-400 tracking-widest bg-zinc-800/80 px-2 py-0.5 rounded hover:bg-zinc-800"
                >
                  {devCode} (Click to Fill)
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                6-Digit Security Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-lg tracking-[0.4em] font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500"
                />
                <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span>Verifying...</span> : <span>Confirm & Sign In</span>}
            </button>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="hover:text-white transition-colors"
              >
                Change Phone Number
              </button>

              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={handleSendOtp}
                className="text-rose-400 hover:text-rose-300 disabled:text-zinc-600 disabled:no-underline underline"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
