import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.js';
import { ComparisonProvider } from './context/ComparisonContext.js';
import { FavoritesProvider } from './context/FavoritesContext.js';
import { Header } from './components/layout/Header.js';
import { Footer } from './components/layout/Footer.js';
import { AuthModal } from './components/auth/AuthModal.js';
import { HomeView } from './views/HomeView.js';
import { BrowseView } from './views/BrowseView.js';
import { VehicleDetailView } from './views/VehicleDetailView.js';
import { CompareView } from './views/CompareView.js';
import { BrandsView, BrandDetailView } from './views/BrandsView.js';
import { ElectricView } from './views/ElectricView.js';
import { IntelligenceView, ArticleDetailView } from './views/IntelligenceView.js';
import { ProfileView } from './views/ProfileView.js';
import { AdminView } from './views/AdminView.js';
import {
  PrivacyPolicyView,
  TermsOfServiceView,
  ContactView,
  NotFoundView
} from './views/LegalViews.js';
import { Vehicle, Brand, Article, DataSourceRecord } from './types/automotive.js';
import { api } from './lib/api.js';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string>('');

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');

  const loadData = async () => {
    try {
      const [vRes, bRes, aRes, dsRes] = await Promise.all([
        api.getVehicles(),
        api.getBrands(),
        api.getArticles(),
        api.getDataSources()
      ]);
      setVehicles(vRes.vehicles);
      setBrands(bRes.brands);
      setArticles(aRes.articles);
      setDataSources(dsRes.sources);
    } catch (err) {
      console.error('Failed to load initial automotive data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    setViewParam(param || '');
    if (view === 'browse' && param) {
      setActiveSearchQuery('');
    }
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    handleNavigate('vehicle-detail');
  };

  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    handleNavigate('brand-detail');
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    handleNavigate('article-detail');
  };

  const handleSearch = (query: string) => {
    setActiveSearchQuery(query);
    if (query.trim()) {
      api.addHistory(query.trim()).catch(() => {});
    }
    handleNavigate('browse');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d11] flex flex-col items-center justify-center text-zinc-400 space-y-4">
        <div className="w-10 h-10 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-wider uppercase text-zinc-500">
          Loading AutoVerse Global Homologation Repository...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            vehicles={vehicles}
            brands={brands}
            articles={articles}
            onSelectVehicle={handleSelectVehicle}
            onSelectBrand={handleSelectBrand}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
            onSearch={handleSearch}
          />
        )}

        {currentView === 'browse' && (
          <BrowseView
            vehicles={vehicles}
            initialSearchQuery={activeSearchQuery}
            initialFilter={viewParam}
            onSelectVehicle={handleSelectVehicle}
            onRecordSearchHistory={(q, f) => api.addHistory(q, f)}
          />
        )}

        {currentView === 'vehicle-detail' && selectedVehicle && (
          <VehicleDetailView
            vehicle={selectedVehicle}
            allVehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'compare' && (
          <CompareView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'brands' && (
          <BrandsView brands={brands} onSelectBrand={handleSelectBrand} />
        )}

        {currentView === 'brand-detail' && selectedBrand && (
          <BrandDetailView
            brand={selectedBrand}
            allVehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'electric' && (
          <ElectricView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'intelligence' && (
          <IntelligenceView
            articles={articles}
            dataSources={dataSources}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentView === 'sources' && (
          <IntelligenceView
            articles={articles}
            dataSources={dataSources}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentView === 'article-detail' && selectedArticle && (
          <ArticleDetailView article={selectedArticle} onNavigate={handleNavigate} />
        )}

        {currentView === 'profile' && (
          <ProfileView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
            initialTab="profile"
          />
        )}

        {currentView === 'favorites' && (
          <ProfileView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
            initialTab="favorites"
          />
        )}

        {currentView === 'history' && (
          <ProfileView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
            initialTab="history"
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            vehicles={vehicles}
            brands={brands}
            onRefreshData={loadData}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'privacy' && <PrivacyPolicyView />}
        {currentView === 'terms' && <TermsOfServiceView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'not-found' && <NotFoundView onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ComparisonProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </ComparisonProvider>
    </AuthProvider>
  );
}
