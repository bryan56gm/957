import { useMemo, useRef, useState } from "react";
import { CATEGORIES, PIZZA_TAGS } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { isLunchTime } from "../lib/clock";
import { CheckIcon, ClockIcon, FilterIcon, FlameIcon, LeafIcon, PlusIcon, SearchIcon, StarIcon, WheatIcon } from "./Icons";
import { Photo } from "./Photo";

export const CATEGORY_LABEL = { pizzas: "catPizzas", tapas: "catTapas", salads: "catSalads", grill: "catGrill", pasta: "catPasta", desserts: "catDesserts", drinks: "catDrinks" };
const TAG_LABEL = { veggie: "tagVeggie", vegan: "tagVegan", meat: "tagMeat", spicy: "tagSpicy" };
const TOPBAR_OFFSET = 132;
const TILE_CATEGORIES = ["tapas", "salads", "grill", "desserts"];

export function Badges({ item }) {
  const { t } = useI18n();
  return (
    <span className="badges">
      {item.signature && <span className="badge-tag hot"><StarIcon />{t("badgeSignature")}</span>}
      {item.popular && <span className="badge-tag"><StarIcon />{t("badgePopular")}</span>}
      {item.isNew && <span className="badge-tag hot">{t("badgeNew")}</span>}
      {item.spicy && <span className="badge-tag spicy"><FlameIcon />{t("badgeSpicy")}</span>}
      {item.vegan && <span className="badge-tag veggie"><LeafIcon />{t("badgeVegan")}</span>}
      {item.veggie && <span className="badge-tag veggie"><LeafIcon />{t("badgeVeggie")}</span>}
    </span>
  );
}

function PizzaCard({ item, inCart, onOpen }) {
  const { t, money, name, desc } = useI18n();
  return (
    <button className="item-card" onClick={() => onOpen(item)}>
      <span className="item-photo"><Photo name={item.photo} width={360} /></span>
      <span className="item-body">
        <span className="item-num">Nº {item.num}{inCart && <i className="in-cart"><CheckIcon /></i>}</span>
        <b className="display">{name(item)}</b>
        <span className="item-desc">{desc(item)}</span>
        <span className="item-foot">
          <span className="price">{money(item.price)}</span>
          <Badges item={item} />
        </span>
      </span>
    </button>
  );
}

function TileCard({ item, inCart, onOpen, onQuickAdd }) {
  const { t, money, name } = useI18n();
  const opensSheet = item.doneness || item.soldOut;
  return (
    <div className={`tile ${item.soldOut ? "sold-out" : ""}`}>
      <button className="tile-main" onClick={() => onOpen(item)}>
        <span className="tile-photo">
          <Photo name={item.photo} width={360} />
          {item.soldOut && <span className="sold-tag">{t("soldOut")}</span>}
        </span>
        <b>{name(item)}</b>
        <span className="price">{money(item.price)}{item.unit && <small> {t("perUnit")}</small>}</span>
      </button>
      {!item.soldOut && (
        <button className={`add ${inCart ? "done" : ""}`} onClick={() => (opensSheet ? onOpen(item) : onQuickAdd(item))} aria-label="+">{inCart ? <CheckIcon /> : <PlusIcon />}</button>
      )}
    </div>
  );
}

function RowCard({ item, inCart, onOpen, onQuickAdd, lunchClosed }) {
  const { t, money, name } = useI18n();
  return (
    <div className={`menu-row ${lunchClosed ? "dim" : ""}`}>
      <button className="grow menu-row-main" onClick={() => onOpen(item)}>
        <b>{name(item)}</b>
        {lunchClosed ? <span className="badges"><span className="badge-tag"><ClockIcon />{t("lunchOnly")}</span></span> : <Badges item={item} />}
      </button>
      <span className="price">{money(item.price)}</span>
      {!lunchClosed && (
        <button className={`add ${inCart ? "done" : ""}`} onClick={() => onQuickAdd(item)} aria-label="+">{inCart ? <CheckIcon /> : <PlusIcon />}</button>
      )}
    </div>
  );
}

