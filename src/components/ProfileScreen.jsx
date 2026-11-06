import { LANGUAGES } from "../data/i18n";
import { VENUE } from "../data/venue";
import { useI18n } from "../hooks/useI18n";
import { BellIcon, ChevronIcon, ClockIcon, GlobeIcon, PhoneIcon, PinIcon, ShieldIcon, StarIcon } from "./Icons";
import { ALLERGEN_LABEL } from "./ProductSheet";
import { Segmented } from "./Segmented";

const LANGUAGE_NAME = { ca: "Català", es: "Castellano", en: "English", fr: "Français" };

export function ProfileScreen({ theme, onSetTheme, allergens, onOpenAllergens, alertsOn, onToggleAlerts, onRestart }) {
  const { t, lang, setLang } = useI18n();
  const allergenText = allergens.length ? allergens.map((code) => t(ALLERGEN_LABEL(code))).join(", ") : t("none");
  return (
    <div className="content">
      <h1 className="display page-title">{t("profileTitle")}</h1>

      <div className="card settings">
        <div className="setting">
          <span className="round-icon"><GlobeIcon /></span>
          <span className="grow"><b>{t("language")}</b></span>
        </div>
        <div className="lang wide">
          {LANGUAGES.map((code) => <button key={code} className={code === lang ? "on" : ""} onClick={() => setLang(code)}>{LANGUAGE_NAME[code]}</button>)}
        </div>
        <div className="setting">
          <span className="round-icon"><StarIcon /></span>
          <span className="grow"><b>{t("theme")}</b></span>
          <Segmented options={[{ id: "dark", label: t("themeDark") }, { id: "light", label: t("themeLight") }]} value={theme} onChange={onSetTheme} />
        </div>
        <button className="setting" onClick={onOpenAllergens}>
          <span className="round-icon"><ShieldIcon /></span>
          <span className="grow"><b>{t("myAllergens")}</b><small>{allergenText} · {t("myAllergensSub")}</small></span>
          <ChevronIcon />
        </button>
        <button className="setting" onClick={onToggleAlerts}>
          <span className="round-icon"><BellIcon /></span>
          <span className="grow"><b>{t("notifications")}</b><small>{t("notificationsSub")}</small></span>
          <span className={`switch ${alertsOn ? "on" : ""}`} aria-hidden="true"><i /></span>
        </button>
      </div>

      <div className="card settings">
        <div className="setting"><span className="round-icon"><PinIcon /></span><span className="grow"><b>{VENUE.name}</b><small>{VENUE.address}</small></span></div>
        <div className="setting"><span className="round-icon"><ClockIcon /></span><span className="grow"><b>{t("infoHours")}</b><small>{VENUE.hours} · {t("infoClosed")}</small></span></div>
        <a className="setting" href={`tel:${VENUE.phone}`}><span className="round-icon"><PhoneIcon /></span><span className="grow"><b>{t("call")}</b><small>{VENUE.phoneLabel}</small></span><ChevronIcon /></a>
      </div>

      <div className="card about">
        <b>{t("aboutDemo")}</b>
        <p className="fine-print">{t("aboutDemoSub")}</p>
        <button className="btn-outline" onClick={onRestart}>{t("restart")}</button>
      </div>
    </div>
  );
}
