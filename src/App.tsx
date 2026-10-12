import { useState } from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { OceanBackground } from '@/components/OceanBackground';
import { Sidebar, type ViewType } from '@/components/Sidebar';
import { BoardView } from '@/components/BoardView';
import {
  PhaseBar,
  PreviousRetro,
  BriefingPanel,
  PageHeading,
} from '@/components/BoardSections';
import {
  SummaryView,
  ActionsView,
  HistoryView,
  TeamView,
  SettingsView,
} from '@/components/SecondaryViews';
import { Modal, Toast, type ModalType } from '@/components/Modal';
import {
  initialNotes,
  initialActions,
  initialSummary,
  members,
  type Note,
  type ActionItem,
  type Phase,
} from '@/data/mock';

function App() {
  const [view, setView] = useState<ViewType>('board');
  const [phaseIndex, setPhaseIndex] = useState(1);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [identity, setIdentity] = useState<string>(members[0] ?? 'Dominik Noga');
  const [title, setTitle] = useState('Sprint 42');
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [summary, setSummary] = useState(initialSummary);
  const [approved, setApproved] = useState(false);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<ModalType>(null);
  const [draft, setDraft] = useState('');
  const [column, setColumn] = useState(0);
  const [owner, setOwner] = useState<string>(members[0] ?? 'Dominik Noga');
  const [showBriefing, setShowBriefing] = useState(true);

  const remaining = 3 - Object.values(votes).reduce((a, b) => a + b, 0);
  const phase: Phase = (['Dodawanie', 'Omawianie', 'Głosowanie', 'Dyskusja'] as Phase[])[phaseIndex];

  const notify = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(''), 3500);
  };

  const addNote = (index: number) => {
    setColumn(index);
    setDraft('');
    setModal('note');
  };

  const vote = (id: number, delta: number) => {
    if (delta > 0 && remaining === 0) return;
    setVotes({ ...votes, [id]: Math.max(0, (votes[id] || 0) + delta) });
  };

  const submit = () => {
    if (!draft.trim()) return;
    if (modal === 'note') {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: draft,
          column,
          author: identity.split(' ')[0] ?? identity,
          initials: identity.split(' ').map((s) => s[0]).join(''),
          votes: 0,
        },
      ]);
    }
    if (modal === 'action') {
      setActions([
        ...actions,
        { id: Date.now(), text: draft, owner, status: 'Do zrobienia', sprint: title },
      ]);
    }
    if (modal === 'new') {
      setTitle(draft);
      setNotes([]);
      setVotes({});
      setPhaseIndex(0);
      setView('board');
      setApproved(false);
    }
    setModal(null);
  };

  const openActionCount = actions.filter(
    (a) => a.status !== 'Zrobione' && a.status !== 'Porzucone',
  ).length;

  return (
    <div className="flex h-screen overflow-hidden relative">
      <OceanBackground />

      <Sidebar
        view={view}
        setView={setView}
        title={title}
        identity={identity}
        onNewRetro={() => {
          setDraft('');
          setModal('new');
        }}
        onSelectIdentity={() => setModal('identity')}
        openActionCount={openActionCount}
      />

      <div className="flex-1 flex flex-col h-screen relative z-10">
        <header className="flex items-center justify-between px-6 py-3 border-b border-cyan-900/30" style={{ background: 'rgba(13, 40, 64, 0.45)', backdropFilter: 'blur(6px)' }}>
          <div className="flex items-center gap-2 text-sm text-cyan-300/50">
            <span>Product team</span>
            <ChevronRight size={14} />
            <span>Retrospektywy</span>
            {view === 'board' && (
              <>
                <ChevronRight size={14} />
                <strong className="text-cyan-100">{title}</strong>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-cyan-300/50">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 pulse-glow" />
              Wszystko zapisane
            </span>
            <button
              onClick={() => notify('Jesteś moderatorem tego retro.')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-300/50 hover:text-cyan-200 hover:bg-cyan-800/30 transition-all"
              title="Opcje retrospektywy"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>

        {view === 'board' && (
          <>
            <PageHeading
              title={title}
              identity={identity}
              onShare={() => setModal('share')}
            />
            <PhaseBar
              phase={phase}
              phaseIndex={phaseIndex}
              setPhaseIndex={setPhaseIndex}
              onFinish={() => setView('summary')}
            />
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6">
              <PreviousRetro
                actions={actions}
                setActions={setActions}
                notify={notify}
              />
              <BriefingPanel
                show={showBriefing && phaseIndex > 0}
                onClose={() => setShowBriefing(false)}
                onRefresh={() => notify('Briefing jest aktualny. 2 tematy wracają.')}
              />
              <BoardView
                phase={phase}
                phaseIndex={phaseIndex}
                notes={notes}
                setNotes={setNotes}
                votes={votes}
                vote={vote}
                remaining={remaining}
                identity={identity}
                onAddNote={addNote}
                onAddAction={() => {
                  setDraft('');
                  setModal('action');
                }}
                notify={notify}
              />
            </div>
          </>
        )}

        {view === 'summary' && (
          <SummaryView
            summary={summary}
            setSummary={setSummary}
            approved={approved}
            setApproved={setApproved}
            actions={actions}
            notify={notify}
          />
        )}

        {view === 'actions' && (
          <ActionsView
            actions={actions}
            setActions={setActions}
            identity={identity}
          />
        )}

        {view === 'history' && <HistoryView />}

        {view === 'team' && (
          <TeamView
            identity={identity}
            setIdentity={setIdentity}
            notify={notify}
          />
        )}

        {view === 'settings' && <SettingsView notify={notify} />}
      </div>

      <Modal
        type={modal}
        onClose={() => setModal(null)}
        column={column}
        identity={identity}
        setIdentity={setIdentity}
        owner={owner}
        setOwner={setOwner}
        draft={draft}
        setDraft={setDraft}
        submit={submit}
        notify={notify}
      />

      <Toast text={toast} />
    </div>
  );
}

export default App;
