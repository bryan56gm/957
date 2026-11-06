import { useI18n } from "../hooks/useI18n";
import { BagIcon, ChevronIcon, QrIcon, UsersIcon } from "./Icons";
import { Sheet } from "./Sheet";

const OPTIONS = [
  { id: "takeaway", Icon: BagIcon, title: "optTakeaway", sub: "optTakeawaySub" },
  { id: "table", Icon: QrIcon, title: "optTable", sub: "optTableSub" },
  { id: "waitlist", Icon: UsersIcon, title: "optWaitlist", sub: "optWaitlistSub" }
];

export function ModeSheet({ open, onClose, onChoose }) {
  const { t } = useI18n();
  return (
    <Sheet open={open} onClose={onClose}>
      <p className="display sheet-title">{t("modeNone")}</p>
      <div className="welcome-options in-sheet">
        {OPTIONS.map(({ id, Icon, title, sub }) => (
          <button key={id} className="welcome-option" onClick={() => onChoose(id)}>
            <span className="welcome-option-icon"><Icon /></span>
            <span className="grow"><b>{t(title)}</b><small>{t(sub)}</small></span>
            <ChevronIcon />
          </button>
        ))}
      </div>
    </Sheet>
  );
}
