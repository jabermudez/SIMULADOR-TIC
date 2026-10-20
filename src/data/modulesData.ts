export interface TopicItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
  mobileTip?: string;
  practicalAction?: string;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  badge: string;
  icon: string;
  topics: TopicItem[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const MODULES_DATA: ModuleData[] = [
  {
    id: "modulo-1",
    number: 1,
    title: "Fundamentos de las TIC y del Entorno Digital",
    shortTitle: "Fundamentos TIC",
    description: "Comprende el ecosistema digital, la red global, la organización de archivos y la ciudadanía en línea.",
    color: "from-cyan-600 to-teal-700",
    badge: "Básico e Indispensable",
    icon: "Globe",
    topics: [
      {
        id: "1-1",
        number: "1.1",
        title: "¿Qué son las TIC y por qué transforman nuestro entorno?",
        summary: "Las TIC son el conjunto de tecnologías que permiten procesar, almacenar, transmitir y recuperar información.",
        content: [
          "Las Tecnologías de la Información y la Comunicación (TIC) representan la convergencia de dispositivos físicos (smartphones, tabletas, computadoras), redes de comunicación (fibra óptica, 4G, 5G, Wi-Fi) y plataformas de software.",
          "En el ámbito educativo y laboral, las TIC eliminan barreras geográficas y temporales: permiten que un estudiante en una zona rural o en un aula sin computadoras acceda a bibliotecas mundiales, colabore en tiempo real y gestione su portafolio académico desde un teléfono móvil.",
          "Los tres pilares de las TIC: Hardware (lo físico), Software (los programas y aplicaciones) y Redes (los canales de conexión que enlazan al mundo)."
        ],
        keyTakeaway: "Las herramientas digitales no reemplazan el pensamiento humano, lo potencian para resolver problemas reales.",
        mobileTip: "Tu celular actual tiene más capacidad de procesamiento que las computadoras que llevaron al ser humano a la Luna.",
        practicalAction: "Identifica qué aplicaciones en tu celular usas para consumir información y cuáles usas para crear información."
      },
      {
        id: "1-2",
        number: "1.2",
        title: "Arquitectura Básica: Ciclo de Procesamiento de Datos",
        summary: "Todo dispositivo digital opera bajo el ciclo fundamental: Entrada, Procesamiento, Almacenamiento y Salida.",
        content: [
          "1. Entrada (Input): La información que ingresas mediante pantalla táctil, micrófono, teclado virtual o cámara.",
          "2. Procesamiento (CPU): El procesador ejecuta instrucciones lógicas y matemáticas a velocidades de miles de millones de ciclos por segundo (Gigahertz).",
          "3. Almacenamiento (Storage): Guarda los datos temporalmente (RAM) o permanentemente (Memoria Flash / Nube).",
          "4. Salida (Output): La respuesta que ves en pantalla, escuchas por los altavoces o envías a través de la red."
        ],
        keyTakeaway: "Entender este ciclo te ayuda a saber por qué un celular se satura cuando muchas apps consumen procesador y memoria RAM al tiempo.",
        mobileTip: "Cerrar apps en segundo plano que no usas libera memoria RAM para que tu teléfono responda más rápido."
      },
      {
        id: "1-3",
        number: "1.3",
        title: "Tipos de Archivos y Extensiones Clave",
        summary: "La extensión (.pdf, .docx, .xlsx, .jpg) indica al sistema con qué aplicación abrir el archivo y cómo interpretar sus datos.",
        content: [
          "Documentos de Texto y Lectura: .PDF (Portable Document Format, no se desconfigura en ningún celular), .DOCX (documentos editables de Word/Docs), .TXT (texto plano sin formato).",
          "Hojas de Cálculo: .XLSX (Microsoft Excel), .CSV (valores separados por coma, universal para bases de datos).",
          "Presentaciones: .PPTX (diapositivas multimedia).",
          "Imágenes y Gráficos: .JPG / .JPEG (fotografías comprimidas), .PNG (imágenes con transparencia), .WEBP (formato web ultra ligero).",
          "Archivos Comprimidos: .ZIP / .RAR (paquetes que agrupan muchos archivos en uno solo para enviarlos por correo o mensajería)."
        ],
        keyTakeaway: "Regla de oro: Antes de enviar un trabajo final a un docente, expórtalo o guárdalo como .PDF para garantizar que no se desconfigure el tipo de letra ni los márgenes.",
        mobileTip: "Si descargas un archivo y tu celular dice 'No hay app para abrir este archivo', revisa los últimos 3 caracteres tras el punto para saber qué instalar."
      },
      {
        id: "1-4",
        number: "1.4",
        title: "Cómo Funciona Internet: Navegadores vs. Motores de Búsqueda",
        summary: "No confundas el vehículo (Navegador) con el destino o la biblioteca (Buscador).",
        content: [
          "El Navegador Web (Browser): Es la aplicación instalada en tu dispositivo (Google Chrome, Safari, Mozilla Firefox, Brave, Microsoft Edge) que interpreta el código HTML/CSS/JS y te muestra las páginas web.",
          "El Motor de Búsqueda (Search Engine): Es el sitio web o algoritmo (Google, DuckDuckGo, Bing, Perplexity) que indexa millones de páginas y te ayuda a encontrar información mediante palabras clave.",
          "Protocolo Seguro HTTPS: El candado en la barra de direcciones indica que la comunicación entre tu celular y el servidor web viaja cifrada y segura."
        ],
        keyTakeaway: "Un navegador es como tu automóvil; el motor de búsqueda es como el mapa que te dice a dónde ir en la ciudad.",
        mobileTip: "En Chrome para Android/iOS puedes activar 'Sitio para computadoras' en el menú de los 3 puntos para ver webs que no cargan bien en formato móvil."
      },
      {
        id: "1-5",
        number: "1.5",
        title: "Computación en la Nube y Respaldo Continuo",
        summary: "La nube no es vapor: son granjas masivas de servidores conectados 24/7 donde tus archivos se guardan a salvo.",
        content: [
          "Almacenamiento Local vs. Almacenamiento en Nube: Si tu teléfono se cae al agua o se extravía, todo lo guardado solo en la memoria interna se pierde. Lo guardado en Google Drive o OneDrive se recupera inmediatamente ingresando con tu correo.",
          "Sincronización Automática: Las fotos, documentos y copias de seguridad de WhatsApp se suben silenciosamente cuando estás conectado a Wi-Fi.",
          "Estructura Jerárquica: Una nube desordenada es igual a una habitación con ropa tirada por todos lados. Aprender a crear carpetas por temas (Año > Asignatura > Entrega) ahorra horas de búsqueda."
        ],
        keyTakeaway: "Tu cuenta de correo institucional o personal es tu llave maestra. Nunca compartas tu contraseña y mantén tus archivos organizados.",
        mobileTip: "Configura la subida de fotos solo por Wi-Fi en Google Fotos o Drive para no consumir tu paquete de datos móviles."
      }
    ],
    quiz: [
      {
        question: "¿Cuál es la principal ventaja de entregar un trabajo escolar en formato .PDF en vez de .DOCX?",
        options: [
          "Ocupa 100 veces menos espacio que cualquier otro archivo",
          "Mantiene la diagramación, fuentes y márgenes idénticos en cualquier pantalla o celular",
          "Permite que cualquier persona pueda modificar el texto sin dejar rastro",
          "Solo se puede abrir en computadoras de escritorio de alta gama"
        ],
        correctIndex: 1,
        explanation: "El formato PDF (Portable Document Format) preserva con exactitud el diseño gráfico, tipografías y orden de elementos sin importar la marca o tamaño de pantalla del lector."
      },
      {
        question: "¿Qué diferencia existe entre Google Chrome y Google Buscador?",
        options: [
          "Son exactamente lo mismo con dos nombres diferentes",
          "Chrome es la aplicación que abre páginas web (navegador) y el buscador es el servicio que encuentra información",
          "Chrome es un antivirus y el buscador es una red social",
          "Chrome solo sirve para ver videos de YouTube"
        ],
        correctIndex: 1,
        explanation: "Google Chrome es el navegador web (la herramienta de software), mientras que el buscador de Google es la plataforma web que rastrea e indexa información en internet."
      }
    ]
  },
  {
    id: "modulo-2",
    number: 2,
    title: "Hardware, Almacenamiento y Conectividad",
    shortTitle: "Hardware y Memoria",
    description: "Aprende cómo funciona por dentro un celular o computador, las unidades de medida de datos y cómo cuidar la memoria.",
    color: "from-blue-600 to-indigo-700",
    badge: "Técnico y Práctico",
    icon: "Cpu",
    topics: [
      {
        id: "2-1",
        number: "2.1",
        title: "El Cerebro del Dispositivo: CPU y Memoria RAM",
        summary: "La CPU procesa la información y la memoria RAM mantiene abiertas las aplicaciones activas.",
        content: [
          "CPU (Unidad Central de Procesamiento): El núcleo pensante que interpreta cada toque en pantalla. En celulares se habla de SoC (System on Chip) como Snapdragon, MediaTek o Apple Bionic.",
          "Memoria RAM (Random Access Memory): Memoria ultrarrápida pero volátil. Si abres WhatsApp, YouTube y un PDF a la vez, se sostienen en la RAM. Cuando apagas el teléfono o cierras la app, se vacía.",
          "Almacenamiento Interno (ROM / Flash UFS o eMMC): Memoria no volátil donde residen tus fotos, audios, apps y el sistema operativo Android o iOS."
        ],
        keyTakeaway: "Tener más RAM te permite alternar entre apps sin que se reinicien; tener más almacenamiento te permite guardar más fotos y videos.",
        mobileTip: "La memoria RAM no almacena fotos. Si tu teléfono dice 'Espacio insuficiente', lo que está lleno es el almacenamiento interno, no la RAM."
      },
      {
        id: "2-2",
        number: "2.2",
        title: "Escala de Medida de Información Digital",
        summary: "Del Bit al Terabyte: cómo se mide el peso de tus archivos y datos móviles.",
        content: [
          "Bit (b): La unidad mínima binaria (0 o 1).",
          "Byte (B): Grupo de 8 bits. Representa 1 carácter o letra (ej. la letra 'A').",
          "Kilobyte (KB): 1.024 Bytes. Un mensaje de texto corto o un icono pequeño (~50 KB).",
          "Megabyte (MB): 1.024 KB (~1 millón de bytes). Una canción en MP3 (~4 MB) o una foto en alta definición (~3 a 6 MB).",
          "Gigabyte (GB): 1.024 MB (~1.000 millones de bytes). Una película en HD (~1.5 a 4 GB) o la memoria típica de un celular (64 GB, 128 GB).",
          "Terabyte (TB): 1.024 GB. Almacenamiento masivo para servidores y discos duros externos."
        ],
        keyTakeaway: "1 GB equivale aproximadamente a 1.000 MB. Si tienes un plan de 2 GB de datos, un video en 4K de 1 GB se consumirá la mitad de tu saldo en minutos.",
        mobileTip: "Aprende a revisar en Ajustes > Almacenamiento qué elementos ocupan más Gigabytes en tu teléfono (casi siempre fotos, videos de WhatsApp y juegos)."
      },
      {
        id: "2-3",
        number: "2.3",
        title: "Puertos, Conexiones y Accesorios Móviles",
        summary: "USB-C, Bluetooth, OTG y cómo convertir un celular en estación de trabajo.",
        content: [
          "Puerto USB-C: El estándar reversible universal actual. Admite carga rápida, transferencia veloz de datos e incluso salida de video.",
          "Tecnología USB OTG (On-The-Go): Con un adaptador de $1 USD puedes conectar una memoria USB tradicional (pendrive), un ratón o un teclado físico directo a tu celular.",
          "Conexión Bluetooth: Enlace inalámbrico de corto alcance (hasta 10 metros) para audífonos, teclados portátiles y transferencia directa de archivos sin gastar datos.",
          "Cuidado de la batería: Evita dejar el celular descargarse por completo al 0% y no lo expongas a calor excesivo ni al sol directo."
        ],
        keyTakeaway: "Con un simple teclado Bluetooth o cable OTG, tu teléfono celular se transforma en un computador funcional para redactar tareas.",
        mobileTip: "Si en tu aula no hay computadoras, compartir un teclado físico entre compañeros y conectarlo al celular acelera la escritura de ensayos 5 veces."
      }
    ],
    quiz: [
      {
        question: "Si una fotografía promedio tomada con el celular pesa 4 Megabytes (MB), ¿cuántas fotos caben aproximadamente en 1 Gigabyte (1.000 MB)?",
        options: [
          "Aproximadamente 25 fotografías",
          "Aproximadamente 250 fotografías",
          "Exactamente 4 fotografías",
          "Más de 10.000 fotografías"
        ],
        correctIndex: 1,
        explanation: "1 Gigabyte son aprox. 1.000 Megabytes. Al dividir 1.000 MB entre 4 MB por foto, caben aproximadamente 250 fotos de alta calidad."
      }
    ]
  },
  {
    id: "modulo-3",
    number: 3,
    title: "Herramientas de Ofimática Productiva",
    shortTitle: "Ofimática Digital",
    description: "Domina procesadores de texto, hojas de cálculo con fórmulas y presentaciones visuales claras.",
    color: "from-emerald-600 to-teal-800",
    badge: "Habilidad Laboral",
    icon: "FileSpreadsheet",
    topics: [
      {
        id: "3-1",
        number: "3.1",
        title: "Procesador de Texto: Estructuración y Jerarquía Semántica",
        summary: "Aprende a redactar documentos legibles usando Título 1, Título 2, listas y márgenes adecuados.",
        content: [
          "El mayor error común: agrandar el texto a mano y poner negrita para simular un título. En su lugar, usa los 'Estilos de Párrafo' (Título 1, Título 2, Normal).",
          "Ventajas de usar Estilos: Genera automáticamente tablas de contenido (índices), permite navegación rápida por el documento y facilita la lectura a personas con discapacidad visual.",
          "Espaciado e Interlineado: Usa interlineado de 1.15 a 1.5 líneas para evitar fatiga ocular. Deja márgenes estándar de 2.5 cm a cada lado.",
          "Herramientas móviles: Google Docs, Microsoft 365 y WPS Office permiten editar textos completos desde el teléfono de forma gratuita."
        ],
        keyTakeaway: "Un documento bien estructurado transmite profesionalismo inmediato antes incluso de que el lector termine el primer párrafo.",
        mobileTip: "En Google Docs para celular, activa el botón de 'Vista de diseño de impresión' para verificar cómo saldrá tu trabajo antes de guardarlo en PDF."
      },
      {
        id: "3-2",
        number: "3.2",
        title: "Hojas de Cálculo: Celdas, Rangos y Fórmulas Indispensables",
        summary: "Aprende a automatizar cuentas, promedios y presupuestos con Google Sheets o Excel.",
        content: [
          "Estructura de la Hoja: Columnas (letras A, B, C...) y Filas (números 1, 2, 3...). La intersección es una Celda (ejemplo: B4).",
          "Un Rango es un bloque rectangular de celdas expresado con dos puntos: por ejemplo B2:B10 abarca desde la fila 2 hasta la 10.",
          "Fórmula =SUMA(rango): Suma todos los valores numéricos del bloque seleccionado.",
          "Fórmula =PROMEDIO(rango): Calcula la media aritmética (ideal para promedios de notas escolares o gastos).",
          "Fórmula condicional =SI(condicion; valor_si_verdadero; valor_si_falso): Permite que la computadora tome decisiones automáticas (ejemplo: si la nota es >= 3.0 escribe 'Aprobado', si no 'Reprobado')."
        ],
        keyTakeaway: "Toda fórmula en una hoja de cálculo DEBE iniciar obligatoriamente con el signo igual (=) para que el programa sepa que debe calcular y no solo mostrar texto.",
        mobileTip: "En el teclado de la app móvil de hojas de cálculo encontrarás una tecla especial '123' que abre el teclado numérico con signos matemáticos directos."
      },
      {
        id: "3-3",
        number: "3.3",
        title: "Presentaciones de Alto Impacto: La Regla 6x6",
        summary: "Diseña diapositivas visuales que transmitan ideas claras en Canva, Google Slides o PowerPoint.",
        content: [
          "La Regla 6x6: Máximo 6 líneas de texto por diapositiva y máximo 6 palabras por línea. Las diapositivas no son para leer un testamento, son una guía visual para tu exposición.",
          "Contraste Tipográfico: Texto oscuro sobre fondo claro o texto blanco sobre fondo oscuro. Evita combinaciones ilegibles como letras amarillas sobre fondo blanco.",
          "Imágenes de calidad: Usa una sola imagen representativa y contundente en lugar de 5 fotos diminutas y pixeladas.",
          "Uso de Canva en el Celular: Plantillas gratuitas para crear infografías, resúmenes visuales y posters escolares con diseño profesional."
        ],
        keyTakeaway: "Tu audiencia debe prestarte atención a ti mientras hablas; la diapositiva solo debe reforzar la idea central.",
        mobileTip: "Puedes proyectar una presentación de Canva o Google Slides desde tu celular al televisor o proyector usando un cable HDMI-USBC o Chromecast."
      }
    ],
    quiz: [
      {
        question: "¿Qué símbolo es obligatorio escribir al inicio de cualquier celda en Google Sheets o Excel para ejecutar una operación matemática?",
        options: [
          "El signo numeral (#)",
          "El signo de arroba (@)",
          "El signo igual (=)",
          "El signo de porcentaje (%)"
        ],
        correctIndex: 2,
        explanation: "El signo igual (=) indica al software de hojas de cálculo que lo que sigue es una fórmula matemática o función computacional que debe ser calculada."
      }
    ]
  },
  {
    id: "modulo-4",
    number: 4,
    title: "El Celular como Oficina Móvil y la Nube",
    shortTitle: "Celular & Nube",
    description: "Gestión avanzada de archivos, digitalización con cámara y permisos colaborativos seguros.",
    color: "from-amber-600 to-orange-700",
    badge: "Clave para tu Aula",
    icon: "Smartphone",
    topics: [
      {
        id: "4-1",
        number: "4.1",
        title: "El Celular como Oficina Portátil y Explorador de Archivos",
        summary: "Aprende a navegar las carpetas internas de tu teléfono (Descargas, Documentos, WhatsApp Media).",
        content: [
          "Todo celular inteligente cuenta con una app nativa llamada 'Archivos', 'Mis Archivos' o 'Files de Google'.",
          "Carpeta 'Descargas' (Download): Es el buzón donde van a parar todos los PDFs y documentos bajados del navegador web.",
          "Archivos de WhatsApp: WhatsApp guarda audios y documentos en carpetas del sistema. Si no los organizas, consumen memoria oculta.",
          "Renombrar archivos inmediatamente: Nunca dejes nombres como 'IMG_20261020_WA0023.pdf'. Cámbialo al instante a 'Tarea_Sociales_JuanPerez.pdf' para identificarlo sin abrirlo."
        ],
        keyTakeaway: "Un archivo bien nombrado te asegura encontrarlo en 2 segundos cuando el docente lo solicita.",
        mobileTip: "Descarga 'Files de Google' desde la tienda de aplicaciones: te ayuda a limpiar basura de WhatsApp y duplicados con un solo toque."
      },
      {
        id: "4-2",
        number: "4.2",
        title: "Escaneo Profesional de Cuadernos y Documentos con la Cámara",
        summary: "Transforma fotos oscuras o torcidas de tu cuaderno en documentos PDF nítidos y profesionales.",
        content: [
          "Por qué NO enviar fotos sueltas del cuaderno: Las fotos quedan con sombras de la mano, torcidas, ocupan 20 MB y obligan al docente a descargar 8 imágenes desordenadas.",
          "El Escáner Integrado de Google Drive: En tu celular, abre Google Drive > toca el botón '+' > selecciona 'Escanear'.",
          "Detección de bordes automática: El escáner recorta la mesa, endereza la página, ajusta el contraste a blanco y negro limpio y te permite agregar 10 páginas seguidas en un único archivo PDF ligero.",
          "Otras apps recomendadas: Microsoft Lens, Adobe Scan o CamScanner (versión gratuita)."
        ],
        keyTakeaway: "Un documento escaneado como PDF multipágina demuestra dedicación, respeto por el tiempo del evaluador y ocupa 10 veces menos datos móviles.",
        mobileTip: "Ubícate cerca de una ventana o en un lugar con buena luz cenital para evitar que la sombra de tu propio teléfono caiga sobre la hoja del cuaderno."
      },
      {
        id: "4-3",
        number: "4.3",
        title: "Sincronización en la Nube y Auditoría de Permisos",
        summary: "Aprende a compartir archivos con seguridad: Lector, Comentador y Editor.",
        content: [
          "Nivel 1: Lector (Viewer). La persona puede ver y descargar el documento, pero NO puede borrar texto ni alterar nada. (Ideal para entregar trabajos a profesores o compartir guías).",
          "Nivel 2: Comentador (Commenter). La persona puede leer y dejar notas o sugerencias al margen, sin modificar el texto original directamente.",
          "Nivel 3: Editor. La persona tiene control total. ¡Cuidado! Puede borrar párrafos completos o reescribir contenido. Úsalo solo para compañeros de equipo de máxima confianza.",
          "Tipo de Acceso: 'Cualquier persona con el enlace' (abierto a todo el que tenga el link) vs. 'Restringido' (solo las cuentas de correo autorizadas pueden ingresar)."
        ],
        keyTakeaway: "Siempre verifica dos veces los permisos antes de enviar un enlace. Si compartes en modo 'Restringido' sin dar permiso al correo del profesor, no podrá calificar tu trabajo.",
        mobileTip: "En Google Drive puedes crear una carpeta por asignatura (ej. 'Biología 2026') y compartir toda la carpeta una sola vez con el profesor."
      }
    ],
    quiz: [
      {
        question: "Deseas enviar una tarea en equipo a un compañero para que él añada su parte del texto. ¿Qué permiso debes asignarle en Google Drive?",
        options: [
          "Permiso de Lector",
          "Permiso de Comentador",
          "Permiso de Editor",
          "Permiso Propietario Exclusivo"
        ],
        correctIndex: 2,
        explanation: "El rol de 'Editor' le otorga los privilegios necesarios para escribir, añadir párrafos y editar el contenido de forma colaborativa."
      }
    ]
  },
  {
    id: "modulo-5",
    number: 5,
    title: "Inteligencia Artificial y Productividad Responsable",
    shortTitle: "IA Responsable",
    description: "Aprende a dialogar con modelos de lenguaje como Gemini usando la fórmula R-C-T-F-R y detecta alucinaciones.",
    color: "from-purple-600 to-indigo-800",
    badge: "Futuro Digital",
    icon: "Bot",
    topics: [
      {
        id: "5-1",
        number: "5.1",
        title: "¿Cómo funciona la IA Generativa en la Práctica?",
        summary: "Los modelos de lenguaje no piensan como humanos: predicen la secuencia de palabras más probable según patrones estadísticos masivos.",
        content: [
          "Un Modelo de Lenguaje Grande (LLM como Google Gemini) ha analizado miles de millones de textos en docenas de idiomas para aprender cómo se articulan las ideas.",
          "Generación predictiva: No busca respuestas en una enciclopedia estática; genera el texto palabra por palabra basándose en el contexto que le proporcionas.",
          "Consecuencia directa: Si le pides algo ambiguo o le preguntas sobre datos inventados con tono afirmativo, la IA puede inventar información que suena convincente pero es falsa (Alucinación)."
        ],
        keyTakeaway: "La IA es un copiloto de investigación, no un sustituto de tu criterio. Tú eres el responsable final de lo que entregas en tu clase.",
        mobileTip: "Puedes usar la app oficial de Google Gemini o su versión web gratuita en el navegador móvil para resolver dudas conceptuales paso a paso."
      },
      {
        id: "5-2",
        number: "5.2",
        title: "El Arte del Prompting Efectivo: La Fórmula R-C-T-F-R",
        summary: "Estructura tus instrucciones para obtener respuestas precisas, útiles y académicas.",
        content: [
          "R - Rol: 'Actúa como un profesor de física de secundaria pedagógico y paciente'.",
          "C - Contexto: 'Estoy en grado 10 y me cuesta entender la diferencia entre velocidad y aceleración'.",
          "T - Tarea: 'Explica ambos conceptos con 3 analogías sencillas de la vida cotidiana usando ejemplos de bicicletas o carreras'.",
          "F - Formato: 'Presenta la respuesta en una tabla comparativa con 3 columnas: Concepto, Ejemplo Cotidiano y Fórmula'.",
          "R - Restricciones: 'No uses tecnicismos matemáticos complejos y no extiendas la explicación a más de 300 palabras'."
        ],
        keyTakeaway: "La calidad de la respuesta de la IA es directamente proporcional a la claridad de tu instrucción.",
        mobileTip: "Guarda una nota en tu celular con la plantilla R-C-T-F-R para copiar y pegar cada vez que consultes a una IA."
      },
      {
        id: "5-3",
        number: "5.3",
        title: "Límites Éticos: Alucinaciones, Plagio y Privacidad Escolar",
        summary: "Protege tus datos personales y evita cometer fraude académico al utilizar asistentes de IA.",
        content: [
          "Verificación Cruzada: Nunca aceptes una fecha histórica, una cita bibliográfica o un dato científico generado por IA sin contrastarlo con un libro de texto o fuente oficial.",
          "Privacidad de Datos: Nunca pegues en un chatbot de IA contraseñas, documentos de identidad, números telefónicos familiares ni datos íntimos.",
          "Honestidad Intelectual: Usar IA para que te explique un tema difícil es excelente pedagogía; copiar y pegar una respuesta sin leerla ni entenderla te priva de aprender y constituye plagio."
        ],
        keyTakeaway: "El verdadero valor del estudiante en la era de la IA no es memorizar datos que un bot produce en 2 segundos, sino saber formular las preguntas correctas y verificar la verdad.",
        mobileTip: "Pídele a la IA: 'Pon a prueba mis conocimientos haciéndome 3 preguntas de opción múltiple sobre el tema X' para estudiar activamente."
      }
    ],
    quiz: [
      {
        question: "En la fórmula de prompting R-C-T-F-R, ¿qué representa la letra 'R' final?",
        options: [
          "Robótica aplicada",
          "Restricciones (límites de extensión, tono o cosas que debe evitar la IA)",
          "Reintentar la consulta en caso de error",
          "Resumen en formato de audio"
        ],
        correctIndex: 1,
        explanation: "La 'R' final significa Restricciones: límites específicos como 'no uses más de 200 palabras', 'sin tecnicismos complejos' o 'evita usar lenguaje formal'."
      }
    ]
  },
  {
    id: "modulo-6",
    number: 6,
    title: "Ciberseguridad, Ciudadanía Digital y Respaldo",
    shortTitle: "Ciberseguridad",
    description: "Aprende a reconocer estafas por WhatsApp, proteger tus cuentas con 2FA y mantener respaldos seguros.",
    color: "from-rose-600 to-red-800",
    badge: "Protección Vital",
    icon: "ShieldCheck",
    topics: [
      {
        id: "6-1",
        number: "6.1",
        title: "Anatomía del Phishing y la Ingeniería Social",
        summary: "Cómo los atacantes manipulan tus emociones (miedo, urgencia o curiosidad) para robar contraseñas.",
        content: [
          "¿Qué es el Phishing? Es el intento de suplantar la identidad de una entidad de confianza (un banco, WhatsApp, el colegio, Netflix) para que hagas clic en un enlace falso y digites tus credenciales.",
          "Canales habituales en celular: Mensajes de WhatsApp de números desconocidos ('¡Mira quién murió!', 'Bono escolar del gobierno ingresa aquí'), mensajes SMS o correos electrónicos.",
          "Señales de Alerta Claras: Urgencia desmedida ('Tu cuenta será eliminada en 2 horas'), errores ortográficos o gramaticales, y enlaces sospechosos (ej. www.banco-verificacion-segura.xyz en vez del dominio oficial)."
        ],
        keyTakeaway: "Ninguna entidad bancaria o educativa seria te pedirá tu contraseña secreta ni tu código de verificación por un mensaje de WhatsApp.",
        mobileTip: "Antes de pulsar un enlace sospechoso en el celular, mantén el dedo presionado 1 segundo sobre él para previsualizar la dirección URL real a la que te enviará."
      },
      {
        id: "6-2",
        number: "6.2",
        title: "Contraseñas Robustas y Autenticación en Dos Pasos (2FA)",
        summary: "Crea claves imposibles de adivinar y blinda tus cuentas con un segundo factor de seguridad.",
        content: [
          "Por qué '123456', 'micolegio2026' o tu fecha de nacimiento son peligrosas: Un programa de fuerza bruta las descifra en menos de 0.01 segundos.",
          "La técnica de las Frases de Paso (Passphrases): Une 4 palabras al azar con espacios o símbolos (ejemplo: 'Caballo-Nube-Cafe-Guitarra7!'). Son fáciles de recordar para ti pero imposibles de hackear para una máquina.",
          "Autenticación en Dos Pasos (2FA): Es una segunda cerradura digital. Aunque un atacante descubra tu contraseña, no podrá entrar a tu WhatsApp o Gmail sin el código temporal que llega a tu celular o a tu app autenticadora."
        ],
        keyTakeaway: "Activa la verificación en dos pasos en tu WhatsApp HOY mismo (Ajustes > Cuenta > Verificación en dos pasos). Evita que roben tu cuenta para estafar a tus contactos.",
        mobileTip: "Usa un gestor de contraseñas seguro como Bitwarden o el Administrador de Contraseñas de Google integrado en Android."
      },
      {
        id: "6-3",
        number: "6.3",
        title: "La Regla de Respaldo 3-2-1",
        summary: "La estrategia profesional para jamás perder un trabajo escolar o tus fotos más valiosas.",
        content: [
          "3 Copias de tus datos importantes (la copia original de trabajo y 2 respaldos adicionales).",
          "2 Medios de almacenamiento diferentes (por ejemplo, en la memoria de tu celular y en una memoria USB física).",
          "1 Copia fuera del lugar físico (en la nube: Google Drive, OneDrive o iCloud), inmune a si tu teléfono sufre un daño físico o robo.",
          "Disciplina periódica: Realiza un respaldo de tus carpetas escolares cada fin de mes o al término de cada periodo lectivo."
        ],
        keyTakeaway: "Un archivo que existe en un solo lugar no es un archivo seguro, es un archivo en riesgo inminente de desaparecer.",
        mobileTip: "Guarda copias de tus certificados académicos, documento de identidad escaneado y carné de salud en una carpeta segura en Drive con acceso sin conexión."
      }
    ],
    quiz: [
      {
        question: "Recibes un mensaje de WhatsApp que dice: '¡Urgente! Te enviamos un código de 6 dígitos por SMS por error, reenvíanoslo para evitar que suspendan tu cuenta'. ¿Qué debes hacer?",
        options: [
          "Reenviarlo rápidamente antes de que se cumpla el plazo",
          "Nunca compartir el código; se trata de un intento de robo de tu cuenta de WhatsApp",
          "Publicar el código en redes sociales para pedir ayuda",
          "Apagar el celular durante 2 semanas"
        ],
        correctIndex: 1,
        explanation: "Ese código de 6 dígitos es el código de verificación para registrar tu WhatsApp en otro dispositivo. Si se lo das, el atacante tomará control total de tu cuenta."
      }
    ]
  }
];

export interface ICTTool {
  id: string;
  name: string;
  category: "nube" | "ofimatica" | "escaneo" | "ia" | "visual" | "seguridad";
  categoryLabel: string;
  isMobileOptimized: boolean;
  pricing: string;
  description: string;
  useCase: string;
  officialUrl: string;
  color: string;
}

export const ICT_TOOLS: ICTTool[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    category: "nube",
    categoryLabel: "Almacenamiento en Nube",
    isMobileOptimized: true,
    pricing: "Gratuito (15 GB)",
    description: "Almacén en la nube líder que permite guardar, organizar carpetas y compartir archivos con permisos específicos.",
    useCase: "Crear carpetas por asignaturas, escanear tareas con la cámara y respaldar trabajos escolares.",
    officialUrl: "https://drive.google.com",
    color: "emerald"
  },
  {
    id: "onedrive",
    name: "Microsoft OneDrive",
    category: "nube",
    categoryLabel: "Almacenamiento en Nube",
    isMobileOptimized: true,
    pricing: "Gratuito (5 GB)",
    description: "Nube de Microsoft con sincronización fluida con Word, Excel y PowerPoint tanto en móvil como en PC.",
    useCase: "Ideal si tu institución educativa cuenta con cuentas institucionales de Microsoft 365.",
    officialUrl: "https://onedrive.live.com",
    color: "blue"
  },
  {
    id: "google-docs",
    name: "Google Documentos",
    category: "ofimatica",
    categoryLabel: "Ofimática Móvil",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "Procesador de texto colaborativo en tiempo real. Funciona con o sin conexión a internet.",
    useCase: "Escribir ensayos, trabajos en grupo simultáneos y exportar a PDF con normas académicas.",
    officialUrl: "https://docs.google.com",
    color: "blue"
  },
  {
    id: "google-sheets",
    name: "Google Hojas de Cálculo",
    category: "ofimatica",
    categoryLabel: "Ofimática Móvil",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "Planilla de cálculo móvil para fórmulas matemáticas, estadísticas y gráficos de barras o circulares.",
    useCase: "Calcular promedios escolares, llevar control de gastos de la clase y tabular encuestas.",
    officialUrl: "https://sheets.google.com",
    color: "green"
  },
  {
    id: "google-drive-scan",
    name: "Escáner Google Drive Móvil",
    category: "escaneo",
    categoryLabel: "Escaneo a PDF",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "Función de escaneo integrada en la app móvil de Google Drive con detección automática de bordes y mejora de contraste.",
    useCase: "Digitalizar páginas de cuadernos físicos y unirlas en un solo PDF nítido sin marcas de agua.",
    officialUrl: "https://support.google.com/drive/answer/3145835",
    color: "amber"
  },
  {
    id: "adobe-scan",
    name: "Adobe Scan",
    category: "escaneo",
    categoryLabel: "Escaneo a PDF",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "App de escaneo profesional con reconocimiento óptico de caracteres (OCR) que convierte fotos en texto seleccionable.",
    useCase: "Copiar texto de libros físicos para citarlos en investigaciones escolares.",
    officialUrl: "https://www.adobe.com/acrobat/mobile/scanner-app.html",
    color: "red"
  },
  {
    id: "canva",
    name: "Canva Educación",
    category: "visual",
    categoryLabel: "Diseño & Presentaciones",
    isMobileOptimized: true,
    pricing: "Freemium / Gratuito para Escuelas",
    description: "Plataforma de diseño visual táctil para crear infografías, presentaciones, mapas mentales y pósteres.",
    useCase: "Diseñar exposiciones escolares de alto impacto visual sin necesitar conocimientos de diseño gráfico.",
    officialUrl: "https://www.canva.com",
    color: "teal"
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    category: "ia",
    categoryLabel: "Inteligencia Artificial",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "Asistente de IA multimodal para resolver dudas, resumir textos largos y practicar explicaciones paso a paso.",
    useCase: "Pedirle que actúe como tutor escolar para explicar un problema matemático o sugerir ideas de investigación.",
    officialUrl: "https://gemini.google.com",
    color: "indigo"
  },
  {
    id: "bitwarden",
    name: "Bitwarden Gestor de Claves",
    category: "seguridad",
    categoryLabel: "Ciberseguridad Móvil",
    isMobileOptimized: true,
    pricing: "Gratuito y Open Source",
    description: "Bóveda cifrada para almacenar y generar contraseñas seguras únicas para cada aplicación o plataforma escolar.",
    useCase: "No tener que recordar 20 contraseñas diferentes ni usar claves inseguras en el teléfono.",
    officialUrl: "https://bitwarden.com",
    color: "cyan"
  },
  {
    id: "files-by-google",
    name: "Files de Google",
    category: "seguridad",
    categoryLabel: "Gestor y Limpieza de Celular",
    isMobileOptimized: true,
    pricing: "Gratuito",
    description: "Administrador de archivos oficial para Android que localiza archivos basura, duplicados y fotos pesadas de WhatsApp.",
    useCase: "Liberar varios Gigabytes de memoria en el celular para que no se congele durante la clase.",
    officialUrl: "https://files.google.com",
    color: "yellow"
  }
];
