/**
 * 20 minimal outline SVG icons. Each returns a fragment of paths — the
 * outer <svg> comes from Icon.tsx.
 */

const Close = () => <path d="M6 6l12 12M18 6L6 18" />;
const Check = () => <path d="M5 12l5 5L20 7" />;
const ChevronDown = () => <path d="M6 9l6 6 6-6" />;
const ChevronUp = () => <path d="M6 15l6-6 6 6" />;
const ChevronLeft = () => <path d="M15 6l-6 6 6 6" />;
const ChevronRight = () => <path d="M9 6l6 6-6 6" />;
const Search = () => (
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </>
);
const Plus = () => <path d="M12 5v14M5 12h14" />;
const Minus = () => <path d="M5 12h14" />;
const Edit = () => (
  <>
    <path d="M4 20h4l10-10-4-4L4 16v4z" />
    <path d="M14 6l4 4" />
  </>
);
const Trash = () => (
  <>
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" />
    <path d="M9 7V4h6v3" />
  </>
);
const Info = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v5h1" />
  </>
);
const Warning = () => (
  <>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v5M12 18h.01" />
  </>
);
const ErrorIcon = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </>
);
const Success = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </>
);
const Eye = () => (
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
const EyeOff = () => (
  <>
    <path d="M3 3l18 18" />
    <path d="M10.5 6.2A10 10 0 0112 6c6.5 0 10 7 10 7a17.7 17.7 0 01-3.2 4.5" />
    <path d="M6.5 8A15 15 0 002 13s3.5 7 10 7c1.6 0 3-.3 4.2-.7" />
  </>
);
const Menu = () => (
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </>
);
const User = () => (
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0116 0v1" />
  </>
);
const Settings = () => (
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.34 1.86l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.86-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.06a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.86.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.86 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.06a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.86l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.86.34H9a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.06a1.7 1.7 0 001 1.55 1.7 1.7 0 001.86-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.86V9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.06a1.7 1.7 0 00-1.55 1z" />
  </>
);

export const icons = {
  close: Close,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  search: Search,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
  info: Info,
  warning: Warning,
  error: ErrorIcon,
  success: Success,
  eye: Eye,
  'eye-off': EyeOff,
  menu: Menu,
  user: User,
  settings: Settings,
} as const;

export type IconName = keyof typeof icons;
