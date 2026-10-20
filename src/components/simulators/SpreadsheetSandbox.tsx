import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calculator,
  HelpCircle,
  Sparkles,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';

interface GradeRow {
  student: string;
  n1: number;
  n2: number;
  n3: number;
}

export const SpreadsheetSandbox: React.FC = () => {
  const [grades, setGrades] = useState<GradeRow[]>([
    { student: 'Ana Martínez', n1: 4.5, n2: 4.0, n3: 5.0 },
    { student: 'Carlos Gómez', n1: 2.8, n2: 3.0, n3: 3.5 },
    { student: 'Diana López', n1: 3.8, n2: 4.2, n3: 3.6 },
    { student: 'Esteban Ruiz', n1: 2.0, n2: 2.5, n3: 2.2 },
  ]);

  const [activeFormula, setActiveFormula] = useState<'PROMEDIO' | 'SUMA' | 'CONDICIONAL'>('PROMEDIO');

  const updateGrade = (index: number, field: 'n1' | 'n2' | 'n3', val: number) => {
    const clamped = Math.max(0, Math.min(5, isNaN(val) ? 0 : val));
    const next = [...grades];
    next[index][field] = clamped;
    setGrades(next);
  };

  const calculateRowAverage = (row: GradeRow) => {
    return ((row.n1 + row.n2 + row.n3) / 3).toFixed(1);
  };

  const calculateRowSum = (row: GradeRow) => {
    return (row.n1 + row.n2 + row.n3).toFixed(1);
  };

  const getStatus = (avg: number) => {
    return avg >= 3.0 ? 'Aprobado' : 'Reprobado';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-slate-800">
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Simulador de Fórmulas: Google Sheets & Excel
              </h3>
              <p className="text-[11px] text-slate-400">
                Aprende cómo operan las celdas y cómo automatizar cálculos matemáticos en tu celular
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold">
            Taller Ofimática
          </span>
        </div>

        {/* Formula Switcher */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveFormula('PROMEDIO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeFormula === 'PROMEDIO'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            =PROMEDIO(B2:D2)
          </button>
          <button
            onClick={() => setActiveFormula('SUMA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeFormula === 'SUMA'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            =SUMA(B2:D2)
          </button>
          <button
            onClick={() => setActiveFormula('CONDICIONAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeFormula === 'CONDICIONAL'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            =SI(Promedio &gt;= 3.0; "Aprobado"; "Reprobado")
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Interactive Spreadsheet Grid */}
        <div className="overflow-x-auto border border-slate-300 rounded-xl bg-slate-50">
          <table className="w-full text-xs text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-200/90 text-slate-600 font-mono text-[11px]">
                <th className="p-2 border border-slate-300 text-center w-8">#</th>
                <th className="p-2 border border-slate-300">Columna A (Estudiante)</th>
                <th className="p-2 border border-slate-300 text-center">Col B (Nota 1)</th>
                <th className="p-2 border border-slate-300 text-center">Col C (Nota 2)</th>
                <th className="p-2 border border-slate-300 text-center">Col D (Nota 3)</th>
                <th className="p-2 border border-slate-300 text-center bg-emerald-100/80 text-emerald-950 font-bold">
                  Col E (Fórmula en vivo)
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map((row, idx) => {
                const rowNum = idx + 2;
                const avgNum = Number(calculateRowAverage(row));
                const sumNum = calculateRowSum(row);
                return (
                  <tr key={idx} className="bg-white hover:bg-slate-50 transition font-mono">
                    <td className="p-2 border border-slate-200 text-center bg-slate-100 text-slate-500 font-bold">
                      {rowNum}
                    </td>
                    <td className="p-2 border border-slate-200 font-sans font-semibold text-slate-800">
                      {row.student}
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={row.n1}
                        onChange={(e) => updateGrade(idx, 'n1', parseFloat(e.target.value))}
                        className="w-14 text-center py-1 bg-slate-50 border border-slate-200 rounded font-mono font-bold focus:bg-white focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={row.n2}
                        onChange={(e) => updateGrade(idx, 'n2', parseFloat(e.target.value))}
                        className="w-14 text-center py-1 bg-slate-50 border border-slate-200 rounded font-mono font-bold focus:bg-white focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={row.n3}
                        onChange={(e) => updateGrade(idx, 'n3', parseFloat(e.target.value))}
                        className="w-14 text-center py-1 bg-slate-50 border border-slate-200 rounded font-mono font-bold focus:bg-white focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-2 border border-slate-200 text-center font-bold bg-emerald-50/50">
                      {activeFormula === 'PROMEDIO' && (
                        <span className={avgNum >= 3.0 ? 'text-emerald-700' : 'text-rose-600'}>
                          {calculateRowAverage(row)}
                        </span>
                      )}
                      {activeFormula === 'SUMA' && (
                        <span className="text-slate-800">{sumNum}</span>
                      )}
                      {activeFormula === 'CONDICIONAL' && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                            avgNum >= 3.0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {getStatus(avgNum)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Formula breakdown and explanation */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-800 mb-1.5">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Explicación didáctica de la fórmula activa:</span>
          </div>

          {activeFormula === 'PROMEDIO' && (
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-emerald-700 font-mono">=PROMEDIO(B2:D2)</strong> suma automáticamente los valores de las columnas B, C y D en la fila 2 y divide el resultado entre 3. Si modificas cualquiera de las notas en la tabla de arriba, ¡observa cómo el promedio se recalcula al instante!
            </p>
          )}

          {activeFormula === 'SUMA' && (
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-emerald-700 font-mono">=SUMA(B2:D2)</strong> agrega aritméticamente todas las notas del rango. Es indispensable cuando haces presupuestos familiares o listas de gastos en tu celular.
            </p>
          )}

          {activeFormula === 'CONDICIONAL' && (
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-emerald-700 font-mono">=SI(E2&gt;=3.0; "Aprobado"; "Reprobado")</strong> evalúa una condición lógica. Si la condición se cumple, la computadora escribe "Aprobado"; si es menor a 3.0, escribe "Reprobado" automáticamente sin que tengas que revisar uno a uno.
            </p>
          )}

          <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              Tip para celular: Puedes instalar <strong>Google Sheets</strong> o <strong>Excel</strong> de forma 100% gratuita desde la Play Store o App Store.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
