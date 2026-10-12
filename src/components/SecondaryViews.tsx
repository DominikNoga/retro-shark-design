import {
  Check,
  CircleCheck,
  Send,
  Sparkles,
  RefreshCw,
  MessageSquare,
  FileText,
  ArrowRight,
  ListChecks,
  Filter,
  Users,
  Settings2,
  Plus,
  ChevronRight,
  History,
  Clock3,
} from 'lucide-react';
import { useState } from 'react';
import {
  type ActionItem,
  members,
  retroHistory,
  columns,
} from '@/data/mock';

interface SummaryViewProps {
  summary: string;
  setSummary: (s: string) => void;
  approved: boolean;
  setApproved: (b: boolean) => void;
  actions: ActionItem[];
  notify: (text: string) => void;
}

export function SummaryView({
  summary,
  setSummary,
  approved,
  setApproved,
  actions,
  notify,
}: SummaryViewProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
      <div className="eyebrow text-xs font-semibold tracking-widest text-teal-400/60 uppercase mb-1">
        Product Team
      </div>
      <h1 className="font-display font-bold text-2xl text-cyan-50 mb-4">Podsumowanie</h1>

      <div className="flex gap-6 max-w-6xl">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-cyan-900/30">
            <span className="flex items-center gap-1.5 text-sm text-cyan-100">
              <Sparkles size={18} className="text-teal-400" />
              Podsumowanie AI
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full border ${
                approved
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              }`}
            >
              {approved ? 'Zatwierdzone' : 'Szkic do zatwierdzenia'}
            </span>
          </div>

          <textarea
            className="w-full h-80 rounded-xl bg-ocean-deep/40 border border-cyan-900/30 p-4 text-sm text-cyan-100/90 leading-relaxed font-mono outline-none focus:border-teal-500/40 resize-none scrollbar-thin"
            aria-label="Podsumowanie retro"
            value={summary}
            readOnly={approved}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="rounded-xl bg-ocean-deep/40 border border-cyan-900/20 p-4">
            <h3 className="text-sm font-semibold text-cyan-200 mb-2 flex items-center gap-1.5">
              <ListChecks size={16} className="text-teal-400" />
              Nowe action itemy
            </h3>
            <div className="space-y-1.5">
              {actions.map((a) => (
                <div key={a.id} className="flex items-center gap-2 text-sm text-cyan-100/80">
                  <Check size={14} className="text-teal-400" />
                  {a.text}
                  <small className="ml-auto text-xs text-cyan-300/40">{a.owner}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-80 space-y-4">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-cyan-100">
            <Send size={18} className="text-teal-400" />
            Podziel się ustaleniami
          </h3>
          <p className="text-xs text-cyan-300/50 leading-relaxed">
            {approved
              ? 'Podsumowanie zostało zatwierdzone.'
              : 'Sprawdź podsumowanie przed wysłaniem do zespołu.'}
          </p>

          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">Dodatkowy kontekst</span>
            <textarea
              placeholder="Wnioski z dyskusji..."
              className="w-full h-20 rounded-lg bg-ocean-deep/40 border border-cyan-900/30 p-3 text-xs text-cyan-100 outline-none focus:border-teal-500/40 resize-none scrollbar-thin"
            />
          </label>

          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-ocean-deep/40 border border-cyan-900/20">
              <MessageSquare size={20} className="text-cyan-300/60" />
              <div className="flex-1">
                <strong className="text-sm text-cyan-100">Slack</strong>
                <small className="text-xs text-cyan-300/40 block">#product-team</small>
              </div>
              <Check size={16} className="text-emerald-400" />
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-ocean-deep/40 border border-cyan-900/20">
              <FileText size={20} className="text-cyan-300/60" />
              <div className="flex-1">
                <strong className="text-sm text-cyan-100">Confluence</strong>
                <small className="text-xs text-cyan-300/40 block">Product / Retrospektywy</small>
              </div>
              <Check size={16} className="text-emerald-400" />
            </div>
          </div>

          <button
            onClick={() => {
              setApproved(true);
              notify('Podsumowanie wysłane na Slacka i do Confluence.');
            }}
            disabled={approved}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20"
          >
            {approved ? (
              <>
                <CircleCheck size={16} />
                Zatwierdzono i wysłano
              </>
            ) : (
              <>
                <Send size={16} />
                Zatwierdź i wyślij
              </>
            )}
          </button>

          {approved && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 slide-up">
              Slack i Confluence · Eksport zakończony
              <Check size={14} />
            </p>
          )}

          <button
            onClick={() => {
              setApproved(false);
              notify('Wygenerowano nowy szkic podsumowania.');
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-cyan-300/60 hover:text-cyan-200 px-4 py-2 rounded-lg hover:bg-cyan-800/20 transition-all"
          >
            <RefreshCw size={14} />
            Wygeneruj ponownie
          </button>
        </aside>
      </div>
    </div>
  );
}

interface ActionsViewProps {
  actions: ActionItem[];
  setActions: React.Dispatch<React.SetStateAction<ActionItem[]>>;
  identity: string;
}

export function ActionsView({ actions, setActions, identity }: ActionsViewProps) {
  const [filter, setFilter] = useState('Wszystkie');
  const [mine, setMine] = useState(false);

  const filtered = actions.filter(
    (a) =>
      (filter === 'Wszystkie' || a.status === filter) &&
      (!mine || a.owner === identity),
  );

  const statusColor = (s: string) =>
    s === 'Zrobione'
      ? 'text-emerald-400'
      : s === 'W trakcie'
        ? 'text-amber-400'
        : s === 'Porzucone'
          ? 'text-rose-400/60'
          : 'text-cyan-300/60';

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
      <div className="eyebrow text-xs font-semibold tracking-widest text-teal-400/60 uppercase mb-1">
        Product Team
      </div>
      <h1 className="font-display font-bold text-2xl text-cyan-50 mb-1">Action itemy</h1>
      <p className="text-sm text-cyan-300/50 mb-4">
        Ustalenia z retrospektyw. Odhaczaj status, gdy coś zrobisz.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-cyan-300/50">
          <Filter size={14} />
          <button
            onClick={() => setFilter('Wszystkie')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filter === 'Wszystkie'
                ? 'bg-teal-500/15 text-teal-300'
                : 'hover:bg-cyan-800/20'
            }`}
          >
            Wszystkie
          </button>
          {['Do zrobienia', 'W trakcie', 'Zrobione', 'Porzucone'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === s
                  ? 'bg-teal-500/15 text-teal-300'
                  : 'hover:bg-cyan-800/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMine(!mine)}
          className={`ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
            mine
              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/20'
              : 'text-cyan-300/50 hover:bg-cyan-800/20 border border-transparent'
          }`}
        >
          <Users size={13} />
          Tylko moje
        </button>
      </div>

      <div className="rounded-xl border border-cyan-900/20 overflow-hidden">
        <div className="grid grid-cols-[1fr_160px_140px_100px] gap-3 px-4 py-2 text-[10px] font-semibold tracking-widest text-cyan-300/40 uppercase bg-ocean-deep/40 border-b border-cyan-900/20">
          <span>Action item</span>
          <span>Właściciel</span>
          <span>Status</span>
          <span>Retro</span>
        </div>
        {filtered.map((a) => (
          <div
            key={a.id}
            className="grid grid-cols-[1fr_160px_140px_100px] gap-3 px-4 py-3 items-center border-b border-cyan-900/10 hover:bg-cyan-800/10 transition-all"
          >
            <div className="flex items-center gap-2">
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
                className={`text-sm ${
                  a.status === 'Porzucone'
                    ? 'text-cyan-300/30 line-through'
                    : 'text-cyan-100/80'
                }`}
              >
                {a.text}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-[9px] font-bold flex items-center justify-center text-white">
                {a.owner.split(' ').map((s) => s[0]).join('')}
              </span>
              <span className="text-xs text-cyan-300/60">{a.owner.split(' ')[0]}</span>
            </div>
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
              className={`text-xs px-2 py-1 rounded-md bg-ocean-deep/60 border border-cyan-900/30 cursor-pointer outline-none ${statusColor(a.status)}`}
            >
              {['Do zrobienia', 'W trakcie', 'Zrobione', 'Porzucone'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <small className="text-xs text-cyan-300/40">{a.sprint}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HistoryView() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
      <div className="eyebrow text-xs font-semibold tracking-widest text-teal-400/60 uppercase mb-1">
        Product Team
      </div>
      <h1 className="font-display font-bold text-2xl text-cyan-50 mb-1">Retrospektywy</h1>
      <p className="text-sm text-cyan-300/50 mb-4">
        Historia spotkań zespołu. Każde retro w archiwum.
      </p>

      <div className="grid gap-3 max-w-4xl">
        {retroHistory.map((r, i) => (
          <button
            key={r.sprint}
            className="text-left rounded-xl bg-ocean-deep/40 border border-cyan-900/20 hover:border-teal-500/30 p-4 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  i === 0
                    ? 'bg-teal-500/15 border border-teal-500/20'
                    : 'bg-ocean-dark/50 border border-cyan-900/20'
                }`}
              >
                {i === 0 ? (
                  <span className="w-2 h-2 rounded-full bg-teal-400 pulse-glow" />
                ) : (
                  <History size={18} className="text-cyan-300/40" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-cyan-50">{r.sprint}</h3>
                  {i === 0 && (
                    <span className="text-[9px] font-bold uppercase tracking-wide text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                      W toku
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-300/40 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock3 size={11} />
                    {r.date}
                  </span>
                  <span>·</span>
                  <span>{r.moderator}</span>
                </div>
                <p className="text-sm text-cyan-200/50 mt-1.5">{r.brief}</p>
              </div>
              <ChevronRight
                size={18}
                className="text-cyan-300/30 group-hover:text-teal-400 transition-colors"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TeamView({
  identity,
  setIdentity,
  notify,
}: {
  identity: string;
  setIdentity: (s: string) => void;
  notify: (text: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
      <div className="eyebrow text-xs font-semibold tracking-widest text-teal-400/60 uppercase mb-1">
        Product Team
      </div>
      <h1 className="font-display font-bold text-2xl text-cyan-50 mb-1">Zespół</h1>
      <p className="text-sm text-cyan-300/50 mb-4">Członkowie zespołu Product team.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl">
        {members.map((m, i) => {
          const initials = m.split(' ').map((s) => s[0]).join('');
          const colors = [
            'from-teal-400 to-cyan-600',
            'from-emerald-400 to-teal-600',
            'from-amber-400 to-orange-600',
            'from-rose-400 to-pink-600',
          ];
          return (
            <div
              key={m}
              className="rounded-xl bg-ocean-deep/40 border border-cyan-900/20 p-4 hover:border-teal-500/30 transition-all"
            >
              <span
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % 4]} text-sm font-bold flex items-center justify-center text-white`}
              >
                {initials}
              </span>
              <h3 className="font-semibold text-cyan-50 mt-3">{m}</h3>
              <p className="text-xs text-cyan-300/40 mb-3">
                {i === 0 ? 'Moderator' : 'Członek zespołu'}
              </p>
              <button
                onClick={() => {
                  setIdentity(m);
                  notify(`Dołączono jako ${m}`);
                }}
                className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
              >
                Wybierz siebie
                <ArrowRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsView({ notify }: { notify: (text: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
      <div className="eyebrow text-xs font-semibold tracking-widest text-teal-400/60 uppercase mb-1">
        Product Team
      </div>
      <h1 className="font-display font-bold text-2xl text-cyan-50 mb-1">Ustawienia</h1>
      <p className="text-sm text-cyan-300/50 mb-4">
        Konfiguracja zespołu, integracji i szablonu retro.
      </p>

      <div className="max-w-2xl space-y-4">
        <section className="rounded-xl bg-ocean-deep/40 border border-cyan-900/20 p-5 space-y-3">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-cyan-100">
            <Users size={16} className="text-teal-400" />
            Informacje o zespole
          </h2>
          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">Nazwa zespołu</span>
            <input
              defaultValue="Product team"
              className="w-full rounded-lg bg-ocean-dark/50 border border-cyan-900/30 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
            />
          </label>
          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">Język podsumowań</span>
            <select
              defaultValue="Polski"
              className="w-full rounded-lg bg-ocean-dark/50 border border-cyan-900/30 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
            >
              <option>Polski</option>
              <option>English</option>
            </select>
          </label>
        </section>

        <section className="rounded-xl bg-ocean-deep/40 border border-cyan-900/20 p-5 space-y-3">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-cyan-100">
            <MessageSquare size={16} className="text-teal-400" />
            Integracje
          </h2>
          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">Kanał Slack</span>
            <input
              defaultValue="#product-team"
              className="w-full rounded-lg bg-ocean-dark/50 border border-cyan-900/30 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
            />
          </label>
          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">
              Strona nadrzędna w Confluence
            </span>
            <input
              defaultValue="Product / Retrospektywy"
              className="w-full rounded-lg bg-ocean-dark/50 border border-cyan-900/30 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
            />
          </label>
        </section>

        <section className="rounded-xl bg-ocean-deep/40 border border-cyan-900/20 p-5 space-y-3">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-cyan-100">
            <Settings2 size={16} className="text-teal-400" />
            Domyślny szablon
          </h2>
          <div className="flex gap-2">
            {columns.map((c) => (
              <span
                key={c.name}
                className={`text-xs px-3 py-1.5 rounded-lg border ${
                  c.tone === 'good'
                    ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
                    : c.tone === 'improve'
                      ? 'border-rose-500/20 text-rose-400 bg-rose-500/5'
                      : 'border-amber-500/20 text-amber-400 bg-amber-500/5'
                }`}
              >
                {c.name}
              </span>
            ))}
          </div>
          <label className="block">
            <span className="text-xs text-cyan-300/60 mb-1.5 block">Pula głosów</span>
            <input
              type="number"
              min={1}
              max={10}
              defaultValue={3}
              className="w-24 rounded-lg bg-ocean-dark/50 border border-cyan-900/30 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
            />
          </label>
        </section>

        <button
          onClick={() => notify('Zapisano ustawienia.')}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-400 hover:to-cyan-500 transition-all shadow-lg shadow-teal-500/20"
        >
          <Check size={16} />
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
}
