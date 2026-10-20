import React, { useState } from 'react';
import {
  Smartphone,
  Folder,
  FileText,
  Camera,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HardDrive,
  RefreshCw,
  Image as ImageIcon,
  MessageCircle,
  Download,
  AlertTriangle,
  Scan,
  ShieldCheck
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';

export const PhoneStorageSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storage' | 'scanner' | 'cleaner' | 'backup'>('storage');

  // Scanner states
  const [scannerStep, setScannerStep] = useState<'idle' | 'captured' | 'processed'>('idle');
  const [scannedDocName, setScannedDocName] = useState('Cuaderno_Ciencias_Pag12.pdf');

  // Cleaner states
  const [cleaned, setCleaned] = useState(false);
  const [junkSizeMB, setJunkSizeMB] = useState(1840); // 1.84 GB junk

  // Backup state
  const [backedUpFiles, setBackedUpFiles] = useState<string[]>([]);
  const [selectedToBackup, setSelectedToBackup] = useState<string | null>(null);

  const phoneFiles = [
    { id: 'f-down', name: 'Descargas (Download)', count: '14 archivos', type: 'folder', icon: Download },
    { id: 'f-wa', name: 'WhatsApp Media', count: '450 archivos (Audios/Fotos)', type: 'folder', icon: MessageCircle },
    { id: 'f-dcim', name: 'Cámara (DCIM)', count: '128 fotos', type: 'folder', icon: Camera },
    { id: 'f-docs', name: 'Documentos', count: '8 PDFs escolares', type: 'folder', icon: FileText },
  ];

  const handleRunScanner = () => {
    setScannerStep('captured');
    setTimeout(() => {
      setScannerStep('processed');
      triggerConfetti();
    }, 1200);
  };

  const handleCleanJunk = () => {
    setCleaned(true);
    setJunkSizeMB(0);
    triggerConfetti();
  };

  const handleBackupToCloud = (fileName: string) => {
    if (!backedUpFiles.includes(fileName)) {
      setBackedUpFiles([...backedUpFiles, fileName]);
      setSelectedToBackup(null);
      triggerConfetti();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-slate-800">
      {/* Simulator Frame Header */}
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Simulador del Celular: Mis Archivos & Oficina Móvil
              </h3>
              <p className="text-[11px] text-slate-400">
                Aprende a dominar el almacenamiento interno, WhatsApp y el escáner de cámara
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-semibold">
            Taller Móvil
          </span>
        </div>

        {/* Tab switches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('storage')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'storage'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Memoria Interna</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'scanner'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Escáner a PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('cleaner')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'cleaner'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpieza WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'backup'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Subir a Nube</span>
          </button>
        </div>
      </div>

      {/* Main interactive area */}
      <div className="p-4 sm:p-5 bg-slate-50/60 min-h-[420px]">
        {/* TAB 1: INTERNAL PHONE STORAGE */}
        {activeTab === 'storage' && (
          <div className="space-y-4">
            {/* Phone Storage Status */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700">Almacenamiento Interno (Teléfono 64 GB)</span>
                <span className="font-mono text-slate-500">54.2 GB usados (85%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                <div style={{ width: '45%' }} className="bg-amber-500" title="Imágenes y Videos" />
                <div style={{ width: '25%' }} className="bg-rose-500" title="Apps del Sistema" />
                <div style={{ width: '15%' }} className="bg-blue-500" title="Descargas y Documentos" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> WhatsApp & Fotos</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Sistema</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Documentos</span>
              </div>
            </div>

            {/* Folder grid */}
            <div>
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                Carpetas Principales del Dispositivo
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {phoneFiles.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.id}
                      className="bg-white p-3 rounded-xl border border-slate-200 hover:border-amber-400 transition flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-slate-800">{f.name}</p>
                          <p className="text-[11px] text-slate-500">{f.count}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                        Interno
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pedagogical Lesson */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">¿Por qué es vital saber dónde están estas carpetas?</p>
                <p className="mt-0.5 leading-relaxed">
                  Cuando descargas una guía escolar desde WhatsApp o el navegador móvil, queda oculta en la memoria interna. Si aprendes a encontrarla y renombrarla, jamás le dirás al docente: <em>"Profe, no sé dónde se me guardó el archivo"</em>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOBILE SCANNER TO PDF */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700 mb-2">
                <Camera className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Simulador de Escáner Escolar (Google Drive / CamScanner)
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Aprende a transformar la foto de tu cuaderno en un PDF blanco y negro nítido, sin sombras ni arrugas de mesa.
              </p>

              {/* Scanner Stages */}
              {scannerStep === 'idle' && (
                <div className="mt-5 p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 max-w-xs mx-auto">
                  <div className="text-slate-400 mb-3 flex justify-center">
                    <Scan className="w-10 h-10 animate-bounce" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Hoja de cuaderno sobre la mesa</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Listo para detectar bordes</p>
                  <button
                    onClick={handleRunScanner}
                    className="mt-4 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2 mx-auto"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Tomar Foto y Escanear</span>
                  </button>
                </div>
              )}

              {scannerStep === 'captured' && (
                <div className="mt-5 p-6 border border-teal-200 rounded-2xl bg-teal-50/60 max-w-xs mx-auto">
                  <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-bold text-teal-900">Enderezando perspectiva y ajustando contraste...</p>
                  <p className="text-[11px] text-teal-700 mt-1">Eliminando sombras y aplicando filtro B/N nítido</p>
                </div>
              )}

              {scannerStep === 'processed' && (
                <div className="mt-4 p-4 border border-emerald-200 rounded-2xl bg-emerald-50/60 max-w-sm mx-auto text-left">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Documento Escaneado con Éxito!</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs font-mono text-slate-700 leading-relaxed shadow-xs">
                    <p className="font-bold text-rose-600 mb-1">[PDF GENERADO: {scannedDocName}]</p>
                    <p>• Peso reducido: 240 KB (en lugar de 8 MB de foto cruda)</p>
                    <p>• Contraste: Blanco puro con tinta negra visible</p>
                    <p>• Páginas: 1 página ajustada a tamaño carta</p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setScannerStep('idle')}
                      className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50"
                    >
                      Escanear otra hoja
                    </button>
                    <button
                      onClick={() => {
                        alert('¡El PDF escaneado ha sido guardado en tu Google Drive simulado listo para entregar!');
                        setScannerStep('idle');
                      }}
                      className="flex-1 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
                    >
                      Subir directo a Drive
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Consejo del Docente:</strong> Entregar un trabajo en PDF escaneado demuestra pulcritud, permite al profesor hacer anotaciones directas y evita que las imágenes se desorganicen.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: WHATSAPP CLEANER */}
        {activeTab === 'cleaner' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm sm:text-base text-slate-800">
                    Limpieza de Almacenamiento de WhatsApp
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                  Files de Google
                </span>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-500 font-medium">Archivos residuales acumulados en grupos:</p>
                <p className="text-3xl font-extrabold text-rose-600 mt-1">
                  {junkSizeMB > 0 ? `${(junkSizeMB / 1024).toFixed(2)} GB` : '0 MB'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cleaned
                    ? '¡Tu celular está limpio y rápido!'
                    : 'Memes reenviados muchas veces, audios viejos y videos pesados'}
                </p>

                {!cleaned ? (
                  <button
                    onClick={handleCleanJunk}
                    className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 mx-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Liberar 1.84 GB de WhatsApp ahora</span>
                  </button>
                ) : (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">¡Espacio recuperado con éxito! Ahora tu teléfono funcionará más fluido.</span>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">Videos reenviados muchas veces</span>
                  <span className="font-bold text-slate-800">{cleaned ? '0 MB' : '1.1 GB'}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">Notas de voz antiguas en grupos</span>
                  <span className="font-bold text-slate-800">{cleaned ? '0 MB' : '450 MB'}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">Stickers y animaciones GIF</span>
                  <span className="font-bold text-slate-800">{cleaned ? '0 MB' : '290 MB'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Aprende a hacerlo en tu teléfono real:</strong> Abre WhatsApp &gt; Ajustes &gt; Almacenamiento y datos &gt; Administrar almacenamiento. Allí verás los chats más pesados y podrás vaciarlos sin perder tus tareas.
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: BACKUP TO GOOGLE DRIVE */}
        {activeTab === 'backup' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-sm sm:text-base text-slate-800">
                    Sincronización: Del Celular a la Nube
                  </h4>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Seguridad 3-2-1
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2">
                Toca cualquier archivo local del celular para simular su subida automática a tu carpeta escolar en Google Drive:
              </p>

              <div className="mt-3 space-y-2">
                {[
                  { name: 'Guia_Quimica_Final.pdf', size: '1.2 MB', origin: 'Descargas' },
                  { name: 'Exposicion_Historia.pptx', size: '3.4 MB', origin: 'Documentos' },
                  { name: 'Foto_Experimento_Laboratorio.jpg', size: '2.1 MB', origin: 'Cámara DCIM' },
                ].map((file) => {
                  const isBackedUp = backedUpFiles.includes(file.name);
                  return (
                    <div
                      key={file.name}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-slate-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-800 truncate">{file.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {file.size} • Origen: {file.origin}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBackupToCloud(file.name)}
                        disabled={isBackedUp}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                          isBackedUp
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                        }`}
                      >
                        {isBackedUp ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>A salvo en Drive</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Subir a Nube</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Ventaja de tener copia en la nube:</p>
                <p className="mt-0.5">
                  Si tu celular se queda sin batería en el colegio, puedes pedir prestado el teléfono a un compañero, abrir el navegador en modo incógnito, entrar a tu Google Drive y descargar tu tarea para presentarla a tiempo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
