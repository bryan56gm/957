import { FAVOURITE_IDS, findItem, PIZZA_TAGS } from "../data/menu";
import { VENUE } from "../data/venue";
import { useI18n } from "../hooks/useI18n";
import { greetingKey, kitchenOpen } from "../lib/clock";
import { BagIcon, CalendarIcon, ChevronIcon, ClockIcon, PhoneIcon, PinIcon, QrIcon, UsersIcon, WheatIcon } from "./Icons";
import { OrderMini } from "./OrderProgress";
import { Photo } from "./Photo";

const TAG_LABEL = { veggie: "tagVeggie", vegan: "tagVegan", meat: "tagMeat", spicy: "tagSpicy" };
const WEEK_ORDER = [3, 4, 5, 6, 0, 1, 2];
const DAY_KEY = { 0: "daySun", 1: "dayMon", 2: "dayTue", 3: "dayWed", 4: "dayThu", 5: "dayFri", 6: "daySat" };
const SERVICE_KEY = { both: "serviceBoth", dinner: "serviceDinner", lunch: "serviceLunch", closed: "serviceClosed" };

// The opening week at a glance (the house changes it from its panel each month).
function WeekCard({ now }) {
  const { t } = useI18n();
  const today = now.getDay();
  return (
    <div className="card week">
      <div className="row"><span className="round-icon"><CalendarIcon /></span><h2 className="display section-title grow">{t("weekTitle")}</h2></div>
      <div className="week-grid">
        {WEEK_ORDER.map((day) => (
          <div key={day} className={`week-day ${VENUE.week[day]} ${day === today ? "today" : ""}`}>
            <b>{t(DAY_KEY[day])}</b>
            <small>{t(SERVICE_KEY[VENUE.week[day]])}</small>
          </div>
        ))}
      </div>
      <p className="fine-print">{t("weekHint")}</p>
    </div>
  );
}

function ModeCard({ mode, onChange }) {
  const { t } = useI18n();
  let Icon = BagIcon;
  let title = t("modeNone");
  let sub = t("modeNoneSub");
  if (mode?.type === "takeaway") {
    title = t("modeTakeaway");
    sub = t("modeTakeawaySub", { time: mode.slot });
  } else if (mode?.type === "table") {
    Icon = QrIcon;
    title = t("modeTable", { table: mode.table });
    sub = t(mode.zone === "terrace" ? "zoneTerrace" : "zoneInside");
  }
  return (
    <button className="mode-card" onClick={onChange}>
      <span className="mode-icon"><Icon /></span>
      <span className="grow"><b>{title}</b><small>{sub}</small></span>
      <span className="pill">{t("change")}</span>
    </button>
  );
}

function WaitlistCard({ waitlist, onOpen }) {
  const { t } = useI18n();
  const { entry, minutes } = waitlist;
  if (entry?.status === "waiting") {
    return (
      <button className="wait-card active" onClick={onOpen}>
        <span className="wait-num display">{entry.ahead + 1}</span>
        <span className="grow">
          <b>{t("waitTitle")} · {entry.people} <UsersIcon /></b>
          <small>{entry.ahead === 0 ? t("waitNext") : t("waitApprox", { count: minutes })}</small>
        </span>
        <ChevronIcon />
      </button>
    );
  }
  return (
    <button className="wait-card" onClick={onOpen}>
      <span className="mode-icon soft"><UsersIcon /></span>
      <span className="grow"><b>{t("waitCardTitle")}</b><small>{t("waitCardSub", { count: minutes })}</small></span>
      <ChevronIcon />
    </button>
  );
}

export function HomeScreen({ now, mode, orders, waitlist, onChangeMode, onOpenOrder, onOpenWaitlist, onOpenItem, onOpenMenu, onGlutenFree }) {
  const { t, money, name } = useI18n();
  const open = kitchenOpen(now);
  const favourites = FAVOURITE_IDS.map(findItem);

  return (
    <>
      <div className="hero">
        <Photo name="hero" width={900} eager />
        <span className="hero-shade" />
        <div className="hero-text">
          <span className={`status ${open ? "" : "closed"}`}>{open ? `${t("openNow")} · ${t("kitchenUntil", { time: VENUE.kitchenClose })}` : t("closedNow", { time: VENUE.opensAt })}</span>
          <h1 className="display hero-title">{t(greetingKey(now))}</h1>
          <p className="hero-sub">{t("tagline")}</p>
        </div>
      </div>
      <div className="content hero-content">
        <ModeCard mode={mode} onChange={onChangeMode} />
        {orders.map((order) => <OrderMini key={order.id} order={order} onOpen={onOpenOrder} />)}
        {mode?.type !== "table" && <WaitlistCard waitlist={waitlist} onOpen={onOpenWaitlist} />}

        <div className="section-head row">
          <h2 className="display section-title">{t("favourites")}</h2>
          <button className="link-btn small" onClick={() => onOpenMenu()}>{t("seeAll")}</button>
        </div>
        <div className="carousel">
          {favourites.map((item) => (
            <button key={item.id} className="fav-card" onClick={() => onOpenItem(item)}>
              <Photo name={item.photo} width={480} />
              <span className="fav-shade" />
              {item.signature && <span className="tag">{t("badgeSignature")}</span>}
              <span className="fav-body">
                <span className="fav-num">Nº {item.num}</span>
                <b className="display">{name(item)}</b>
                <small>{money(item.price)}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="card tags">
          <h2 className="display section-title">{t("pizzasTitle")}</h2>
          <p className="sub">{t("pizzasSub")}</p>
          <div className="meat-grid">
            {PIZZA_TAGS.map((tag) => (
              <button key={tag} onClick={() => onOpenMenu(tag)}><b>{t(TAG_LABEL[tag])}</b><small>{t(`${TAG_LABEL[tag]}Sub`)}</small></button>
            ))}
          </div>
          <button className="gf-banner" onClick={onGlutenFree}>
            <span className="round-icon"><WheatIcon /></span>
            <span className="grow"><b>{t("gfTitle")}</b><small>{t("gfSub")}</small></span>
            <ChevronIcon />
          </button>
        </div>

        <WeekCard now={now} />

        <div className="card info">
          <div className="info-head">
            <Photo name="room" width={700} />
            <span className="info-shade" />
            <b className="display">{t("infoTitle")}</b>
          </div>
          <div className="info-row"><PinIcon /><span>{VENUE.address}</span></div>
          <div className="info-row"><ClockIcon /><span>{VENUE.hours}<small>{t("infoClosed")}</small></span></div>
          <div className="two">
            <a className="btn-outline" href={`tel:${VENUE.phone}`}><PhoneIcon /> {t("call")}</a>
            <a className="btn-outline" href={VENUE.mapsUrl} target="_blank" rel="noreferrer"><PinIcon /> {t("directions")}</a>
          </div>
        </div>
      </div>
    </>
  );
}
