import { CloudItem } from '../types/cloudTypes';

export const INITIAL_CLOUD_ITEMS: CloudItem[] = [
  {
    id: "f-ciencias",
    name: "Ciencias Naturales",
    type: "folder",
    parentId: null,
    sizeKB: 4120,
    updatedAt: "Ayer, 3:45 PM",
    starred: true,
  },
  {
    id: "f-sociales",
    name: "Ciencias Sociales",
    type: "folder",
    parentId: null,
    sizeKB: 2850,
    updatedAt: "18 Oct 2026",
  },
  {
    id: "f-matematicas",
    name: "Matemáticas",
    type: "folder",
    parentId: null,
    sizeKB: 5400,
    updatedAt: "15 Oct 2026",
  },
  {
    id: "doc-manual-tic",
    name: "Manual_Herramientas_TIC.pdf",
    type: "pdf",
    parentId: null,
    sizeKB: 1820,
    updatedAt: "Hoy, 10:15 AM",
    starred: true,
    content: "MANUAL PEDAGÓGICO DE HERRAMIENTAS TIC\n\nBienvenido al laboratorio digital. Este documento reúne los estándares esenciales para el uso productivo del celular, la ofimática moderna y la computación en la nube.\n\nContenido:\n1. Organización jerárquica de carpetas.\n2. Digitalización de cuadernos a formato PDF.\n3. Trabajo colaborativo y permisos de seguridad (Lector / Comentador / Editor).\n4. Respaldo de información bajo la regla 3-2-1."
  },
  {
    id: "doc-notas-repaso",
    name: "Apuntes_Taller_01.docx",
    type: "docx",
    parentId: null,
    sizeKB: 450,
    updatedAt: "Ayer, 5:20 PM",
    content: "APUNTES DE LA SESIÓN 1: FUNDAMENTOS DEL ENTORNO DIGITAL\n\n• Hardware: Todo componente físico tangible (pantalla táctil, procesador, batería, puertos).\n• Software: Instrucciones lógicas y aplicaciones (Android, iOS, Chrome, WhatsApp).\n• Importancia del PDF: Formato universal que asegura que el profesor vea tu documento exactamente con las fuentes y márgenes que diseñaste."
  },
  {
    id: "doc-presupuesto",
    name: "Control_Gastos_Escolares.xlsx",
    type: "xlsx",
    parentId: "f-matematicas",
    sizeKB: 320,
    updatedAt: "12 Oct 2026",
    content: "TABLA DE GASTOS Y FÓRMULAS\n\nArtículos | Costo ($)\nCuadernos: $12.000\nBolígrafos: $4.500\nResma Papel: $18.000\nTotal =SUMA(B2:B4) -> $34.500\nPromedio =PROMEDIO(B2:B4) -> $11.500"
  },
  {
    id: "doc-infografia",
    name: "Infografia_Celular_Oficina.png",
    type: "image",
    parentId: "f-ciencias",
    sizeKB: 1980,
    updatedAt: "14 Oct 2026",
    content: "[IMAGEN DE ESQUEMA GRÁFICO: Diagrama del celular conectado a la nube mediante Wi-Fi, mostrando sincronización en tiempo real hacia Google Drive y OneDrive]."
  },
  {
    id: "doc-borrador-temporal",
    name: "Borrador_Basura_Temporal.txt",
    type: "docx",
    parentId: null,
    sizeKB: 75,
    updatedAt: "5 Oct 2026",
    content: "Archivo temporal duplicado. Ocupa espacio innecesario y debe enviarse a la papelera."
  }
];
