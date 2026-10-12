import { useState } from 'react';
import {
  Check,
  Copy,
  Link2,
  Plus,
  X,
  CircleCheck,
} from 'lucide-react';
import { members, columns } from '@/data/mock';

export type ModalType =
  | 'note'
  | 'action'
  | 'new'
  | 'share'
  | 'identity'
  | null;

interface ModalProps {
  type: ModalType;
  onClose: () => void;
  column: number;
  identity: string;
  setIdentity: (s: string) => void;
  owner: string;
  setOwner: (s: string) => void;
  draft: string;
  setDraft: (s: string) => void;
  submit: () => void;
  notify: (text: string) => void;
}

export function Modal({
  type,
  onClose,
  column,
  identity,
  setIdentity,
  owner,
  setOwner,
  draft,
  setDraft,
  submit,
  notify,
}: ModalProps) {
  if (!type) return null;

  const titles: Record<string, string> = {
    note: `Dodaj karteczkę · ${columns[column]?.name ?? 'Went well'}`,
    action: 'Nowy action item',
    new: 'Nowa retrospektywa',
    share: 'Zaproś zespół do retro',
    identity: 'Kim jesteś?',
  };

  const descriptions: Record<string, string> = {
    share: 'Product team — Sprint 42',
    identity: 'Wybierz siebie z listy członków zespołu.',
  };

  return (
    <div
      className="fixed inset-0 bg-ocean-deep/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="glass rounded-2xl border border-cyan-700/30 p-6 w-full max-w-md mx-4 slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-lg text-cyan-50">{titles[type]}</h2>
            {descriptions[type] && (
              <p className="text-sm text-cyan-300/50 mt-0.5">{descriptions[type]}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-300/40 hover:text-cyan-200 hover:bg-cyan-800/30 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {type === 'share' && (
          <>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-ocean-deep/50 border border-cyan-900/30 mb-3">
              <Link2 size={16} className="text-cyan-300/50" />
              <span className="text-sm text-cyan-200/70 flex-1">
                retroshark.app/product/sprint-42
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
                  notify('Link skopiowany');
                }}
                className="w-7 h-7 rounded-md flex items-center justify-center text-cyan-300/50 hover:text-teal-400 hover:bg-teal-500/10 transition-all"
                title="Kopiuj link"
              >
                <Copy size={14} />
              </button>
            </div>
            <button
              onClick={() => {
                onClose();
                notify('Link skopiowany — możesz udostępnić go zespołowi.');
              }}
              className="w-full flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-400 hover:to-cyan-500 transition-all"
            >
              <Copy size={16} />
              Kopiuj link
            </button>
          </>
        )}

        {type === 'identity' && (
          <div className="space-y-1.5 max-h-80 overflow-y-auto scrollbar-thin">
            {members.map((m) => {
              const initials = m.split(' ').map((s) => s[0]).join('');
              return (
                <button
                  key={m}
                  onClick={() => {
                    setIdentity(m);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    identity === m
                      ? 'bg-teal-500/15 border border-teal-500/20'
                      : 'hover:bg-cyan-800/20 border border-transparent'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-xs font-bold flex items-center justify-center text-white">
                    {initials}
                  </span>
                  <span className={`text-sm ${identity === m ? 'text-teal-300' : 'text-cyan-100/80'}`}>
                    {m}
                  </span>
                  {identity === m && <Check size={16} className="ml-auto text-teal-400" />}
                </button>
              );
            })}
          </div>
        )}

        {(type === 'note' || type === 'action' || type === 'new') && (
          <>
            <label className="block mb-3">
              <span className="text-xs text-cyan-300/60 mb-1.5 block">
                {type === 'new' ? 'Nazwa retro' : 'Treść'}
              </span>
              {type === 'new' ? (
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="np. Sprint 43"
                  className="w-full rounded-lg bg-ocean-deep/50 border border-cyan-900/30 px-3 py-2.5 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
                />
              ) : (
                <textarea
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={
                    type === 'action' ? 'Co konkretnie zrobimy?' : 'Podziel się swoimi przemyśleniami...'
                  }
                  className="w-full h-28 rounded-lg bg-ocean-deep/50 border border-cyan-900/30 px-3 py-2.5 text-sm text-cyan-100 outline-none focus:border-teal-500/40 resize-none scrollbar-thin"
                />
              )}
            </label>
            {type === 'action' && (
              <label className="block mb-3">
                <span className="text-xs text-cyan-300/60 mb-1.5 block">Właściciel</span>
                <select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full rounded-lg bg-ocean-deep/50 border border-cyan-900/30 px-3 py-2.5 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
                >
                  {members.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
            )}
            {type === 'new' && (
              <label className="block mb-4">
                <span className="text-xs text-cyan-300/60 mb-1.5 block">Data</span>
                <input
                  type="date"
                  defaultValue="2026-10-12"
                  className="w-full rounded-lg bg-ocean-deep/50 border border-cyan-900/30 px-3 py-2.5 text-sm text-cyan-100 outline-none focus:border-teal-500/40"
                />
              </label>
            )}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={onClose}
                className="text-sm px-4 py-2 rounded-lg text-cyan-300/60 hover:text-cyan-200 hover:bg-cyan-800/20 transition-all"
              >
                Anuluj
              </button>
              <button
                disabled={!draft.trim()}
                onClick={submit}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-400 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Plus size={15} />
                {type === 'new' ? 'Utwórz retro' : 'Dodaj'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function Toast({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl glass border border-teal-500/30 text-sm text-cyan-50 slide-up shadow-xl shadow-ocean-deep/50">
      <CircleCheck size={18} className="text-teal-400" />
      {text}
    </div>
  );
}
