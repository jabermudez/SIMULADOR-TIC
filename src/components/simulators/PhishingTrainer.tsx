import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';

interface Scenario {
  id: number;
  type: 'whatsapp' | 'sms';
  sender: string;
  avatarText: string;
  message: string;
  linkText?: string;
  isPhishing: boolean;
  redFlags: string[];
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: 'whatsapp',
    sender: '+57 321 987 6543 (Desconocido)',
    avatarText: 'WA',
    message: '¡Felicidades! Fuiste seleccionado para el Bono Escolar Digital de $200.000. Tienes 30 minutos para reclamarlo antes de que expire.',
    linkText: 'http://bono-escolar-gobierno-colombia.xyz/reclamar',
    isPhishing: true,
    redFlags: [
      'Remitente desconocido por WhatsApp',
      'Urgencia artificial (30 minutos para actuar)',
      'Dominio sospechoso (.xyz en vez de .gov.co oficial)'
    ],
    explanation: 'Ningún subsidio o bono oficial se entrega por cadenas de WhatsApp con dominios gratuitos .xyz. Al ingresar tus datos o contraseña, clonan tu identidad.'
  },
  {
    id: 2,
    type: 'whatsapp',
    sender: 'Colegio Institucional (Docente)',
    avatarText: 'PRO',
    message: 'Estimados estudiantes, la guía 3 de Biología ya está cargada en Google Classroom para quienes deseen adelantar la lectura.',
    linkText: 'https://classroom.google.com/c/MzcyOTY2',
    isPhishing: false,
    redFlags: [],
    explanation: 'El enlace utiliza el protocolo seguro HTTPS y apunta al dominio oficial legítimo de Google (google.com). No solicita contraseñas por chat ni amenaza con sanciones inmediatas.'
  },
  {
    id: 3,
    type: 'sms',
    sender: 'SOPORTE-WA',
    avatarText: 'SMS',
    message: 'Tu cuenta de WhatsApp se suspenderá en 2 horas por actividad inusual. Reenvía de inmediato el código de 6 dígitos que te llegó por SMS para verificar que eres humano.',
    isPhishing: true,
    redFlags: [
      'Petición del código de verificación de 6 dígitos',
      'Amenaza de bloqueo inmediato de cuenta',
      'Canal no oficial de WhatsApp'
    ],
    explanation: '¡Alerta máxima! Este es el método número 1 de robo de cuentas de WhatsApp. Ese código es la clave para registrar tu WhatsApp en el teléfono del atacante. ¡NUNCA lo compartas con nadie!'
  },
  {
    id: 4,
    type: 'whatsapp',
    sender: '+1 829 450 1122 (Número Extranjero)',
    avatarText: 'PRO',
    message: 'Hola, vi tu perfil y fuiste seleccionado para ganar $50 dólares diarios viendo videos de YouTube desde tu celular. Solo descarga este archivo APK e instálalo.',
    linkText: 'http://descargas-apps-dinero.ru/app_premio.apk',
    isPhishing: true,
    redFlags: [
      'Oferta de dinero fácil irreal',
      'Petición de descargar archivos .APK fuera de la tienda oficial',
      'Número telefónico desconocido del extranjero'
    ],
    explanation: 'Los archivos .APK externos suelen ser troyanos o spyware que toman control de la cámara, contactos y contraseñas bancarias de tu teléfono móvil.'
  }
];

export const PhishingTrainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<'phishing' | 'safe' | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const scenario = SCENARIOS[currentIndex];
  const isAnswered = userChoice !== null;
  const isCorrect = userChoice === (scenario.isPhishing ? 'phishing' : 'safe');

  const handleAnswer = (choice: 'phishing' | 'safe') => {
    if (isAnswered) return;
    setUserChoice(choice);
    setAnsweredCount(answeredCount + 1);
    const correct = choice === (scenario.isPhishing ? 'phishing' : 'safe');
    if (correct) {
      setScore(score + 100);
      triggerConfetti();
    }
  };

  const handleNext = () => {
    setUserChoice(null);
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-slate-800">
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Laboratorio Anti-Phishing para WhatsApp & SMS
              </h3>
              <p className="text-[11px] text-slate-400">
                Aprende a identificar trampas e ingeniería social dirigidas a tu celular
              </p>
            </div>
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Puntaje</span>
            <span className="font-black text-rose-400 text-xs sm:text-sm">{score} XP</span>
          </div>
        </div>

        {/* Progress pills */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-800">
          {SCENARIOS.map((s, idx) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full ${
                idx === currentIndex
                  ? 'bg-rose-500'
                  : idx < currentIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Caso {currentIndex + 1} de {SCENARIOS.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Formato: {scenario.type === 'whatsapp' ? 'Mensaje de WhatsApp' : 'Mensaje SMS'}
          </span>
        </div>

        {/* Mock Phone Chat Bubble */}
        <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto shadow-inner">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {scenario.avatarText}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 truncate">{scenario.sender}</p>
              <p className="text-[10px] text-emerald-600 font-medium">En línea</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200 text-xs text-slate-800 space-y-2">
            <p className="leading-relaxed">{scenario.message}</p>
            {scenario.linkText && (
              <p className="font-mono text-[11px] text-blue-600 underline break-all bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                {scenario.linkText}
              </p>
            )}
            <p className="text-[10px] text-slate-400 text-right">10:42 AM</p>
          </div>
        </div>

        {/* User Decision Buttons */}
        {!isAnswered ? (
          <div className="mt-5 max-w-md mx-auto">
            <p className="text-center font-bold text-xs text-slate-700 mb-3">
              ¿Qué harías frente a este mensaje en tu celular?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer('phishing')}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center justify-center gap-2 transition active:scale-95"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>¡Es Phishing / Fraude!</span>
              </button>

              <button
                onClick={() => handleAnswer('safe')}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-2 transition active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Es Legítimo y Seguro</span>
              </button>
            </div>
          </div>
        ) : (
          /* Result & Explanation Card */
          <div
            className={`mt-4 p-4 rounded-2xl border max-w-md mx-auto ${
              isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-emerald-900">
                    ¡Excelente ojo crítico! Respuesta Correcta (+100 XP)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-rose-900">
                    ¡Cuidado! Este mensaje representa un peligro real
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {scenario.explanation}
            </p>

            {scenario.redFlags.length > 0 && (
              <div className="bg-white/80 p-2.5 rounded-xl border border-rose-200 text-[11px] text-rose-900 space-y-1 mb-3">
                <p className="font-bold">Señales de alerta presentes:</p>
                {scenario.redFlags.map((flag, idx) => (
                  <p key={idx} className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                    <span>{flag}</span>
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <span>{currentIndex < SCENARIOS.length - 1 ? 'Siguiente Caso' : 'Reiniciar Laboratorio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
