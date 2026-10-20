/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  HardDrive,
  Sparkles,
  BookOpen,
  Layers,
  FileSpreadsheet,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Scan,
  MessageCircle
} from 'lucide-react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { CloudDriveSimulator } from './components/simulators/CloudDriveSimulator';
import { CloudMissions, MissionState } from './components/simulators/CloudMissions';
import { PhoneStorageSimulator } from './components/simulators/PhoneStorageSimulator';
import { SpreadsheetSandbox } from './components/simulators/SpreadsheetSandbox';
import { PhishingTrainer } from './components/simulators/PhishingTrainer';
import { ModulesReader } from './components/modules/ModulesReader';
import { ToolsDirectory } from './components/tools/ToolsDirectory';
import { MODULES_DATA } from './data/modulesData';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('cloud');

  // Guided missions state
  const [missions, setMissions] = useState<MissionState>(() => {
    const saved = localStorage.getItem('tic_missions_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { m1: false, m2: false, m3: false, m4: false, m5: false };
      }
    }
    return { m1: false, m2: false, m3: false, m4: false, m5: false };
  });

  const [activeMissionId, setActiveMissionId] = useState<string>('m1');
  const [lastCompletedNotification, setLastCompletedNotification] = useState<string | null>(null);

  // Completed modules
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('tic_completed_modules_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const completedMissionsCount = Object.values(missions).filter(Boolean).length;

  const saveMissions = (next: MissionState) => {
    setMissions(next);
    localStorage.setItem('tic_missions_v2', JSON.stringify(next));
  };

  const toggleCompleteModule = (modId: string) => {
    let next: string[];
    if (completedModules.includes(modId)) {
      next = completedModules.filter((id) => id !== modId);
    } else {
      next = [...completedModules, modId];
      triggerConfetti();
    }
    setCompletedModules(next);
    localStorage.setItem('tic_completed_modules_v2', JSON.stringify(next));
  };

  // Automated mission verification from actions in CloudDriveSimulator
  const handleSimulatorAction = (actionType: string, payload: any) => {
    const nextMissions = { ...missions };
    let missionUnlockedName: string | null = null;

    if (actionType === 'CREATE_FOLDER') {
      if (!payload.parentId && !nextMissions.m1) {
        nextMissions.m1 = true;
        missionUnlockedName = 'Misión 1: Crea tu primera Carpeta Escolar';
      } else if (payload.parentId && !nextMissions.m2) {
        nextMissions.m2 = true;
        missionUnlockedName = 'Misión 2: Jerarquía con Subcarpetas';
      }
    } else if (actionType === 'CREATE_FILE') {
      if (!nextMissions.m3) {
        nextMissions.m3 = true;
        missionUnlockedName = 'Misión 3: Crea y Nombra un Archivo Digital';
      }
    } else if (actionType === 'SHARE_ITEM') {
      if (payload.accessLevel === 'reader' && !nextMissions.m4) {
        nextMissions.m4 = true;
        missionUnlockedName = 'Misión 4: Seguridad y Permiso de Lector';
      }
    } else if (actionType === 'TRASH_ITEM') {
      if (!nextMissions.m5) {
        nextMissions.m5 = true;
        missionUnlockedName = 'Misión 5: Limpieza y Papelera de Reciclaje';
      }
    }

    if (missionUnlockedName) {
      saveMissions(nextMissions);
      setLastCompletedNotification(missionUnlockedName);
      triggerConfetti();
      setTimeout(() => {
        setLastCompletedNotification(null);
      }, 5000);
    }
  };

  const getMissionHint = () => {
    if (!missions.m1) return 'Presiona "+ Nuevo" para crear tu primera carpeta escolar en Mi Unidad.';
    if (!missions.m2) return 'Abre una carpeta y crea una subcarpeta llamada "Tareas" dentro de ella.';
    if (!missions.m3) return 'Crea un archivo nuevo (PDF o Word) con un nombre descriptivo.';
    if (!missions.m4) return 'Abre los 3 puntos de un archivo > Compartir > elige permiso Lector y copia el link.';
    if (!missions.m5) return 'Mueve el archivo temporal a la Papelera para liberar espacio.';
    return '¡Todas las misiones de nube han sido completadas con éxito! ¡Felicitaciones!';
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans pb-20 md:pb-10">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedMissionsCount={completedMissionsCount}
      />

      {/* Floating Success Notification Banner */}
      {lastCompletedNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-teal-400 flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300 max-w-md w-[92%]">
          <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase font-bold text-teal-400 tracking-wider">¡Reto Cumplido!</p>
            <p className="text-xs font-bold text-white truncate">{lastCompletedNotification}</p>
          </div>
        </div>
      )}

      {/* Mobile-First Quick Sub-Hero Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <Smartphone className="w-4 h-4" />
              </span>
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">Diseñado para Celulares:</strong> Aprende informática, gestión en la nube y ofimática sin necesidad de sala de computadores.
              </p>
            </div>

            {/* Quick Switcher for interactive simulators */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              <button
                onClick={() => setActiveTab('cloud')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                  activeTab === 'cloud'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5 text-teal-300" />
                <span>Simulador Nube</span>
              </button>

              <button
                onClick={() => setActiveTab('phone')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                  activeTab === 'phone'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Scan className="w-3.5 h-3.5 text-amber-300" />
                <span>Oficina Celular & Escáner</span>
              </button>

              <button
                onClick={() => setActiveTab('spreadsheet')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                  activeTab === 'spreadsheet'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                <span>Fórmulas Sheets</span>
              </button>

              <button
                onClick={() => setActiveTab('phishing')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                  activeTab === 'phishing'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
                <span>Anti-Phishing</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <main className="max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex-1 w-full">
        {/* TAB 1: MODULES READER */}
        {activeTab === 'modules' && (
          <ModulesReader
            completedModules={completedModules}
            onToggleCompleteModule={toggleCompleteModule}
            onOpenSimulatorForTopic={() => setActiveTab('cloud')}
          />
        )}

        {/* TAB 2: CLOUD DRIVE SIMULATOR */}
        {activeTab === 'cloud' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-teal-600" />
                  <span>Simulador de Carpetas y Gestión en la Nube</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Practica crear carpetas, mover archivos, renombrar y configurar permisos de entrega (Lector / Editor).
                </p>
              </div>

              <button
                onClick={() => setActiveTab('missions')}
                className="self-start sm:self-center px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver Misiones Guiadas ({completedMissionsCount}/5)</span>
              </button>
            </div>

            <CloudDriveSimulator
              activeMissionHint={getMissionHint()}
              onActionTriggered={handleSimulatorAction}
            />
          </div>
        )}

        {/* TAB 3: GUIDED MISSIONS */}
        {activeTab === 'missions' && (
          <CloudMissions
            missions={missions}
            activeMissionId={activeMissionId}
            onSelectMission={(id) => setActiveMissionId(id)}
            onJumpToSimulator={() => setActiveTab('cloud')}
          />
        )}

        {/* TAB 4: PHONE STORAGE & SCANNER */}
        {activeTab === 'phone' && (
          <div className="space-y-4">
            <PhoneStorageSimulator />
          </div>
        )}

        {/* TAB 5: SPREADSHEET FORMULAS SANDBOX */}
        {activeTab === 'spreadsheet' && (
          <div className="space-y-4">
            <SpreadsheetSandbox />
          </div>
        )}

        {/* TAB 6: ANTI-PHISHING TRAINER */}
        {activeTab === 'phishing' && (
          <div className="space-y-4">
            <PhishingTrainer />
          </div>
        )}

        {/* TAB 7: TOOLS DIRECTORY */}
        {activeTab === 'tools' && (
          <ToolsDirectory />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Laboratorio Interactivo de Herramientas TIC • Basado en la guía pedagógica de Juan Bermúdez
          </p>
          <div className="flex items-center gap-3 text-slate-600">
            <button onClick={() => setActiveTab('modules')} className="hover:underline">Módulos</button>
            <span>•</span>
            <button onClick={() => setActiveTab('cloud')} className="hover:underline">Simulador Nube</button>
            <span>•</span>
            <button onClick={() => setActiveTab('phone')} className="hover:underline">Oficina Celular</button>
            <span>•</span>
            <button onClick={() => setActiveTab('tools')} className="hover:underline">Apps TIC</button>
          </div>
        </div>
      </footer>

      {/* Touch-Friendly Bottom Navigation for Smartphones */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedMissionsCount={completedMissionsCount}
      />
    </div>
  );
}
