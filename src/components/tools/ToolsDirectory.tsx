import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  Smartphone,
  CheckCircle,
  Sparkles,
  Filter,
  Layers,
  Cloud,
  FileText,
  Scan,
  Bot,
  Palette,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { ICT_TOOLS, ICTTool } from '../../data/modulesData';

export const ToolsDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileOnlyFilter, setMobileOnlyFilter] = useState(false);

  const categories = [
    { id: 'all', label: 'Todas las herramientas', icon: Layers },
    { id: 'nube', label: 'Almacenamiento en Nube', icon: Cloud },
    { id: 'ofimatica', label: 'Ofimática Móvil', icon: FileText },
    { id: 'escaneo', label: 'Escaneo a PDF', icon: Scan },
    { id: 'ia', label: 'Inteligencia Artificial', icon: Bot },
    { id: 'visual', label: 'Diseño & Presentaciones', icon: Palette },
    { id: 'seguridad', label: 'Seguridad & Celular', icon: ShieldCheck },
  ];

  const filteredTools = useMemo(() => {
    return ICT_TOOLS.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (mobileOnlyFilter && !tool.isMobileOptimized) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.useCase.toLowerCase().includes(q) ||
          tool.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, mobileOnlyFilter]);

  return (
    <div className="space-y-4">
      {/* Directory Header */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Directorio Curado de Herramientas Digitales TIC
              </h3>
              <span className="text-[10px] bg-teal-400 text-teal-950 font-bold px-2 py-0.5 rounded-full">
                Uso Escolar
              </span>
            </div>
            <p className="text-xs text-teal-100/90 mt-1 max-w-xl">
              Recursos seleccionados especialmente para estudiantes que trabajan desde teléfonos celulares, sin necesidad de salas de cómputo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOnlyFilter(!mobileOnlyFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                mobileOnlyFilter
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-xs'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Solo 100% Celular</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-teal-200 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, tarea, PDF, fórmulas o IA..."
            className="w-full bg-teal-950/60 text-white placeholder-teal-200/60 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-teal-700/80 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
      </div>

      {/* Category Horizontal Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => {
          const Icon = c.icon;
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-teal-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">
                    {tool.name}
                  </h4>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    {tool.categoryLabel}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {tool.pricing}
                  </span>
                  {tool.isMobileOptimized && (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Smartphone className="w-2.5 h-2.5" />
                      Móvil
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {tool.description}
              </p>

              {/* School Use Case */}
              <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">Aplicación en tu clase:</span>
                <span>{tool.useCase}</span>
              </div>
            </div>

            {/* Official Link Button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Segura y Oficial
              </span>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
              >
                <span>Acceder a la app</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
