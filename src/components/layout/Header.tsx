import React from 'react';
import {
  HardDrive,
  Sparkles,
  Smartphone,
  BookOpen,
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedMissionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedMissionsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo and title */}
        <div
          onClick={() => setActiveTab('modules')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight">
                Herramientas TIC
              </h1>
              <span className="hidden xs:inline-block text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded-md">
                Interactivo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Simulador escolar de nube y competencias digitales para celular
            </p>
          </div>
        </div>

        {/* Desktop / Tablet Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'modules'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Módulos</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'cloud'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-teal-600" />
            <span>Simulador Nube</span>
          </button>

          <button
            onClick={() => setActiveTab('missions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'missions'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Misiones ({completedMissionsCount}/5)</span>
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'phone'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            <span>Oficina Celular</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'tools'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Apps TIC
          </button>
        </nav>

        {/* Quick action button for mobile users */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('cloud')}
            className="md:hidden px-3 py-1.5 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Simulador</span>
          </button>
        </div>
      </div>
    </header>
  );
};
