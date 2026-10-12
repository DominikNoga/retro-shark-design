export type Phase = 'Dodawanie' | 'Omawianie' | 'Głosowanie' | 'Dyskusja';

export interface Note {
  id: number;
  column: number;
  text: string;
  author: string;
  initials: string;
  votes: number;
  recurring?: boolean;
  recurringCount?: number;
  grouped?: string[];
}

export interface ActionItem {
  id: number;
  text: string;
  owner: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione' | 'Porzucone';
  sprint: string;
}

export interface RetroSummary {
  sprint: string;
  date: string;
  moderator: string;
  brief: string;
}

export interface Column {
  name: string;
  subtitle: string;
  tone: 'good' | 'improve' | 'kudos';
  canVote: boolean;
  hasActions: boolean;
}

export const members = [
  'Dominik Noga',
  'Julia Kowalska',
  'Michał Nowak',
  'Anna Wiśniewska',
  'Piotr Zieliński',
  'Kasia Wójcik',
];

export const columns: Column[] = [
  { name: 'Went well', subtitle: 'Co poszło dobrze?', tone: 'good', canVote: false, hasActions: false },
  { name: 'To improve', subtitle: 'Co możemy poprawić?', tone: 'improve', canVote: true, hasActions: true },
  { name: 'Kudos', subtitle: 'Doceniamy siebie nawzajem', tone: 'kudos', canVote: false, hasActions: false },
];

export const phases: Phase[] = ['Dodawanie', 'Omawianie', 'Głosowanie', 'Dyskusja'];

export const initialNotes: Note[] = [
  { id: 1, column: 0, text: 'Nowy proces release\'ów działa super. W końcu wdrażamy bez stresu', author: 'Julia', initials: 'JK', votes: 0 },
  { id: 2, column: 0, text: 'Dobra współpraca design + dev przy nowym onboardingu.', author: 'Dominik', initials: 'DN', votes: 0 },
  { id: 3, column: 0, text: 'Dowieziony cel sprintu, mimo zmian w trakcie', author: 'Michał', initials: 'MN', votes: 0 },
  { id: 4, column: 0, text: 'Pair programming pomógł nam szybciej zamknąć trudniejsze taski.', author: 'Anna', initials: 'AW', votes: 0 },
  { id: 5, column: 1, text: 'Code review nadal trwa za długo. PR-y czekają czasem po 2 dni.', author: 'Dominik', initials: 'DN', votes: 8, recurring: true, recurringCount: 3, grouped: ['Za dużo PR-ów w kolejce, trudno znaleźć czas na review.', 'Brakuje nam jasnych zasad dotyczących review.'] },
  { id: 6, column: 1, text: 'Za dużo spotkań w środku dnia. Trudno o dłuższy blok na skupienie.', author: 'Anna', initials: 'AW', votes: 5, recurring: true, recurringCount: 2 },
  { id: 7, column: 1, text: 'Niektóre zadania trafiają do sprintu bez jasnych kryteriów akceptacji.', author: 'Piotr', initials: 'PZ', votes: 3 },
  { id: 8, column: 2, text: 'Dzięki Julii za świetne makiety i szybki feedback!', author: 'Kasia', initials: 'KW', votes: 0 },
  { id: 9, column: 2, text: 'Michał, dzięki za pomoc z debugowaniem tego nieszczęsnego API', author: 'Dominik', initials: 'DN', votes: 0 },
  { id: 10, column: 2, text: 'Kudos dla całego zespołu za wspólne dowiezienie onboardingu', author: 'Julia', initials: 'JK', votes: 0 },
];

export const initialActions: ActionItem[] = [
  { id: 1, text: 'Wprowadzić limit 2 PR-ów w kolejce na osobę', owner: 'Dominik Noga', status: 'Do zrobienia', sprint: 'Sprint 41' },
  { id: 2, text: 'Zarezerwować bloki focus time w kalendarzu', owner: 'Anna Wiśniewska', status: 'W trakcie', sprint: 'Sprint 41' },
  { id: 3, text: 'Spisać checklistę przed releasem', owner: 'Michał Nowak', status: 'Zrobione', sprint: 'Sprint 41' },
  { id: 4, text: 'Uporządkować proces onboardingowy', owner: 'Julia Kowalska', status: 'Zrobione', sprint: 'Sprint 40' },
  { id: 5, text: 'Zmniejszyć liczbę spotkań statusowych', owner: 'Piotr Zieliński', status: 'Porzucone', sprint: 'Sprint 40' },
];

export const retroHistory: RetroSummary[] = [
  { sprint: 'Sprint 42', date: '12 października 2026', moderator: 'Dominik Noga', brief: 'Code review, za dużo spotkań, dobre kudosy dla zespołu.' },
  { sprint: 'Sprint 41', date: '28 września 2026', moderator: 'Anna Wiśniewska', brief: 'Proces release\'ów, onboarding, focus time.' },
  { sprint: 'Sprint 40', date: '14 września 2026', moderator: 'Dominik Noga', brief: 'Limit PR-ów, spotkania statusowe, checklista release.' },
  { sprint: 'Sprint 39', date: '31 sierpnia 2026', moderator: 'Kasia Wójcik', brief: 'Onboarding, dokumentacja API, poprawa komunikacji.' },
  { sprint: 'Sprint 38', date: '17 sierpnia 2026', moderator: 'Michał Nowak', brief: 'Code review trwa za długo — pierwszy raz na stole.' },
  { sprint: 'Sprint 37', date: '3 sierpnia 2026', moderator: 'Dominik Noga', brief: 'Współpraca design+dev, testy E2E, dowieziony cel.' },
];

export const initialSummary = `CO POSZŁO DOBRZE
Nowy proces release'ów i współpraca design + dev pomogły zespołowi dowieźć cel sprintu. Pair programming usprawnił pracę nad trudniejszymi zadaniami.

TEMATY DO POPRAWY
1. Code review — 8 głosów. Temat powraca po raz trzeci. Zespół ustalił codzienny blok na review.
2. Zbyt wiele spotkań — 5 głosów. Potrzebujemy dłuższych bloków pracy w skupieniu.
3. Kryteria akceptacji — 3 głosy. Doprecyzujemy zadania przed planowaniem.

KUDOS
Podziękowania dla Julii za makiety, Michała za wsparcie w debugowaniu oraz całego zespołu za onboarding.

Z POPRZEDNIEGO RETRO
Checklista release'u: zrobione. Focus time: w trakcie. Limit PR-ów: do zrobienia.`;
