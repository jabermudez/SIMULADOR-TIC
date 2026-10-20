import React, { useState, useMemo } from 'react';
import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileCode,
  Image as ImageIcon,
  Plus,
  Search,
  MoreVertical,
  ArrowLeft,
  Share2,
  Trash2,
  Eye,
  Edit2,
  CornerDownRight,
  Star,
  Check,
  Copy,
  FolderPlus,
  Upload,
  HardDrive,
  Grid,
  List as ListIcon,
  RefreshCw,
  ExternalLink,
  Info,
  ShieldCheck,
  Lock,
  Globe2,
  X,
  FilePlus2
} from 'lucide-react';
import { CloudItem, CloudFileType, AccessLevel } from '../../types/cloudTypes';
import { INITIAL_CLOUD_ITEMS } from '../../data/initialCloudData';
import { triggerConfetti } from '../../utils/confetti';

interface CloudDriveSimulatorProps {
  onActionTriggered?: (actionType: string, payload: any) => void;
  activeMissionHint?: string | null;
}

export const CloudDriveSimulator: React.FC<CloudDriveSimulatorProps> = ({
  onActionTriggered,
  activeMissionHint,
}) => {
  const [items, setItems] = useState<CloudItem[]>(() => {
    const saved = localStorage.getItem('tic_cloud_items_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CLOUD_ITEMS;
      }
    }
    return INITIAL_CLOUD_ITEMS;
  });

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'folders' | 'files' | 'starred' | 'trash'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isFolderCreateView, setIsFolderCreateView] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<CloudFileType>('pdf');
  const [isFileCreateView, setIsFileCreateView] = useState(false);

  // Selected item for menu or actions
  const [selectedItemForMenu, setSelectedItemForMenu] = useState<CloudItem | null>(null);
  const [previewItem, setPreviewItem] = useState<CloudItem | null>(null);
  const [shareItem, setShareItem] = useState<CloudItem | null>(null);
  const [renameItem, setRenameItem] = useState<CloudItem | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [moveItem, setMoveItem] = useState<CloudItem | null>(null);
  const [moveDestinationId, setMoveDestinationId] = useState<string | null>(null);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [copiedLinkSuccess, setCopiedLinkSuccess] = useState(false);
  const [shareAccessLevel, setShareAccessLevel] = useState<AccessLevel>('reader');
  const [shareIsPublic, setShareIsPublic] = useState(true);

  // Save to localStorage
  const saveItems = (newItems: CloudItem[]) => {
    setItems(newItems);
    localStorage.setItem('tic_cloud_items_v2', JSON.stringify(newItems));
  };

  // Reset to original data
  const handleResetData = () => {
    if (window.confirm('¿Deseas reiniciar los archivos del simulador al estado original?')) {
      saveItems(INITIAL_CLOUD_ITEMS);
      setCurrentFolderId(null);
      setSearchQuery('');
    }
  };

  // Breadcrumbs calculation
  const breadcrumbs = useMemo(() => {
    const crumbs: { id: string | null; name: string }[] = [{ id: null, name: 'Mi Unidad' }];
    if (!currentFolderId) return crumbs;

    const findPath = (id: string) => {
      const folder = items.find((i) => i.id === id);
      if (folder) {
        if (folder.parentId) {
          findPath(folder.parentId);
        }
        crumbs.push({ id: folder.id, name: folder.name });
      }
    };

    findPath(currentFolderId);
    return crumbs;
  }, [currentFolderId, items]);

  // Current folder name
  const currentFolderName = useMemo(() => {
    if (!currentFolderId) return 'Mi Unidad';
    return items.find((i) => i.id === currentFolderId)?.name || 'Carpeta';
  }, [currentFolderId, items]);

  // Total storage calculation (e.g., in MB)
  const totalStorageKB = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.sizeKB || 0), 0);
  }, [items]);

  const totalStorageMB = (totalStorageKB / 1024).toFixed(1);
  const storagePercentage = Math.min(100, Math.round((totalStorageKB / (15 * 1024 * 1024)) * 100) + 18); // Simulated realistic percentage (approx 3.2 GB of 15 GB)

  // Filter items based on current location and search
  const displayedItems = useMemo(() => {
    return items.filter((item) => {
      // Trash view
      if (activeTab === 'trash') {
        if (!item.inTrash) return false;
        if (searchQuery.trim()) {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      }

      // If in normal view, ignore items in trash
      if (item.inTrash) return false;

      // Search across whole drive if searching
      if (searchQuery.trim()) {
        const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'starred') return matchesName && item.starred;
        if (activeTab === 'folders') return matchesName && item.type === 'folder';
        if (activeTab === 'files') return matchesName && item.type !== 'folder';
        return matchesName;
      }

      // Starred tab
      if (activeTab === 'starred') {
        return !!item.starred;
      }

      // Category tabs in current directory
      if (item.parentId !== currentFolderId) return false;

      if (activeTab === 'folders') return item.type === 'folder';
      if (activeTab === 'files') return item.type !== 'folder';

      return true;
    });
  }, [items, currentFolderId, searchQuery, activeTab]);

  // Helpers to get icon
  const getFileIcon = (type: CloudFileType, className = 'w-7 h-7') => {
    switch (type) {
      case 'folder':
        return <Folder className={`${className} text-amber-500 fill-amber-500/20`} />;
      case 'pdf':
        return <FileText className={`${className} text-rose-500 fill-rose-500/10`} />;
      case 'docx':
        return <FileText className={`${className} text-blue-600 fill-blue-600/10`} />;
      case 'xlsx':
        return <FileSpreadsheet className={`${className} text-emerald-600 fill-emerald-600/10`} />;
      case 'pptx':
        return <FileCode className={`${className} text-orange-600 fill-orange-600/10`} />;
      case 'image':
        return <ImageIcon className={`${className} text-purple-600 fill-purple-600/10`} />;
      default:
        return <FileText className={`${className} text-slate-500`} />;
    }
  };

  // Helper type badge
  const getTypeBadge = (type: CloudFileType) => {
    switch (type) {
      case 'folder':
        return <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Carpeta</span>;
      case 'pdf':
        return <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">PDF</span>;
      case 'docx':
        return <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">DOCX</span>;
      case 'xlsx':
        return <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">XLSX</span>;
      case 'pptx':
        return <span className="text-[10px] uppercase font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">PPTX</span>;
      case 'image':
        return <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">IMG</span>;
    }
  };

  // ACTIONS

  // 1. Create Folder
  const handleCreateFolder = () => {
    const cleanName = newFolderName.trim() || 'Nueva Carpeta';
    const newFolder: CloudItem = {
      id: `f-${Date.now()}`,
      name: cleanName,
      type: 'folder',
      parentId: currentFolderId,
      sizeKB: 0,
      updatedAt: 'Justo ahora',
      starred: false,
    };

    saveItems([newFolder, ...items]);
    setNewFolderName('');
    setIsFolderCreateView(false);
    setIsNewItemModalOpen(false);

    if (onActionTriggered) {
      onActionTriggered('CREATE_FOLDER', { name: cleanName, parentId: currentFolderId });
    }
  };

  // 2. Create File
  const handleCreateFile = () => {
    const cleanBaseName = newFileName.trim() || 'Documento_Escolar';
    let fullName = cleanBaseName;
    const extension = `.${newFileType}`;
    if (!fullName.toLowerCase().endsWith(extension)) {
      fullName = `${fullName}${extension}`;
    }

    const defaultContentByType: Record<CloudFileType, string> = {
      folder: '',
      pdf: `DOCUMENTO ESCOLAR: ${fullName}\n\nCreado desde el laboratorio TIC interactivo.\nContiene formato estándar para entrega académica con normas APA y texto inalterable.`,
      docx: `BORRADOR DE TEXTO: ${fullName}\n\nDocumento editable para trabajo colaborativo. Recuerda utilizar Título 1 y Título 2 para organizar tus secciones.`,
      xlsx: `HOJA DE CÁLCULO: ${fullName}\n\nTabla de datos simulada con fórmulas =SUMA() y =PROMEDIO() para control numérico y estadísticas.`,
      pptx: `PRESENTACIÓN VISUAL: ${fullName}\n\nDiapositivas diseñadas bajo la Regla 6x6: Máximo 6 líneas de texto y 6 palabras por línea.`,
      image: `[IMAGEN O ESCANEO CON CELULAR]: ${fullName}\nDigitalización realizada con la cámara móvil y contraste optimizado.`,
    };

    const newFile: CloudItem = {
      id: `doc-${Date.now()}`,
      name: fullName,
      type: newFileType,
      parentId: currentFolderId,
      sizeKB: Math.floor(Math.random() * 800) + 150,
      updatedAt: 'Justo ahora',
      content: defaultContentByType[newFileType],
    };

    saveItems([newFile, ...items]);
    setNewFileName('');
    setIsFileCreateView(false);
    setIsNewItemModalOpen(false);

    if (onActionTriggered) {
      onActionTriggered('CREATE_FILE', { name: fullName, type: newFileType, parentId: currentFolderId });
    }
  };

  // 3. Delete to trash
  const handleMoveToTrash = (item: CloudItem) => {
    const updated = items.map((i) => (i.id === item.id ? { ...i, inTrash: true } : i));
    saveItems(updated);
    setSelectedItemForMenu(null);

    if (onActionTriggered) {
      onActionTriggered('TRASH_ITEM', { item });
    }
  };

  // 4. Restore from trash
  const handleRestoreFromTrash = (item: CloudItem) => {
    const updated = items.map((i) => (i.id === item.id ? { ...i, inTrash: false } : i));
    saveItems(updated);
    setSelectedItemForMenu(null);
  };

  // 5. Permanent Delete
  const handlePermanentDelete = (itemId: string) => {
    if (window.confirm('¿Eliminar definitivamente este elemento de la papelera? Esta acción no se puede deshacer.')) {
      const updated = items.filter((i) => i.id !== itemId);
      saveItems(updated);
      setSelectedItemForMenu(null);
    }
  };

  // 6. Toggle Starred
  const handleToggleStar = (item: CloudItem) => {
    const updated = items.map((i) => (i.id === item.id ? { ...i, starred: !i.starred } : i));
    saveItems(updated);
    setSelectedItemForMenu(null);
  };

  // 7. Rename
  const handleRenameSubmit = () => {
    if (!renameItem || !renameValue.trim()) return;
    const updated = items.map((i) => (i.id === renameItem.id ? { ...i, name: renameValue.trim() } : i));
    saveItems(updated);
    setRenameItem(null);
    setRenameValue('');
  };

  // 8. Move item
  const handleMoveSubmit = () => {
    if (!moveItem) return;
    const updated = items.map((i) =>
      i.id === moveItem.id ? { ...i, parentId: moveDestinationId } : i
    );
    saveItems(updated);
    const dest = moveDestinationId;
    setMoveItem(null);
    setMoveDestinationId(null);

    if (onActionTriggered) {
      onActionTriggered('MOVE_ITEM', { item: moveItem, destinationId: dest });
    }
  };

  // 9. Share action
  const handleCopyShareLink = () => {
    if (!shareItem) return;
    const fakeLink = `https://drive.google.com/file/d/sim_${shareItem.id}/view?usp=sharing`;
    navigator.clipboard?.writeText?.(fakeLink);
    setCopiedLinkSuccess(true);
    setTimeout(() => setCopiedLinkSuccess(false), 2500);

    const updated = items.map((i) =>
      i.id === shareItem.id
        ? {
            ...i,
            shared: {
              accessLevel: shareAccessLevel,
              isPublic: shareIsPublic,
              sharedWith: ['docente@institucion.edu.co'],
              shareLink: fakeLink,
            },
          }
        : i
    );
    saveItems(updated);

    if (onActionTriggered) {
      onActionTriggered('SHARE_ITEM', {
        item: shareItem,
        accessLevel: shareAccessLevel,
        isPublic: shareIsPublic,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[640px] text-slate-800">
      {/* Top Banner / Mission hint if active */}
      {activeMissionHint && (
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-teal-900">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="font-semibold">Misión en curso:</span>
            <span>{activeMissionHint}</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">
            Simulador Activo
          </span>
        </div>
      )}

      {/* Simulator App Header */}
      <div className="bg-slate-900 text-white p-3.5 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-md">
              <HardDrive className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base tracking-tight leading-tight text-white">
                  CloudDrive TIC
                </h3>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.2 rounded font-mono">
                  Móvil & PC
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Simulador de almacenamiento escolar</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowStorageModal(true)}
              className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
              title="Ver almacenamiento disponible"
            >
              <HardDrive className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden xs:inline">15 GB:</span>
              <span className="font-bold text-teal-300">{storagePercentage}%</span>
            </button>

            <button
              onClick={handleResetData}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Reiniciar simulador"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search bar inside simulator */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar carpetas, guías, tareas y PDFs..."
            className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs navigation & controls */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setActiveTab('all');
              setCurrentFolderId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mi Unidad
          </button>
          <button
            onClick={() => setActiveTab('folders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'folders'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Carpetas
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'files'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Archivos
          </button>
          <button
            onClick={() => setActiveTab('starred')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'starred'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Destacados</span>
          </button>
          <button
            onClick={() => setActiveTab('trash')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'trash'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Trash2 className="w-3 h-3" />
            <span>Papelera</span>
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 border-l border-slate-300 pl-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-teal-700' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Vista Cuadrícula"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md ${
              viewMode === 'list' ? 'bg-white shadow-xs text-teal-700' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Vista Lista"
          >
            <ListIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Breadcrumb Path Navigation */}
      {activeTab !== 'trash' && activeTab !== 'starred' && (
        <div className="bg-slate-100/80 px-3 sm:px-4 py-2 border-b border-slate-200 flex items-center gap-1.5 text-xs text-slate-600 overflow-x-auto">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.id || 'root'}>
                {idx > 0 && <span className="text-slate-400">/</span>}
                <button
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className={`px-2 py-0.5 rounded hover:bg-slate-200 font-medium whitespace-nowrap transition flex items-center gap-1 ${
                    isLast ? 'text-teal-800 font-bold bg-white shadow-xs border border-slate-200' : 'text-slate-600'
                  }`}
                >
                  {idx === 0 && <HardDrive className="w-3 h-3 text-teal-600" />}
                  {idx > 0 && <Folder className="w-3 h-3 text-amber-500 fill-amber-500/30" />}
                  <span>{crumb.name}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Main Files Area */}
      <div className="flex-1 p-3 sm:p-4 bg-slate-50/50 min-h-[360px] overflow-y-auto">
        {displayedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 mt-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 text-slate-400">
              {activeTab === 'trash' ? (
                <Trash2 className="w-8 h-8 text-slate-400" />
              ) : (
                <Folder className="w-8 h-8 text-slate-300" />
              )}
            </div>
            <h4 className="font-semibold text-slate-700 text-sm sm:text-base">
              {activeTab === 'trash' ? 'La papelera está vacía' : 'Esta carpeta está vacía'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              {activeTab === 'trash'
                ? 'Los elementos que envíes a la papelera aparecerán aquí para restaurarlos o eliminarlos.'
                : 'Usa el botón "+ Nuevo" para crear tu primera carpeta o subir un documento.'}
            </p>
            {activeTab !== 'trash' && (
              <button
                onClick={() => setIsNewItemModalOpen(true)}
                className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Crear elemento</span>
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {displayedItems.map((item) => {
              const isFolder = item.type === 'folder';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isFolder && !item.inTrash) {
                      setCurrentFolderId(item.id);
                    } else if (!isFolder && !item.inTrash) {
                      setPreviewItem(item);
                    }
                  }}
                  className={`group relative bg-white border rounded-xl p-3 flex flex-col justify-between transition-all select-none cursor-pointer ${
                    isFolder
                      ? 'border-amber-200/80 hover:border-amber-400 hover:shadow-md bg-gradient-to-b from-amber-50/20 to-white'
                      : 'border-slate-200 hover:border-teal-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="p-1.5 rounded-lg bg-slate-50 group-hover:scale-105 transition">
                      {getFileIcon(item.type)}
                    </div>

                    <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                      {item.starred && (
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                      {item.shared && (
                        <span title="Elemento compartido" className="text-teal-600">
                          <Share2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <button
                        onClick={() => setSelectedItemForMenu(item)}
                        className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition"
                        title="Opciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <h5
                      className="font-semibold text-xs sm:text-sm text-slate-800 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h5>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                      <span>{isFolder ? 'Carpeta' : `${Math.round(item.sizeKB)} KB`}</span>
                      {getTypeBadge(item.type)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {displayedItems.map((item) => {
              const isFolder = item.type === 'folder';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isFolder && !item.inTrash) {
                      setCurrentFolderId(item.id);
                    } else if (!isFolder && !item.inTrash) {
                      setPreviewItem(item);
                    }
                  }}
                  className="px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getFileIcon(item.type, 'w-6 h-6')}
                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-2">
                        <span>{item.updatedAt}</span>
                        {!isFolder && <span>• {Math.round(item.sizeKB)} KB</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {item.starred && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    {item.shared && <Share2 className="w-3.5 h-3.5 text-teal-600" />}
                    <button
                      onClick={() => setSelectedItemForMenu(item)}
                      className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) "+ Nuevo" - Highly accessible on Mobile phones */}
      <div className="sticky bottom-3 right-3 self-end px-3 py-2 pointer-events-none">
        <button
          onClick={() => {
            setIsNewItemModalOpen(true);
            setIsFolderCreateView(false);
            setIsFileCreateView(false);
          }}
          className="pointer-events-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 font-semibold text-xs sm:text-sm border-2 border-white/40"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo</span>
        </button>
      </div>

      {/* -------------------- MODALS -------------------- */}

      {/* MODAL 1: NEW ITEM MENU (FOLDER / FILE) */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
            {!isFolderCreateView && !isFileCreateView ? (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-base">Crear en {currentFolderName}</h4>
                  <button
                    onClick={() => setIsNewItemModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <button
                    onClick={() => setIsFolderCreateView(true)}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition group text-center"
                  >
                    <FolderPlus className="w-7 h-7 text-amber-600 mb-1.5 group-hover:scale-110 transition" />
                    <span className="text-xs font-bold text-amber-900">Nueva Carpeta</span>
                    <span className="text-[10px] text-amber-700/80">Para organizar guías</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewFileType('pdf');
                      setIsFileCreateView(true);
                    }}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 transition group text-center"
                  >
                    <FileText className="w-7 h-7 text-rose-600 mb-1.5 group-hover:scale-110 transition" />
                    <span className="text-xs font-bold text-rose-900">Documento PDF</span>
                    <span className="text-[10px] text-rose-700/80">Formato inalterable</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewFileType('docx');
                      setIsFileCreateView(true);
                    }}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 transition group text-center"
                  >
                    <FilePlus2 className="w-7 h-7 text-blue-600 mb-1.5 group-hover:scale-110 transition" />
                    <span className="text-xs font-bold text-blue-900">Documento Word</span>
                    <span className="text-[10px] text-blue-700/80">Texto colaborativo</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewFileType('xlsx');
                      setIsFileCreateView(true);
                    }}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition group text-center"
                  >
                    <FileSpreadsheet className="w-7 h-7 text-emerald-600 mb-1.5 group-hover:scale-110 transition" />
                    <span className="text-xs font-bold text-emerald-900">Hoja de Cálculo</span>
                    <span className="text-[10px] text-emerald-700/80">Cuentas y fórmulas</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                  <Info className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>En tu celular real, también puedes escanear usando la cámara directamente en Drive.</span>
                </div>
              </div>
            ) : isFolderCreateView ? (
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <button
                    onClick={() => setIsFolderCreateView(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-bold text-slate-800 text-sm">Nueva Carpeta</h4>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Nombre de la carpeta:
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Ej. TIC 2026, Matemáticas, Tareas..."
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateFolder();
                    }}
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Consejo pedagógico: Usa nombres claros sin caracteres extraños ni espacios dobles.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsFolderCreateView(false);
                      setIsNewItemModalOpen(false);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateFolder}
                    className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs"
                  >
                    Crear Carpeta
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <button
                    onClick={() => setIsFileCreateView(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-bold text-slate-800 text-sm">Nuevo Archivo ({newFileType.toUpperCase()})</h4>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Nombre del archivo:
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
                    <input
                      type="text"
                      autoFocus
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="Ej. Investigacion_TIC_JuanPerez"
                      className="w-full px-3 py-2.5 text-sm focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateFile();
                      }}
                    />
                    <span className="bg-slate-100 text-slate-500 font-mono text-xs px-2.5 py-2.5 font-bold border-l border-slate-300">
                      .{newFileType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Regla de oro: Incluye el nombre del tema y tu apellido para que el docente lo identifique fácil.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsFileCreateView(false);
                      setIsNewItemModalOpen(false);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateFile}
                    className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs"
                  >
                    Crear y Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: ITEM CONTEXT MENU (Touch Sheet / Dialog) */}
      {selectedItemForMenu && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 min-w-0">
                {getFileIcon(selectedItemForMenu.type, 'w-6 h-6')}
                <div className="min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                    {selectedItemForMenu.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {selectedItemForMenu.type === 'folder'
                      ? 'Carpeta de archivos'
                      : `${Math.round(selectedItemForMenu.sizeKB)} KB`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItemForMenu(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 space-y-1">
              {!selectedItemForMenu.inTrash ? (
                <>
                  {selectedItemForMenu.type !== 'folder' && (
                    <button
                      onClick={() => {
                        const it = selectedItemForMenu;
                        setSelectedItemForMenu(null);
                        setPreviewItem(it);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
                    >
                      <Eye className="w-4 h-4 text-teal-600" />
                      <span>Ver vista previa del contenido</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const it = selectedItemForMenu;
                      setSelectedItemForMenu(null);
                      setShareItem(it);
                      setShareAccessLevel(it.shared?.accessLevel || 'reader');
                      setShareIsPublic(it.shared?.isPublic ?? true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    <Share2 className="w-4 h-4 text-blue-600" />
                    <span>Compartir y gestionar permisos</span>
                  </button>

                  <button
                    onClick={() => {
                      const it = selectedItemForMenu;
                      setSelectedItemForMenu(null);
                      setMoveItem(it);
                      setMoveDestinationId(it.parentId);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    <CornerDownRight className="w-4 h-4 text-indigo-600" />
                    <span>Mover a otra carpeta...</span>
                  </button>

                  <button
                    onClick={() => {
                      const it = selectedItemForMenu;
                      setSelectedItemForMenu(null);
                      setRenameItem(it);
                      setRenameValue(it.name);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    <Edit2 className="w-4 h-4 text-slate-600" />
                    <span>Cambiar nombre</span>
                  </button>

                  <button
                    onClick={() => handleToggleStar(selectedItemForMenu)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        selectedItemForMenu.starred
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>
                      {selectedItemForMenu.starred ? 'Quitar de destacados' : 'Marcar como destacado'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleMoveToTrash(selectedItemForMenu)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Mover a la Papelera</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleRestoreFromTrash(selectedItemForMenu)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded-xl transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Restaurar a su carpeta original</span>
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(selectedItemForMenu.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar definitivamente</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PREVIEW ITEM */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-5 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 min-w-0">
                {getFileIcon(previewItem.type, 'w-6 h-6')}
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 truncate">
                    {previewItem.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Tamaño: {Math.round(previewItem.sizeKB)} KB</span>
                    <span>• {previewItem.updatedAt}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content View */}
            <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-y-auto flex-1 font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              {previewItem.content || 'Vista previa simulada del archivo sin texto cargado.'}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Libre de virus y sincronizado</span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: SHARE PERMISSIONS (SIMULATES GOOGLE DRIVE SHARE DIALOG) */}
      {shareItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-600" />
                <h4 className="font-bold text-base text-slate-800">Compartir archivo</h4>
              </div>
              <button
                onClick={() => setShareItem(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-2 font-medium truncate">
              Elemento: <span className="font-bold text-slate-800">{shareItem.name}</span>
            </p>

            {/* Access configuration */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  1. Nivel de Acceso y Permisos:
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setShareAccessLevel('reader')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      shareAccessLevel === 'reader'
                        ? 'border-teal-500 bg-teal-50/70'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="access"
                      checked={shareAccessLevel === 'reader'}
                      onChange={() => setShareAccessLevel('reader')}
                      className="mt-0.5 text-teal-600"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">Lector (Viewer)</span>
                        <span className="text-[10px] bg-teal-200/80 text-teal-900 font-bold px-1.5 py-0.2 rounded">
                          Recomendado para tareas
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        El destinatario puede leer y descargar, pero <strong>NO puede alterar ni borrar</strong> tu trabajo.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setShareAccessLevel('commenter')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      shareAccessLevel === 'commenter'
                        ? 'border-teal-500 bg-teal-50/70'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="access"
                      checked={shareAccessLevel === 'commenter'}
                      onChange={() => setShareAccessLevel('commenter')}
                      className="mt-0.5 text-teal-600"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900">Comentador (Commenter)</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Puede dejar notas y correcciones al margen sin modificar el texto original.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setShareAccessLevel('editor')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      shareAccessLevel === 'editor'
                        ? 'border-teal-500 bg-teal-50/70'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="access"
                      checked={shareAccessLevel === 'editor'}
                      onChange={() => setShareAccessLevel('editor')}
                      className="mt-0.5 text-teal-600"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">Editor</span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                          ¡Cuidado!
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Control total: Puede reescribir, borrar párrafos o compartir con terceros. Solo para compañeros de equipo de confianza.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Public vs Restricted toggle */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {shareIsPublic ? (
                    <Globe2 className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-600" />
                  )}
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {shareIsPublic ? 'Cualquier persona con el enlace' : 'Restringido (Solo autorizados)'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {shareIsPublic
                        ? 'Cualquiera que reciba el link podrá entrar'
                        : 'Solo personas añadidas por correo electrónico'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShareIsPublic(!shareIsPublic)}
                  className="text-xs text-teal-700 font-bold underline"
                >
                  Cambiar
                </button>
              </div>
            </div>

            {/* Copy Link Button */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handleCopyShareLink}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  copiedLinkSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                }`}
              >
                {copiedLinkSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Enlace copiado con permiso {shareAccessLevel.toUpperCase()}!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar enlace de entrega</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShareItem(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: RENAME ITEM */}
      {renameItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
              Cambiar nombre
            </h4>
            <div className="mt-4">
              <input
                type="text"
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameSubmit();
                }}
              />
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setRenameItem(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleRenameSubmit}
                className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: MOVE ITEM TO FOLDER */}
      {moveItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
              <CornerDownRight className="w-4 h-4 text-teal-600" />
              <span>Mover "{moveItem.name}"</span>
            </h4>

            <p className="text-xs text-slate-600 mt-3 font-medium">Selecciona la carpeta de destino:</p>

            <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50">
              <button
                onClick={() => setMoveDestinationId(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  moveDestinationId === null
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Mi Unidad (Raíz principal)</span>
              </button>

              {items
                .filter((i) => i.type === 'folder' && i.id !== moveItem.id && !i.inTrash)
                .map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setMoveDestinationId(folder.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                      moveDestinationId === folder.id
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
                    <span>{folder.name}</span>
                  </button>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setMoveItem(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleMoveSubmit}
                className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
              >
                Mover aquí
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: STORAGE BREAKDOWN */}
      {showStorageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-teal-600" />
                <h4 className="font-bold text-base text-slate-800">Almacenamiento de tu Nube</h4>
              </div>
              <button
                onClick={() => setShowStorageModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-3xl font-extrabold text-slate-900">3.4 GB</p>
              <p className="text-xs text-slate-500">de 15 GB gratuitos utilizados</p>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-3 rounded-full mt-3 overflow-hidden flex">
                <div style={{ width: '14%' }} className="bg-blue-500" title="Google Drive" />
                <div style={{ width: '6%' }} className="bg-rose-500" title="Gmail" />
                <div style={{ width: '8%' }} className="bg-amber-500" title="Google Fotos" />
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Google Drive (Tus archivos escolares)
                </span>
                <span className="font-bold text-slate-800">{totalStorageMB} MB</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Correos Gmail con archivos adjuntos
                </span>
                <span className="font-bold text-slate-800">890 MB</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Copia de Fotos y Videos
                </span>
                <span className="font-bold text-slate-800">1.2 GB</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-teal-50 border border-teal-200 text-[11px] text-teal-900">
              <p className="font-bold">Consejo de ahorro para celular:</p>
              <p className="mt-0.5">
                Los videos pesados de WhatsApp suelen saturar la cuenta. Recuerda vaciar la papelera de Drive periódicamente, ya que los archivos borrados siguen ocupando espacio durante 30 días.
              </p>
            </div>

            <button
              onClick={() => setShowStorageModal(false)}
              className="mt-4 w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
