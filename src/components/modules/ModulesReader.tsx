import React, { useState } from 'react';
import {
  Globe,
  Cpu,
  FileSpreadsheet,
  Smartphone,
  Bot,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Award,
  Check
} from 'lucide-react';
import { MODULES_DATA, ModuleData, TopicItem } from '../../data/modulesData';
import { triggerConfetti } from '../../utils/confetti';

interface ModulesReaderProps {
  completedModules: string[];
  onToggleCompleteModule: (moduleId: string) => void;
  onOpenSimulatorForTopic?: (topicId: string) => void;
}

export const ModulesReader: React.FC<ModulesReaderProps> = ({
  completedModules,
  onToggleCompleteModule,
  onOpenSimulatorForTopic,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(MODULES_DATA[0].id);
  const [expandedTopicId, setExpandedTopicId] = useState<string>(MODULES_DATA[0].topics[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<string, boolean>>({});

  const activeModule = MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-amber-600" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-purple-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-teal-600" />;
    }
  };

  const handleSelectQuizOption = (questionIdx: number, optionIdx: number) => {
    const key = `${activeModule.id}_q${questionIdx}`;
    setQuizAnswers({ ...quizAnswers, [key]: optionIdx });
  };

  const handleValidateQuiz = () => {
    setShowQuizResults({ ...showQuizResults, [activeModule.id]: true });
    // Check if passed
    const allCorrect = activeModule.quiz.every(
      (q, idx) => quizAnswers[`${activeModule.id}_q${idx}`] === q.correctIndex
    );
    if (allCorrect) {
      triggerConfetti();
      if (!completedModules.includes(activeModule.id)) {
        onToggleCompleteModule(activeModule.id);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Module selector pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MODULES_DATA.map((mod) => {
          const isSelected = mod.id === activeModule.id;
          const isDone = completedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModuleId(mod.id);
                setExpandedTopicId(mod.topics[0]?.id || '');
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                isDone ? 'bg-emerald-500 text-white' : isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                {isDone ? <Check className="w-3 h-3" /> : mod.number}
              </span>
              <span>{mod.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Module Header */}
      <div className={`bg-gradient-to-r ${activeModule.color} text-white rounded-2xl p-4 sm:p-5 shadow-sm`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
              {activeModule.badge}
            </span>
            <h3 className="text-base sm:text-xl font-bold mt-1 text-white">
              Módulo {activeModule.number}: {activeModule.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
              {activeModule.description}
            </p>
          </div>

          <button
            onClick={() => onToggleCompleteModule(activeModule.id)}
            className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              completedModules.includes(activeModule.id)
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completedModules.includes(activeModule.id) ? 'Módulo Completado' : 'Marcar como Leído'}</span>
          </button>
        </div>
      </div>

      {/* Topics Accordion */}
      <div className="space-y-3">
        {activeModule.topics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <div
              key={topic.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-teal-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {topic.number}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                      {topic.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {topic.summary}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 p-1 text-slate-400 hover:text-slate-700">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3.5 animate-in fade-in duration-200">
                  {/* Detailed paragraphs */}
                  <div className="space-y-2 text-slate-600 leading-relaxed">
                    {topic.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Key Takeaway Box */}
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Concepto Clave: </span>
                      <span>{topic.keyTakeaway}</span>
                    </div>
                  </div>

                  {/* Mobile Tip */}
                  {topic.mobileTip && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Tip para tu Celular: </span>
                        <span>{topic.mobileTip}</span>
                      </div>
                    </div>
                  )}

                  {/* Practical Action */}
                  {topic.practicalAction && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Ejercicio en Clase: </span>
                        <span>{topic.practicalAction}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Module Quiz */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mt-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <HelpCircle className="w-5 h-5 text-teal-600" />
          <h4 className="font-bold text-sm sm:text-base text-slate-800">
            Autoevaluación Rápida del Módulo {activeModule.number}
          </h4>
        </div>

        <div className="mt-4 space-y-4">
          {activeModule.quiz.map((q, qIdx) => {
            const key = `${activeModule.id}_q${qIdx}`;
            const selectedOpt = quizAnswers[key];
            const isSubmitted = showQuizResults[activeModule.id];

            return (
              <div key={qIdx} className="space-y-2">
                <p className="font-bold text-xs sm:text-sm text-slate-800">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedOpt === oIdx;
                    const isCorrect = q.correctIndex === oIdx;

                    let btnStyle = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';
                    if (isSelected) {
                      btnStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-semibold';
                    }
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center gap-2 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation if submitted */}
                {isSubmitted && (
                  <div className="p-2.5 bg-slate-100 rounded-xl text-xs text-slate-700 mt-2">
                    <span className="font-bold">Retroalimentación: </span>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={handleValidateQuiz}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            Verificar Respuestas
          </button>
        </div>
      </div>
    </div>
  );
};
