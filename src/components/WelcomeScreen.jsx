import { LANGUAGES } from "../data/i18n";
import { useI18n } from "../hooks/useI18n";
import { greetingKey } from "../lib/clock";
import { BagIcon, ChevronIcon, QrIcon, UsersIcon } from "./Icons";
import { InstallBanner } from "./InstallBanner";
import { Photo } from "./Photo";
import { ThemeToggle } from "./ThemeToggle";

const OPTIONS = [
  { id: "takeaway", Icon: BagIcon, title: "optTakeaway", sub: "optTakeawaySub" },
  { id: "table", Icon: QrIcon, title: "optTable", sub: "optTableSub" },
  { id: "waitlist", Icon: UsersIcon, title: "optWaitlist", sub: "optWaitlistSub" }
];

// First screen: no login, the customer just says how they want to order.
export function WelcomeScreen({ now, onChoose, onToggleTheme }) {
  const { lang, setLang, t } = useI18n();

  return (
    <section className="screen active welcome">
      <Photo name="welcome" width={1000} className="welcome-photo" eager />
      <span className="welcome-shade" />
      <div className="welcome-top">
        <ThemeToggle onToggle={onToggleTheme} />
        <div className="lang">
          {LANGUAGES.map((code) => (
            <button key={code} className={code === lang ? "on" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div className="welcome-brand">
        <img src="/icons/logo.png" alt="957 Gastrobar · Esterri d’Àneu" />
      </div>
      <div className="welcome-body">
        <p className="welcome-greet">{t(greetingKey(now))}</p>
        <h1 className="display welcome-title">{t("welcomeTitle")}</h1>
        <div className="welcome-options">
          {OPTIONS.map(({ id, Icon, title, sub }, index) => (
            <button key={id} className="welcome-option" style={{ animationDelay: `${0.12 + index * 0.08}s` }} onClick={() => onChoose(id)}>
              <span className="welcome-option-icon"><Icon /></span>
              <span className="grow">
                <b>{t(title)}</b>
                <small>{t(sub)}</small>
              </span>
              <ChevronIcon />
            </button>
          ))}
        </div>
        <button className="link-btn" onClick={() => onChoose("menu")}>{t("seeMenu")}</button>
        <InstallBanner />
        <p className="demo-tag">{t("demoTag")}</p>
      </div>
    </section>
  );
}
