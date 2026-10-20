import React from 'react';
import {
  BookOpen,
  HardDrive,
  Sparkles,
  Smartphone,
  Layers
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedMissionsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  completedMissionsCount,
}) => {
  const tabs = [
    { id: 'modules', label: 'Módulos', icon: BookOpen },
    { id: 'cloud', label: 'Nube Drive', icon: HardDrive },
    {
      id: 'missions',
      label: 'Misiones',
      icon: Sparkles,
      badge: `${completedMissionsCount}/5`,
    },
    { id: 'phone', label: 'Celular', icon: Smartphone },
    { id: 'tools', label: 'Apps TIC', icon: Layers },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shadow-lg">
      <div className="grid grid-cols-5 h-15">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 transition-all ${
                isActive ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-slate-950 font-black text-[9px] px-1 rounded-full border border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