export function MenuScreen({ now, initialTag = null, allergens, onOpenAllergens, onOpenItem, onQuickAdd, hasItem }) {
  const { t, name, desc } = useI18n();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(initialTag);
  const [activeCategory, setActiveCategory] = useState("pizzas");
  const sectionRefs = useRef({});
  const lunch = isLunchTime(now);

  const { sections, hidden } = useMemo(() => {
    const text = query.trim().toLowerCase();
    let hiddenCount = 0;
    const result = CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        // Gluten-free customers can still order every pizza: the buckwheat base has no gluten.
        const blocking = category.id === "pizzas" ? allergens.filter((code) => code !== "gluten") : allergens;
        if (blocking.some((code) => item.allergens.includes(code))) {
          hiddenCount += 1;
          return false;
        }
        if (tag && (category.id !== "pizzas" || !item.tags.includes(tag))) return false;
        if (text && !`${name(item)} ${desc(item)}`.toLowerCase().includes(text)) return false;
        return true;
      })
    })).filter((category) => category.items.length > 0);
    return { sections: result, hidden: hiddenCount };
  }, [query, tag, allergens, name, desc]);

  const jumpTo = (id) => {
    setActiveCategory(id);
    const node = sectionRefs.current[id];
    if (node) window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - TOPBAR_OFFSET, behavior: "smooth" });
  };

  return (
    <div className="content menu">
      <div className="menu-sticky">
        <div className="row">
          <label className="search grow">
            <SearchIcon />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} />
          </label>
          <button className={`filter-btn ${allergens.length ? "on" : ""}`} onClick={onOpenAllergens}>
            <FilterIcon />{allergens.length > 0 && <span>{allergens.length}</span>}
          </button>
        </div>
        <div className="tabs">
          {CATEGORIES.map((category) => (
            <button key={category.id} className={activeCategory === category.id ? "on" : ""} onClick={() => jumpTo(category.id)}>{t(CATEGORY_LABEL[category.id])}</button>
          ))}
        </div>
      </div>

      <div className="chips">
        <button className={tag === null ? "on" : ""} onClick={() => setTag(null)}>{t("tagAll")}</button>
        {PIZZA_TAGS.map((code) => (
          <button key={code} className={tag === code ? "on" : ""} onClick={() => setTag(tag === code ? null : code)}>{t(TAG_LABEL[code])}</button>
        ))}
      </div>

      {allergens.includes("gluten") && (
        <p className="notice ok"><WheatIcon />{t("glutenFreeNotice")}</p>
      )}
      {hidden > 0 && (
        <button className="notice" onClick={onOpenAllergens}><FilterIcon />{t("hiddenCount", { count: hidden })}</button>
      )}

      {sections.length === 0 && <p className="empty">{t("noResults")}</p>}

      {sections.map((category) => (
        <section key={category.id} ref={(node) => { sectionRefs.current[category.id] = node; }} className="menu-section">
          <h2 className="display section-title">{t(CATEGORY_LABEL[category.id])}</h2>
          {category.id === "pizzas" && (
            <>
              <p className="section-note"><WheatIcon />{t("buckwheatBanner")}</p>
              <div className="item-list">
                {category.items.map((item) => <PizzaCard key={item.id} item={item} inCart={hasItem(item.id)} onOpen={onOpenItem} />)}
              </div>
            </>
          )}
          {TILE_CATEGORIES.includes(category.id) && (
            <div className="tile-grid">
              {category.items.map((item) => <TileCard key={item.id} item={item} inCart={hasItem(item.id)} onOpen={onOpenItem} onQuickAdd={onQuickAdd} />)}
            </div>
          )}
          {(category.id === "pasta" || category.id === "drinks") && (
            <>
              {category.id === "pasta" && !lunch && <p className="section-note"><ClockIcon />{t("pastaNote")}</p>}
              <div className="row-list">
                {category.items.map((item) => (
                  <RowCard key={item.id} item={item} inCart={hasItem(item.id)} onOpen={onOpenItem} onQuickAdd={onQuickAdd} lunchClosed={item.lunchOnly && !lunch} />
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
