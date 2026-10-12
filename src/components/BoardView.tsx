import {
  Plus,
  Minus,
  MoreHorizontal,
  Flag,
  RefreshCw,
  ArrowRight,
  Layers,
  Repeat2,
  LockKeyhole,
  ThumbsUp,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { type Note, type Column, columns } from '@/data/mock';

export type Phase = 'Dodawanie' | 'Omawianie' | 'Głosowanie' | 'Dyskusja';

interface BoardViewProps {
  phase: Phase;
  phaseIndex: number;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  votes: Record<number, number>;
  vote: (id: number, delta: number) => void;
  remaining: number;
  identity: string;
  onAddNote: (columnIndex: number) => void;
  onAddAction: () => void;
  notify: (text: string) => void;
}

const toneStyles: Record<
  string,
  { header: string; border: string; accent: string; addBtn: string; noteBg: string }
> = {
  good: {
    header: 'text-emerald-400',
    border: 'border-emerald-500/20',
    accent: 'bg-emerald-500',
    addBtn: 'text-emerald-400/70 hover:bg-emerald-500/10 hover:text-emerald-400',
    noteBg: 'from-emerald-500/[0.06] to-transparent',
  },
  improve: {
    header: 'text-rose-400',
    border: 'border-rose-500/20',
    accent: 'bg-rose-500',
    addBtn: 'text-rose-400/70 hover:bg-rose-500/10 hover:text-rose-400',
    noteBg: 'from-rose-500/[0.06] to-transparent',
  },
  kudos: {
    header: 'text-amber-400',
    border: 'border-amber-500/20',
    accent: 'bg-amber-500',
    addBtn: 'text-amber-400/70 hover:bg-amber-500/10 hover:text-amber-400',
    noteBg: 'from-amber-500/[0.06] to-transparent',
  },
};

const columnIcons: Record<string, LucideIcon> = {
  good: ThumbsUp,
  improve: Flag,
  kudos: Star,
};

function ColumnIcon({ tone }: { tone: string }) {
  const Icon = columnIcons[tone] || Flag;
  return <Icon />;
}

export function BoardView({
  phase,
  phaseIndex,
  notes,
  setNotes,
  votes,
  vote,
  remaining,
  identity,
  onAddNote,
  onAddAction,
  notify,
}: BoardViewProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeNote, setActiveNote] = useState(5);

  const firstName = identity.split(' ')[0] ?? identity;

  const sortedNotes = (colIndex: number) =>
    notes
      .filter((n) => n.column === colIndex)
      .sort((a, b) => (phaseIndex === 3 ? b.votes - a.votes : 0));

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 pt-2">
      <div className="flex gap-4 min-h-full">
        {columns.map((col: Column, index: number) => {
          const tone = toneStyles[col.tone];
          const colNotes = sortedNotes(index);
          return (
            <section
              key={col.name}
              className={`flex-1 min-w-[280px] max-w-[400px] flex flex-col rounded-2xl border ${tone.border} overflow-hidden`}
              style={{ background: 'rgba(13, 40, 64, 0.35)' }}
            >
              <div className={`px-4 py-3 border-b ${tone.border} bg-gradient-to-b ${tone.noteBg}`}>
                <div className="flex items-center gap-2">
                  <span className={`${tone.header}`}>
                    <ColumnIcon tone={col.tone} />
                  </span>
                  <h3 className={`font-display font-semibold text-sm ${tone.header}`}>
                    {col.name}
                  </h3>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-ocean-deep/50 text-cyan-200/60">
                    {colNotes.length}
                  </span>
                </div>
                <p className="text-xs text-cyan-200/40 mt-1">{col.subtitle}</p>
              </div>

              <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
                {phaseIndex === 0 && (
                  <p className="text-[11px] text-cyan-300/30 italic px-1 pb-1">
                    Karteczki innych są zasłonięte. Pisz śmiało.
                  </p>
                )}
                {colNotes.map((note) => {
                  const isOwn = note.author === firstName;
                  const isHidden = phaseIndex === 0 && !isOwn;
                  const isActive = phaseIndex === 3 && activeNote === note.id;
                  const myVotes = votes[note.id] || 0;

                  return (
                    <article
                      key={note.id}
                      className={`rounded-xl p-3 border transition-all note-anim ${
                        isHidden
                          ? 'bg-ocean-deep/40 border-cyan-900/20'
                          : isActive
                            ? 'bg-teal-500/10 border-teal-400/40 ring-2 ring-teal-400/30 pulse-glow'
                            : `bg-ocean-deep/50 border-cyan-900/30 hover:border-cyan-700/40`
                      }`}
                    >
                      {isHidden ? (
                        <div className="flex items-center gap-2 py-1">
                          <span className="w-2 h-2 rounded-full bg-cyan-600/50" />
                          <span className="text-xs text-cyan-300/40">
                            {note.author} coś napisał/a
                          </span>
                          <LockKeyhole size={11} className="ml-auto text-cyan-600/40" />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <p className="flex-1 text-sm text-cyan-50/90 leading-relaxed">
                              {note.text}
                            </p>
                            {note.recurring && (
                              <span
                                className="flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0"
                                title={`Temat wraca po raz ${note.recurringCount}`}
                              >
                                <Repeat2 size={10} />
                                {note.recurringCount}x
                              </span>
                            )}
                          </div>

                          {note.grouped && note.grouped.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-cyan-900/20">
                              <button
                                onClick={() =>
                                  setExpanded(expanded === note.id ? null : note.id)
                                }
                                className="flex items-center gap-1 text-xs text-cyan-300/50 hover:text-cyan-300/80 transition-colors"
                              >
                                <Layers size={12} />
                                {note.grouped.length + 1} połączone karteczki
                              </button>
                              {expanded === note.id && (
                                <div className="mt-2 space-y-1.5 slide-up">
                                  {note.grouped.map((g, i) => (
                                    <div
                                      key={i}
                                      className="text-xs text-cyan-200/60 bg-ocean-deep/40 rounded-lg px-2 py-1.5"
                                    >
                                      {g}
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const extras = note.grouped!.map((text, i) => ({
                                        id: note.id * 100 + i,
                                        column: note.column,
                                        text,
                                        author: note.author,
                                        initials: note.initials,
                                        votes: 0,
                                      }));
                                      setNotes([
                                        ...notes.filter((n) => n.id !== note.id),
                                        ...extras,
                                      ]);
                                      notify('Grupa rozdzielona');
                                    }}
                                    className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors mt-1"
                                  >
                                    Rozdziel grupę
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-2.5 flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white ${
                                  col.tone === 'good'
                                    ? 'bg-emerald-500'
                                    : col.tone === 'improve'
                                      ? 'bg-rose-500'
                                      : 'bg-amber-500'
                                }`}
                              >
                                {note.initials}
                              </span>
                              <span className="text-xs text-cyan-300/50">{note.author}</span>
                            </div>

                            <div className="ml-auto flex items-center gap-1">
                              {phaseIndex === 2 && col.canVote ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => vote(note.id, -1)}
                                    disabled={!myVotes}
                                    className="w-6 h-6 rounded-md flex items-center justify-center text-cyan-300/60 hover:text-cyan-100 hover:bg-cyan-800/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                    title="Cofnij głos"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span
                                    className={`text-sm font-bold w-5 text-center ${
                                      myVotes > 0 ? 'text-teal-400 vote-bounce' : 'text-cyan-300/40'
                                    }`}
                                  >
                                    {myVotes}
                                  </span>
                                  <button
                                    onClick={() => vote(note.id, 1)}
                                    disabled={remaining === 0}
                                    className="w-6 h-6 rounded-md flex items-center justify-center text-teal-400 hover:text-teal-300 hover:bg-teal-500/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                    title="Dodaj głos"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                              ) : phaseIndex === 3 && col.canVote ? (
                                <span className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                                  <Flag size={11} />
                                  {note.votes + myVotes}
                                </span>
                              ) : (
                                <button
                                  onClick={() => {
                                    if (isOwn) {
                                      setNotes(notes.filter((n) => n.id !== note.id));
                                      notify('Karteczka usunięta');
                                    } else {
                                      notify('Możesz edytować tylko swoje karteczki.');
                                    }
                                  }}
                                  className="w-6 h-6 rounded-md flex items-center justify-center text-cyan-300/30 hover:text-cyan-300/60 hover:bg-cyan-800/30 transition-all opacity-0 group-hover:opacity-100"
                                  title="Opcje karteczki"
                                >
                                  <MoreHorizontal size={14} />
                                </button>
                              )}
                            </div>
                          </div>

                          {phaseIndex === 3 && isActive && (
                            <div className="mt-2 pt-2 border-t border-cyan-900/20 flex items-center gap-2 slide-up">
                              <button
                                onClick={onAddAction}
                                className="flex items-center gap-1 text-xs font-medium text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 px-2 py-1 rounded-lg transition-all"
                              >
                                <Plus size={12} />
                                Action item
                              </button>
                              <button
                                onClick={() => {
                                  const nextIdx =
                                    (colNotes.findIndex((n) => n.id === activeNote) + 1) %
                                    colNotes.length;
                                  setActiveNote(colNotes[nextIdx]?.id || 5);
                                }}
                                className="ml-auto flex items-center gap-1 text-xs text-cyan-300/50 hover:text-cyan-300/80 px-2 py-1 rounded-lg hover:bg-cyan-800/20 transition-all"
                                title="Następny temat"
                              >
                                Następny
                                <ArrowRight size={12} />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </article>
                  );
                })}

                <button
                  onClick={() => onAddNote(index)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border border-dashed border-cyan-800/30 ${tone.addBtn}`}
                >
                  <Plus size={15} />
                  Dodaj karteczkę
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <footer className="mt-4 flex items-center justify-between text-[11px] text-cyan-300/30 px-1">
        <span className="flex items-center gap-1">
          <LockKeyhole size={11} />
          Tylko dla członków Product team
        </span>
        <span className="font-display tracking-wide">Małe kroki. Lepszy zespół.</span>
      </footer>
    </div>
  );
}
