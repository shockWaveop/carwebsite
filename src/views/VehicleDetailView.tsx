import React, { useState } from 'react';
import { Vehicle, VehicleVariant, Review } from '../types/automotive.js';
import { ImageFallback } from '../components/vehicles/ImageFallback.js';
import { SpecificationTable } from '../components/vehicles/SpecificationTable.js';
import { useComparison } from '../../src/context/ComparisonContext.js';
import { useFavorites } from '../../src/context/FavoritesContext.js';
import { useAuth } from '../../src/context/AuthContext.js';
import { api } from '../lib/api.js';
import {
  Heart,
  Scale,
  Zap,
  ShieldCheck,
  Check,
  Share2,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Star,
  Maximize2
} from 'lucide-react';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (v: Vehicle) => void;
  allVehicles: Vehicle[];
}

export function VehicleDetailView({
  vehicle,
  onNavigate,
  onSelectVehicle,
  allVehicles
}: VehicleDetailViewProps) {
  const { isInComparison, addVehicle, removeVehicle } = useComparison();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'specifications' | 'gallery' | 'colours' | 'reviews'
  >('overview');
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    vehicle.variants[0]?.id || ''
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedMarketCode, setSelectedMarketCode] = useState<string>(
    vehicle.internationalPricing[0]?.marketCode || 'US'
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [hasLoadedReviews, setHasLoadedReviews] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newReviewTitle, setNewReviewTitle] = useState<string>('');
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  // Active Variant
  const activeVariant =
    vehicle.variants.find((v) => v.id === selectedVariantId) || vehicle.variants[0];

  const inCompare = isInComparison(vehicle.id);
  const isFav = isFavorite(vehicle.id);

  // Selected market pricing
  const currentPricing =
    vehicle.internationalPricing.find((p) => p.marketCode === selectedMarketCode) ||
    vehicle.internationalPricing[0];

  // Competitor vehicles (same body style or price class)
  const competitors = allVehicles
    .filter((v) => v.id !== vehicle.id && v.bodyStyle === vehicle.bodyStyle)
    .slice(0, 3);

  // Load reviews on demand
  React.useEffect(() => {
    if (activeTab === 'reviews' && !hasLoadedReviews) {
      api.getReviews(vehicle.id)
        .then((res) => {
          setReviewsList(res.reviews);
          setHasLoadedReviews(true);
        })
        .catch(() => setHasLoadedReviews(true));
    }
  }, [activeTab, hasLoadedReviews, vehicle.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }
    if (!newReviewText.trim()) return;

    setSubmittingReview(true);
    try {
      const added = await api.submitReview({
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brandName} ${vehicle.name}`,
        authorName: user.name,
        rating: newRating,
        title: newReviewTitle || 'Owner Feedback',
        reviewText: newReviewText,
        ownershipPeriod: 'Verified Owner'
      });
      setReviewsList([added, ...reviewsList]);
      setShowReviewForm(false);
      setNewReviewTitle('');
      setNewReviewText('');
      setReviewSuccess('Thank you! Your verified review has been published.');
      setTimeout(() => setReviewSuccess(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Vehicle specifications link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <button onClick={() => onNavigate('browse')} className="hover:text-white transition-colors">
          Vehicles
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-zinc-500">{vehicle.brandName}</span>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-white font-medium">{vehicle.name}</span>
      </nav>

      {/* Main Showcase Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
            <ImageFallback
              src={vehicle.gallery[activeImageIndex]?.url || vehicle.gallery[0]?.url}
              alt={vehicle.gallery[activeImageIndex]?.caption || vehicle.name}
              fallbackTitle={`${vehicle.brandName} ${vehicle.name}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-[11px] text-zinc-300 font-mono">
              {vehicle.gallery[activeImageIndex]?.category || 'Exterior'} &middot;{' '}
              {vehicle.gallery[activeImageIndex]?.caption}
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {vehicle.gallery.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                  activeImageIndex === idx
                    ? 'border-rose-500 scale-105'
                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase / Specification Module */}
        <div className="lg:col-span-5 bg-[#10131b] border border-zinc-850 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1 font-mono">
              <span>{vehicle.brandName} &middot; {vehicle.modelYear}</span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                {vehicle.brandCountry}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Generation: {vehicle.generation} &middot; {vehicle.bodyStyle}
            </p>
          </div>

          {/* Multi-Market Pricing Switcher */}
          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Market Pricing</span>
              <div className="flex gap-1">
                {vehicle.internationalPricing.map((p) => (
                  <button
                    key={p.marketCode}
                    onClick={() => setSelectedMarketCode(p.marketCode)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      selectedMarketCode === p.marketCode
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.marketCode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {currentPricing ? currentPricing.formatted : vehicle.basePrice.formatted}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {currentPricing?.marketName}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {currentPricing?.localTaxNote || 'Base MSRP excluding local sales registration'}
            </p>
          </div>

          {/* Dynamic Variant Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">
              Available Trims & Variants
            </label>
            <div className="space-y-2">
              {vehicle.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors flex items-center justify-between ${
                    selectedVariantId === v.id
                      ? 'bg-zinc-850 border-rose-500/80 text-white'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {selectedVariantId === v.id && (
                        <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>{v.name}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {v.powerHp} hp &middot; {v.zeroToHundredKphSec}s (0–100) &middot; {v.driveType}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold tabular-nums text-zinc-200">
                    {v.price.formatted}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                if (inCompare) removeVehicle(vehicle.id);
                else addVehicle(vehicle.id);
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                inCompare
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-750'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{inCompare ? 'In Comparison' : 'Compare Vehicle'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isFav
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border-zinc-750'
              }`}
              title="Save to Favourites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors"
              title="Share Specifications"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8 overflow-x-auto">
          {(['overview', 'specifications', 'gallery', 'colours', 'reviews'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-rose-600 text-white'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Expert Verdict */}
          <div className="p-6 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
              Editorial Road Test Verdict
            </span>
            <p className="text-sm text-zinc-200 leading-relaxed italic">
              &ldquo;{vehicle.expertVerdict}&rdquo;
            </p>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#11141c] border border-zinc-800/80 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Engineering Highlights & Pros
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {vehicle.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&check;</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-[#11141c] border border-zinc-800/80 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Considerations & Trade-offs
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {vehicle.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&times;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Homologation & Verification Source Citation */}
          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <div>
              <div className="text-white font-semibold flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Verified Data Source: {vehicle.verifiedDataSource.sourceName}</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {vehicle.verifiedDataSource.verifierNotes} &middot; Retrieved: {vehicle.verifiedDataSource.retrievedDate}
              </p>
            </div>
            <a
              href={vehicle.verifiedDataSource.officialCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 rounded-lg border border-zinc-750 inline-flex items-center gap-1.5 text-xs transition-colors whitespace-nowrap"
            >
              <span>Official OEM Documentation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {activeTab === 'specifications' && (
        <SpecificationTable vehicle={vehicle} activeVariant={activeVariant} />
      )}

      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vehicle.gallery.map((img) => (
            <div
              key={img.id}
              className="group bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden aspect-[16/10] relative"
            >
              <ImageFallback
                src={img.url}
                alt={img.caption}
                fallbackTitle={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-[11px] text-zinc-300">
                <span className="font-semibold text-white block">{img.category}</span>
                <span className="text-zinc-400 line-clamp-1">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'colours' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#11141c] border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-2">
              Official Exterior Color Palette
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Factory paint finishes available on {vehicle.brandName} {vehicle.name}.
            </p>

            <div className="flex flex-wrap gap-4">
              {vehicle.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                    selectedColorIndex === idx
                      ? 'bg-zinc-850 border-rose-500'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border border-zinc-700 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">{c.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{c.finish}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-base font-bold text-white">Owner & Community Reviews</h3>
              <p className="text-xs text-zinc-400">Verified ownership feedback from drivers worldwide</p>
            </div>
            <button
              onClick={() => {
                if (!user) openAuthModal();
                else setShowReviewForm(!showReviewForm);
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          {reviewSuccess && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
              {reviewSuccess}
            </div>
          )}

          {/* Submit Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Submit Verified Feedback for {vehicle.name}
              </h4>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 text-amber-400"
                  >
                    <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable acceleration, refined interior"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Detailed Driving Experience</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Describe ride comfort, efficiency, infotainment, and daily driving behavior..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg disabled:opacity-50"
                >
                  {submittingReview ? 'Publishing...' : 'Publish Review'}
                </button>
              </div>
            </form>
          )}

          {/* Reviews list */}
          <div className="space-y-4">
            {reviewsList.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No community reviews submitted yet. Be the first to share your experience!</p>
            ) : (
              reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 bg-[#11141c] border border-zinc-800/80 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{rev.authorName}</span>
                      {rev.verifiedOwner && (
                        <span className="text-[10px] text-emerald-400 font-mono">
                          Verified Owner ({rev.ownershipPeriod})
                        </span>
                      )}
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200">{rev.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{rev.reviewText}</p>
                  <span className="text-[10px] text-zinc-600 font-mono block">{rev.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Similar / Competitor Vehicles */}
      {competitors.length > 0 && (
        <section className="pt-8 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
            Segment Competitors & Alternatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onSelectVehicle(comp)}
                className="bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700 rounded-2xl p-4 cursor-pointer transition-all"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 mb-3">
                  <ImageFallback
                    src={comp.gallery[0]?.url}
                    alt={comp.name}
                    fallbackTitle={`${comp.brandName} ${comp.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {comp.brandName} &middot; {comp.bodyStyle}
                </div>
                <h4 className="text-xs font-bold text-white mt-0.5 line-clamp-1">{comp.name}</h4>
                <div className="text-xs font-mono font-semibold text-rose-400 mt-2">
                  {comp.basePrice.formatted}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
