import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  ChevronDown,
  History,
  CircleCheck,
  RefreshCw,
  Repeat2,
  Sparkles,
  Timer,
  Layers,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';
import { type ActionItem, type Phase } from '@/data/mock';

interface PhaseBarProps {
  phase: Phase;
  phaseIndex: number;
  setPhaseIndex: (i: number) => void;
  onFinish: () => void;
}

export function PhaseBar({ phase, phaseIndex, setPhaseIndex, onFinish }: PhaseBarProps) {
  const phases = ['Dodawanie', 'Omawianie', 'Głosowanie', 'Dyskusja'];
  const [timerRunning, setTimerRunning] = useState(false);

  return (
    <section className="px-6 py-3 border-b border-cyan-900/30 bg-ocean-dark/30 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {phases.map((name, i) => (
            <div key={name} className="flex items-center">
              <button
                onClick={() => setPhaseIndex(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  i === phaseIndex
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/25'
                    : i < phaseIndex
                      ? 'text-cyan-300/60 hover:bg-cyan-800/20'
                      : 'text-cyan-300/30 hover:bg-cyan-800/10'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    i === phaseIndex
                      ? 'bg-teal-500/20 text-teal-300'
                      : i < phaseIndex
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-cyan-900/40 text-cyan-300/40'
                  }`}
                >
                  {i < phaseIndex ? <Check size={11} /> : i + 1}
                </span>
                {name}
              </button>
              {i < 3 && <ChevronRight size={14} className="text-cyan-700/40 mx-0.5" />}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {phaseIndex === 2 && (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Pozostało <strong>3</strong> z 3 głosów
            </span>
          )}
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-cyan-300/60 hover:text-cyan-200 hover:bg-cyan-800/20 transition-all border border-cyan-800/30"
          >
            <Timer size={14} />
            {timerRunning ? '05:00' : 'Timer'}
          </button>
          <button
            onClick={() => setPhaseIndex(Math.max(0, phaseIndex - 1))}
            disabled={phaseIndex === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-300/60 hover:text-cyan-200 hover:bg-cyan-800/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            title="Cofnij fazę"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => (phaseIndex < 3 ? setPhaseIndex(phaseIndex + 1) : onFinish())}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-400 hover:to-cyan-500 transition-all shadow-lg shadow-teal-500/20"
          >
            {phaseIndex === 3 ? 'Zakończ retro' : 'Następna faza'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

interface PreviousRetroProps {
  actions: ActionItem[];
  setActions: React.Dispatch<React.SetStateAction<ActionItem[]>>;
  notify: (text: string) => void;
}

export function PreviousRetro({ actions, setActions, notify }: PreviousRetroProps) {
  const [show, setShow] = useState(true);
  const openItems = actions.filter(
    (a) => a.status !== 'Zrobione' && a.status !== 'Porzucone',
  );

  return (
    <div className="mb-3">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass border border-cyan-900/30">
        <History size={16} className="text-amber-400" />
        <strong className="text-sm text-cyan-100">Z poprzedniego retro</strong>
        <span className="text-xs text-cyan-300/50">
          {openItems.length} otwarte ustalenia
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-ocean-deep/50 text-cyan-300/40">
          Sprint 41
        </span>
        <button
          onClick={() => setShow(!show)}
          className="ml-auto flex items-center gap-1 text-xs text-cyan-300/60 hover:text-cyan-200 transition-colors"
        >
          {show ? 'Zwiń' : 'Przejrzyj ustalenia'}
          <ChevronDown
            size={14}
            className={`transition-transform ${show ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {show && (
        <div className="mt-2 space-y-1.5 slide-up">
          {actions.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-ocean-deep/40 border border-cyan-900/20 hover:border-cyan-800/40 transition-all"
            >
              <CircleCheck
                size={15}
                className={
                  a.status === 'Zrobione'
                    ? 'text-emerald-400'
                    : a.status === 'W trakcie'
                      ? 'text-amber-400'
                      : a.status === 'Porzucone'
                        ? 'text-rose-400/50'
                        : 'text-cyan-300/40'
                }
              />
              <span
                className={`text-sm flex-1 ${
                  a.status === 'Porzucone'
                    ? 'text-cyan-300/30 line-through'
                    : 'text-cyan-100/80'
                }`}
              >
                {a.text}
              </span>
              <small className="text-xs text-cyan-300/40">{a.owner.split(' ')[0]}</small>
              <select
                aria-label={`Status: ${a.text}`}
                value={a.status}
                onChange={(e) =>
                  setActions(
                    actions.map((item) =>
                      item.id === a.id
                        ? { ...item, status: e.target.value as ActionItem['status'] }
                        : item,
                    ),
                  )
                }
                className={`text-xs px-2 py-1 rounded-md bg-ocean-deep/60 border border-cyan-900/30 cursor-pointer outline-none ${
                  a.status === 'Zrobione'
                    ? 'text-emerald-400'
                    : a.status === 'W trakcie'
                      ? 'text-amber-400'
                      : a.status === 'Porzucone'
                        ? 'text-rose-400/60'
                        : 'text-cyan-300/60'
                }`}
              >
                {['Do zrobienia', 'W trakcie', 'Zrobione', 'Porzucone'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface BriefingPanelProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function BriefingPanel({ show, onClose, onRefresh }: BriefingPanelProps) {
  const [showDetail, setShowDetail] = useState(false);

  if (!show) return null;

  return (
    <>
      <section className="mb-3 rounded-xl glass border border-teal-500/20 p-4 slide-up relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent shimmer-bg" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/15 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-teal-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <strong className="text-sm text-cyan-50">Nie zaczynamy od zera.</strong>
              <span className="text-[9px] font-bold tracking-widest text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                BRIEFING AI
              </span>
            </div>
            <p className="text-sm text-cyan-200/60 mt-1">
              <strong className="text-cyan-100">2 tematy wracają</strong> z poprzednich retro.
              Sprawdźmy, co już ustaliliśmy.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="flex items-center gap-1.5 text-xs text-cyan-200/70 hover:text-teal-400 bg-ocean-deep/40 hover:bg-teal-500/10 px-2.5 py-1 rounded-lg transition-all"
              >
                <Repeat2 size={13} className="text-amber-400" />
                Code review
                <span className="text-cyan-300/40">3. raz</span>
                <ArrowUpRight size={12} />
              </button>
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="flex items-center gap-1.5 text-xs text-cyan-200/70 hover:text-teal-400 bg-ocean-deep/40 hover:bg-teal-500/10 px-2.5 py-1 rounded-lg transition-all"
              >
                <Repeat2 size={13} className="text-amber-400" />
                Za dużo spotkań
                <span className="text-cyan-300/40">2. raz</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onRefresh}
              className="flex items-center gap-1 text-xs text-cyan-300/50 hover:text-teal-400 px-2 py-1 rounded-lg hover:bg-teal-500/10 transition-all"
            >
              <RefreshCw size={13} />
              Odśwież
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-cyan-300/40 hover:text-cyan-200 hover:bg-cyan-800/30 transition-all"
              title="Zamknij briefing"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </section>

      {showDetail && (
        <div className="mb-3 rounded-xl bg-ocean-deep/50 border border-amber-500/20 p-3 flex items-start gap-3 slide-up">
          <Repeat2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-sm text-cyan-100">Code review trwa za długo</strong>
            <p className="text-xs text-cyan-200/50 mt-1 leading-relaxed">
              Temat wraca ze Sprintu 40 i 38. Ustaliliśmy limit 2 PR-ów w kolejce na osobę.
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400">
                Do zrobienia
              </span>
              <span className="text-cyan-300/40">
                Poprzednie rozwiązanie nie zostało jeszcze wdrożone.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface PageHeadingProps {
  title: string;
  identity: string;
  onShare: () => void;
}

export function PageHeading({ title, identity, onShare }: PageHeadingProps) {
  return (
    <section className="px-6 py-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-display font-bold text-2xl text-cyan-50 text-glow">
            {title}
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 pulse-glow" />
            W toku
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-cyan-300/50">
          <span className="flex items-center gap-1">
            <Clock3 size={13} />
            12 października 2026
          </span>
          <span className="text-cyan-700/40">·</span>
          <span>Moderator: {identity.split(' ')[0]}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {['DN', 'JK', 'MN', 'AW'].map((a, i) => (
            <span
              key={a}
              className={`w-8 h-8 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-ocean-dark ${
                ['bg-teal-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'][i % 4]
              }`}
              title={['Dominik Noga', 'Julia Kowalska', 'Michał Nowak', 'Anna Wiśniewska'][i]}
            >
              {a}
            </span>
          ))}
          <span className="w-8 h-8 rounded-full bg-ocean-deep border-2 border-ocean-dark text-[10px] font-bold flex items-center justify-center text-cyan-300/50">
            +2
          </span>
        </div>
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg text-cyan-200 hover:text-cyan-100 border border-cyan-800/40 hover:bg-cyan-800/20 transition-all"
        >
          <Layers size={15} />
          Udostępnij
        </button>
      </div>
    </section>
  );
}
