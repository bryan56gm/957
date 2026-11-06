// Stroke icons (24×24). Styled by the `.ico` rules in theme.css.
const Svg = ({ children }) => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;

export const HomeIcon = () => <Svg><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Svg>;
export const MenuIcon = () => <Svg><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6" /></Svg>;
export const ReceiptIcon = () => <Svg><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></Svg>;
export const UserIcon = () => <Svg><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>;
export const QrIcon = () => (
  <Svg>
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M14 14h3v3M21 14v.01M14 21h3M20 18v3" />
  </Svg>
);
export const BagIcon = () => <Svg><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></Svg>;
export const ClockIcon = () => <Svg><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const UsersIcon = () => <Svg><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></Svg>;
export const TableIcon = () => <Svg><path d="M3 9h18M5 9v11M19 9v11M8 9l1-5h6l1 5" /></Svg>;
export const SearchIcon = () => <Svg><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Svg>;
export const FilterIcon = () => <Svg><path d="M4 6h16M7 12h10M10 18h4" /></Svg>;
export const CloseIcon = () => <Svg><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const BackIcon = () => <Svg><path d="M15 5l-7 7 7 7" /></Svg>;
export const ChevronIcon = () => <Svg><path d="M9 6l6 6-6 6" /></Svg>;
export const CheckIcon = () => <Svg><path d="M5 12l5 5 9-10" /></Svg>;
export const PlusIcon = () => <Svg><path d="M12 5v14M5 12h14" /></Svg>;
export const MinusIcon = () => <Svg><path d="M5 12h14" /></Svg>;
export const FlameIcon = () => <Svg><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5" /></Svg>;
export const LeafIcon = () => <Svg><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l8-8" /></Svg>;
export const StarIcon = () => <Svg><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></Svg>;
export const PinIcon = () => <Svg><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>;
export const PhoneIcon = () => <Svg><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>;
export const BellIcon = () => <Svg><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></Svg>;
export const GlobeIcon = () => <Svg><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Svg>;
export const ShieldIcon = () => <Svg><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></Svg>;
export const RepeatIcon = () => <Svg><path d="M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5" /></Svg>;
export const MoonIcon = () => <svg className="ico moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg>;
export const SunIcon = () => (
  <svg className="ico sun" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const ShareIcon = () => <Svg><path d="M12 3v12M8 7l4-4 4 4" /><path d="M6 11H5v10h14V11h-1" /></Svg>;
export const PlusSquareIcon = () => <Svg><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M12 8v8M8 12h8" /></Svg>;
export const DotsIcon = () => <Svg><circle cx="12" cy="5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="19" r="1.4" /></Svg>;
export const DownloadIcon = () => <Svg><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></Svg>;
export const CardIcon = () => <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></Svg>;
export const WheatIcon = () => <Svg><path d="M12 21V9" /><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 13c3 0 5-2 5-5-3 0-5 2-5 5zM12 9c-2 0-3.5-1.5-3.5-4C10.5 5 12 6.5 12 9zM12 9c2 0 3.5-1.5 3.5-4-2 0-3.5 1.5-3.5 4z" /></Svg>;
export const CalendarIcon = () => <Svg><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>;

// The client's logo on a transparent background, reused wherever the app "signs" something.
export function AppLogo({ className = "" }) {
  return <img className={`app-logo ${className}`} src="/icons/logo.png" alt="" width="318" height="720" />;
}
