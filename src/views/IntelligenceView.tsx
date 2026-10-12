import React, { useState } from 'react';
import { Article, DataSourceRecord } from '../types/automotive.js';
import { ShieldCheck, BookOpen, ExternalLink, ChevronRight } from 'lucide-react';

interface IntelligenceViewProps {
  articles: Article[];
  dataSources: DataSourceRecord[];
  onSelectArticle: (a: Article) => void;
}

export function IntelligenceView({
  articles,
  dataSources,
  onSelectArticle
}: IntelligenceViewProps) {
  const [activeTab, setActiveTab] = useState<'articles' | 'sources'>('articles');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
            Automotive Research & Verification
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry Intelligence & Registry
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Independent journalism, regulatory harmonization studies, and homologation verification authorities.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'articles' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Intelligence Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'sources' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Homologation Sources ({dataSources.length})
          </button>
        </div>
      </div>

      {activeTab === 'articles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-[#11141c] hover:bg-[#151923] border border-zinc-850 hover:border-zinc-700 rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span className="text-rose-400 font-semibold">{art.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>{art.author}</span>
                <span className="font-mono text-[11px]">{art.publishedDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 leading-relaxed">
            AutoVerse Global adheres to the highest data integrity standards. All vehicle records,
            curb weights, battery specifications, and safety assessments are reconciled directly
            with government transport agencies, homologation bodies, and certified laboratories.
          </div>

          <div className="divide-y divide-zinc-800/80 border border-zinc-800 rounded-2xl bg-[#11141c] overflow-hidden">
            {dataSources.map((ds) => (
              <div
                key={ds.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                    <h3 className="text-sm font-bold text-white">{ds.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {ds.organization} &middot; Coverage: {ds.coverageCountries.join(', ')}
                  </p>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                    Records Synchronized: {ds.recordsCount.toLocaleString()} &middot; Status: {ds.status}
                  </div>
                </div>

                <a
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-750 hover:border-zinc-600 rounded-lg text-xs text-zinc-200 inline-flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                >
                  <span>Verification Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ArticleDetailViewProps {
  article: Article;
  onNavigate: (view: string) => void;
}

export function ArticleDetailView({ article, onNavigate }: ArticleDetailViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <button onClick={() => onNavigate('intelligence')} className="hover:text-white transition-colors">
          Intelligence
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-white truncate">{article.title}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold uppercase tracking-wider">
          <span>{article.category}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="text-zinc-400 font-normal">{article.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-400 border-y border-zinc-800 py-3 font-mono">
          <span>By {article.author}</span>
          <span aria-hidden="true">&middot;</span>
          <span>Published {article.publishedDate}</span>
        </div>
      </div>

      <div className="p-6 bg-[#11141c] border border-zinc-800 rounded-2xl text-sm font-medium text-zinc-200 italic leading-relaxed">
        {article.summary}
      </div>

      <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
        {article.content}
      </div>
    </div>
  );
}
