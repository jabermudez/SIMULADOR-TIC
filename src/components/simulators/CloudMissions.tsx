import React from 'react';
import {
  CheckCircle2,
  Circle,
  Award,
  ChevronRight,
  FolderPlus,
  FilePlus2,
  Share2,
  Trash2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';

export interface MissionState {
  m1: boolean; // Create folder
  m2: boolean; // Create subfolder
  m3: boolean; // Create file
  m4: boolean; // Share with reader permission
  m5: boolean; // Trash temporary file
}

interface CloudMissionsProps {
  missions: MissionState;
  activeMissionId: string;
  onSelectMission: (id: string) => void;
  onJumpToSimulator: () => void;
}

export const CloudMissions: React.FC<CloudMissionsProps> = ({
  missions,
  activeMissionId,
  onSelectMission,
  onJumpToSimulator,
}) => {
  const missionsList = [
    {
      id: 'm1',
      number: 1,
      title: 'Crea tu primera Carpeta Escolar',
      category: 'Estructura Básica',
      points: 50,
      badge: 'Arquitecto Digital',
      icon: FolderPlus,
      description: 'Crea una nueva carpeta en la raíz (Mi Unidad) con el nombre "TIC 2026" o la materia que prefieras.',
      instructions: '1. En el simulador, presiona el botón "+ Nuevo".\n2. Elige "Nueva Carpeta".\n3. Escribe el nombre y confirma.',
      whyItMatters: 'En la nube no debes dejar archivos sueltos. Las carpetas temáticas te evitan perder tareas la noche antes de la entrega.',
      completed: missions.m1,
    },
    {
      id: 'm2',
      number: 2,
      title: 'Jerarquía: Crea una Subcarpeta',
      category: 'Organización Avanzada',
      points: 60,
      badge: 'Estructurador Pro',
      icon: Layers,
      description: 'Abre la carpeta que creaste y, estando dentro de ella, crea una subcarpeta llamada "Tareas" o "Guías".',
      instructions: '1. Haz clic o toca la carpeta para abrirla.\n2. Presiona "+ Nuevo" > "Nueva Carpeta".\n3. Nómbrala "Tareas". Nota cómo la ruta muestra la jerarquía.',
      whyItMatters: 'Una subcarpeta separa borradores de entregas definitivas, evitando enviar versiones incompletas por equivocación.',
      completed: missions.m2,
    },
    {
      id: 'm3',
      number: 3,
      title: 'Crea y Nombra un Archivo Digital',
      category: 'Gestión Documental',
      points: 70,
      badge: 'Creador de Contenido',
      icon: FilePlus2,
      description: 'Crea un archivo nuevo (PDF, Word o Hoja de Cálculo) asignándole un nombre formal y claro.',
      instructions: '1. Pulsa "+ Nuevo" > "Documento PDF" o "Documento Word".\n2. Nómbralo con el formato "Tema_Apellido" (ej: Tarea_Biologia_Perez).\n3. Pulsa "Crear y Guardar".',
      whyItMatters: 'Los nombres genéricos como "documento1.pdf" hacen que el profesor no sepa a quién calificar.',
      completed: missions.m3,
    },
    {
      id: 'm4',
      number: 4,
      title: 'Seguridad: Comparte con Permiso de Lector',
      category: 'Seguridad y Colaboración',
      points: 80,
      badge: 'Guardián de Permisos',
      icon: Share2,
      description: 'Abre las opciones de compartir de cualquier archivo, selecciona permiso "Lector" y copia el enlace de entrega.',
      instructions: '1. Toca los 3 puntos de un archivo.\n2. Elige "Compartir y gestionar permisos".\n3. Selecciona "Lector (Viewer)" y pulsa "Copiar enlace de entrega".',
      whyItMatters: 'Si dejas permiso de Editor, otra persona o compañero de grupo puede borrar accidentalmente tu trabajo.',
      completed: missions.m4,
    },
    {
      id: 'm5',
      number: 5,
      title: 'Limpieza: Elimina Archivos Basura',
      category: 'Higiene Digital',
      points: 60,
      badge: 'Nube Saludable',
      icon: Trash2,
      description: 'Identifica el archivo "Borrador_Basura_Temporal.txt" en la raíz y muévelo a la Papelera.',
      instructions: '1. Ve a "Mi Unidad".\n2. Toca los 3 puntos en "Borrador_Basura_Temporal.txt".\n3. Selecciona "Mover a la Papelera".',
      whyItMatters: 'El almacenamiento gratuito es limitado (15 GB). Eliminar duplicados y temporales asegura espacio para tus exámenes.',
      completed: missions.m5,
    },
  ];

  const totalPoints = missionsList.reduce((acc, m) => acc + (m.completed ? m.points : 0), 0);
  const maxPoints = missionsList.reduce((acc, m) => acc + m.points, 0);
  const completedCount = missionsList.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / missionsList.length) * 100);

  const activeMission = missionsList.find((m) => m.id === activeMissionId) || missionsList[0];

  return (
    <div className="space-y-4">
      {/* Header card with progress & XP */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-teal-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Taller Práctico Guiado</h3>
                <span className="text-[10px] bg-teal-400 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  5 Retos
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Cumple los objetivos en el simulador para desbloquear medallas y puntos de experiencia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/80 self-start sm:self-auto">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Puntaje Total</p>
              <p className="text-lg font-black text-teal-300">{totalPoints} <span className="text-xs text-slate-400 font-normal">/ {maxPoints} XP</span></p>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Progreso</p>
              <p className="text-lg font-black text-white">{progressPercent}%</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Missions list sidebar */}
        <div className="md:col-span-1 space-y-2">
          {missionsList.map((m) => {
            const Icon = m.icon;
            const isSelected = m.id === activeMission.id;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMission(m.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      m.completed
                        ? 'bg-emerald-100 text-emerald-700'
                        : isSelected
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {m.completed ? <CheckCircle2 className="w-4 h-4" /> : m.number}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-slate-800 truncate">
                      {m.title}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      +{m.points} XP • {m.category}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {m.completed ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      ¡Logrado!
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Mission Detail Card */}
        <div className="md:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  Misión {activeMission.number} de 5 • {activeMission.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                  {activeMission.title}
                </h4>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-lg">
                  +{activeMission.points} XP
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
              {activeMission.description}
            </p>

            {/* Step-by-step instructions */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <p className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>¿Cómo realizarlo en el simulador?</span>
              </p>
              <pre className="font-sans whitespace-pre-line text-xs text-slate-600 leading-relaxed">
                {activeMission.instructions}
              </pre>
            </div>

            {/* Pedagogical Why It Matters */}
            <div className="mt-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">¿Por qué es fundamental aprender esto? </span>
                <span>{activeMission.whyItMatters}</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Insignia al completar: <strong>{activeMission.badge}</strong></span>
            </div>

            <button
              onClick={onJumpToSimulator}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition ${
                activeMission.completed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              <span>{activeMission.completed ? 'Misión Completada (Repetir)' : 'Ir al Simulador y Cumplir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
