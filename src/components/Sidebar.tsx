import {
  ChevronDown,
  ChevronRight,
  Plus,
  ArrowRight,
  Users,
  ListChecks,
  Settings2,
  LayoutGrid,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SharkLogo } from './OceanBackground';
import { members } from '@/data/mock';

export type ViewType = 'board' | 'history' | 'summary' | 'actions' | 'team' | 'settings';

interface SidebarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  title: string;
  identity: string;
  onNewRetro: () => void;
  onSelectIdentity: () => void;
  openActionCount: number;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  view: ViewType;
  badge?: string;
}

export function Sidebar({
  view,
  setView,
  title,
  identity,
  onNewRetro,
  onSelectIdentity,
  openActionCount,
}: SidebarProps) {
  const navItems: NavItem[] = [
    { label: 'Retrospektywy', icon: LayoutGrid, view: 'history', badge: '12' },
    { label: 'Action itemy', icon: ListChecks, view: 'actions', badge: String(openActionCount) },
    { label: 'Zespół', icon: Users, view: 'team' },
    { label: 'Ustawienia', icon: Settings2, view: 'settings' },
  ];

  const isActive = (itemView: ViewType) => {
    if (itemView === 'history') return view === 'board' || view === 'history' || view === 'summary';
    return view === itemView;
  };

  const initials = identity.split(' ').map((s) => s[0]).join('');

  return (
    <aside className="flex flex-col w-64 h-screen border-r border-cyan-900/40 relative z-10" style={{ background: 'rgba(13, 40, 64, 0.45)', backdropFilter: 'blur(6px)' }}>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-ocean-deep flex items-center justify-center shadow-lg shadow-teal-500/20">
            <SharkLogo size={26} />
          </div>
          <div className="font-display font-bold text-xl text-cyan-50">
            Retro<span className="text-teal-400">Shark</span>
          </div>
        </div>
      </div>

      <div className="mx-3 mb-3 px-3 py-2.5 rounded-lg bg-ocean-dark/50 border border-cyan-900/30 flex items-center gap-2.5 cursor-pointer hover:bg-ocean-dark/70 transition-colors">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
          P
        </span>
        <div className="flex-1 min-w-0">
          <strong className="text-cyan-50 text-sm block truncate">Product team</strong>
          <small className="text-cyan-300/60 text-xs">Przestrzeń zespołu</small>
        </div>
        <ChevronDown size={15} className="text-cyan-300/50" />
      </div>

      <div className="px-5 mb-1">
        <div className="text-[10px] font-semibold tracking-widest text-cyan-300/40 uppercase">
          Przestrzeń zespołu
        </div>
      </div>

      <nav className="px-3 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.view);
          return (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/20'
                  : 'text-cyan-100/70 hover:bg-cyan-800/20 border border-transparent'
              }`}
            >
              <Icon size={17} className={active ? 'text-teal-400' : ''} />
              {item.label}
              {item.badge && (
                <span
                  className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                    active
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'bg-cyan-900/40 text-cyan-300/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 px-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-[10px] font-semibold tracking-widest text-cyan-300/40 uppercase">
            Ostatnie retro
          </div>
          <button
            onClick={onNewRetro}
            className="w-5 h-5 rounded flex items-center justify-center text-cyan-300/50 hover:text-teal-400 hover:bg-teal-500/10 transition-all"
            title="Nowe retro"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-0.5">
          {[
            { name: title, live: true },
            { name: 'Sprint 41', live: false },
            { name: 'Sprint 40', live: false },
          ].map((r, i) => (
            <button
              key={r.name}
              onClick={() => setView(i === 0 ? 'board' : 'summary')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                i === 0 && view === 'board'
                  ? 'bg-cyan-800/30 text-cyan-50'
                  : 'text-cyan-100/60 hover:bg-cyan-800/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  r.live ? 'bg-teal-400 pulse-glow' : 'bg-cyan-700/40'
                }`}
              />
              {r.name}
              {r.live && (
                <span className="ml-auto text-[9px] font-bold uppercase tracking-wide text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                  W toku
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setView('history')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-cyan-300/50 hover:text-teal-400 transition-colors"
          >
            Wszystkie retrospektywy
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="mt-auto px-3 pb-3">
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-ocean-dark/60 to-ocean-deep/60 border border-cyan-900/30 relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-teal-400 mb-1">
            <Sparkles size={14} />
            <span className="text-xs font-semibold">Pamięć ustaleń</span>
          </div>
          <p className="text-[11px] text-cyan-200/50 leading-relaxed">
            Wasze ustalenia zostają. Kolejne retro zaczyna się krok dalej.
          </p>
          <div className="mt-2 flex gap-1">
            <span className="h-0.5 flex-1 bg-gradient-to-r from-teal-500/40 to-transparent rounded-full" />
            <span className="h-0.5 flex-1 bg-gradient-to-r from-teal-500/30 to-transparent rounded-full" />
            <span className="h-0.5 flex-1 bg-gradient-to-r from-teal-500/20 to-transparent rounded-full" />
          </div>
        </div>
        <button
          onClick={onSelectIdentity}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-cyan-800/20 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </span>
          <div className="flex-1 text-left min-w-0">
            <strong className="text-cyan-50 text-sm block truncate">{identity}</strong>
            <small className="text-teal-400 text-xs">Moderator</small>
          </div>
          <ChevronDown size={15} className="text-cyan-300/40" />
        </button>
      </div>
    </aside>
  );
}
