import { useState } from "react";
import { CUSTOMER } from "../data/venue";
import { useI18n } from "../hooks/useI18n";
import { CheckIcon, MenuIcon, UsersIcon } from "./Icons";
import { Segmented } from "./Segmented";
import { Sheet } from "./Sheet";
import { Stepper } from "./Stepper";

const RADIUS = 70;
const LENGTH = 2 * Math.PI * RADIUS;

function JoinForm({ onJoin }) {
  const { t } = useI18n();
  const [people, setPeople] = useState(4);
  const [zone, setZone] = useState("inside");
  const [name, setName] = useState(CUSTOMER.name);
  return (
    <>
      <div className="sheet-scroll">
        <p className="display sheet-title">{t("waitTitle")}</p>
        <div className="opt-group row between">
          <p className="opt-title">{t("waitHowMany")}</p>
          <Stepper value={people} onChange={setPeople} min={1} max={12} />
        </div>
        <div className="opt-group">
          <p className="opt-title">{t("waitWhere")}</p>
          <Segmented
            options={[{ id: "inside", label: t("zoneInside") }, { id: "terrace", label: t("zoneTerrace") }, { id: "any", label: t("waitAny") }]}
            value={zone}
            onChange={setZone}
          />
        </div>
        <div className="opt-group">
          <p className="opt-title">{t("waitName")}</p>
          <input className="note" value={name} onChange={(event) => setName(event.target.value)} />
          <p className="fine-print">{t("waitPhoneHint", { phone: CUSTOMER.phone })}</p>
        </div>
      </div>
      <div className="sheet-foot">
        <button className="btn-primary grow" onClick={() => onJoin({ people, zone, name })}><UsersIcon /> {t("waitJoin")}</button>
      </div>
    </>
  );
}

function Waiting({ entry, minutes, progress, onLeave, onSeeMenu }) {
  const { t } = useI18n();
  const aheadText = entry.ahead === 0 ? t("waitNext") : entry.ahead === 1 ? t("waitAheadOne") : t("waitAhead", { count: entry.ahead });
  return (
    <>
      <div className="sheet-scroll center">
        <p className="display sheet-title">{t("waitTitle")}</p>
        <div className="wait-ring">
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r={RADIUS} className="track" />
            <circle cx="80" cy="80" r={RADIUS} className="fill" strokeDasharray={LENGTH} strokeDashoffset={LENGTH * (1 - progress)} transform="rotate(-90 80 80)" />
          </svg>
          <div className="wait-ring-center">
            <small>{t("waitPosition")}</small>
            <b className="display" key={entry.ahead}>{entry.ahead + 1}</b>
          </div>
        </div>
        <p className="wait-ahead">{aheadText}</p>
        {entry.ahead > 0 && <p className="sheet-body">{t("waitApprox", { count: minutes })} · {entry.people} <UsersIcon /></p>}
        <p className="fine-print center">{t("waitHint")}</p>
      </div>
      <div className="sheet-foot column">
        <button className="btn-primary" onClick={onSeeMenu}><MenuIcon /> {t("browse")}</button>
        <button className="btn-ghost" onClick={onLeave}>{t("waitLeave")}</button>
      </div>
    </>
  );
}

function Ready({ entry, onAccept }) {
  const { t } = useI18n();
  return (
    <div className="success">
      <div className="tick pulse"><CheckIcon /></div>
      <p className="display sheet-title">{t("waitReady")}</p>
      <p className="sheet-body">{t("waitReadySub", { table: entry.table })}</p>
      <button className="btn-primary" onClick={onAccept}>{t("waitGo")}</button>
    </div>
  );
}

export function WaitlistSheet({ open, waitlist, onClose, onJoin, onLeave, onAccept, onSeeMenu }) {
  const { entry } = waitlist;
  return (
    <Sheet open={open} onClose={onClose} tall={entry?.status === "waiting"}>
      {!entry && <JoinForm onJoin={onJoin} />}
      {entry?.status === "waiting" && <Waiting entry={entry} minutes={waitlist.minutes} progress={waitlist.progress} onLeave={onLeave} onSeeMenu={onSeeMenu} />}
      {entry?.status === "ready" && <Ready entry={entry} onAccept={onAccept} />}
    </Sheet>
  );
}
