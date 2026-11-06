import { PIZZAS } from "./pizzas";

// Rest of the carta. Dish names come from reviews and the venue's own description
// ("pizzes, pasta, amanides, brasa, tapes i postres"); prices are approximate. Confirm with the house.
const TAPAS = [
  { id: "hummus", photo: "hummus", popular: true, veggie: true, name: { ca: "Hummus de remolatxa", es: "Hummus de remolacha", en: "Beetroot hummus", fr: "Houmous de betterave" }, price: 6.5, allergens: ["sesame", "gluten"] },
  { id: "bravas", photo: "bravas", popular: true, spicy: true, name: { ca: "Patates braves", es: "Patatas bravas", en: "Patatas bravas", fr: "Patatas bravas" }, price: 6, allergens: ["egg"] },
  { id: "artichokechips", photo: "artichokechips", veggie: true, name: { ca: "Xips de carxofa", es: "Chips de alcachofa", en: "Artichoke chips", fr: "Chips d’artichaut" }, price: 6.5, allergens: [] },
  { id: "cepcroquettes", photo: "croquettes", popular: true, unit: true, name: { ca: "Croqueta de ceps", es: "Croqueta de ceps", en: "Porcini croquette", fr: "Croquette aux cèpes" }, price: 1.8, allergens: ["gluten", "milk", "egg"] },
  { id: "rostitcroquettes", photo: "croquettes2", unit: true, name: { ca: "Croqueta de rostit", es: "Croqueta de rustido", en: "Roast meat croquette", fr: "Croquette de rôti" }, price: 1.8, allergens: ["gluten", "milk", "egg"] },
  { id: "parmesanfritters", photo: "fritters", veggie: true, name: { ca: "Bunyols de parmesà", es: "Buñuelos de parmesano", en: "Parmesan fritters", fr: "Beignets au parmesan" }, price: 6.5, allergens: ["gluten", "milk", "egg"] },
  { id: "calamari", photo: "calamari", name: { ca: "Calamars a la romana", es: "Calamares a la romana", en: "Fried calamari", fr: "Calamars frits" }, price: 9, allergens: ["gluten", "egg", "molluscs"] },
  { id: "honeycheese", photo: "honeycheese", veggie: true, name: { ca: "Formatge de cabra amb mel", es: "Queso de cabra con miel", en: "Goat cheese with honey", fr: "Chèvre au miel" }, price: 7.5, allergens: ["milk", "gluten"] }
];

const SALADS = [
  { id: "caprese", photo: "caprese", veggie: true, name: { ca: "Tomàquet i mozzarella", es: "Tomate y mozzarella", en: "Tomato and mozzarella", fr: "Tomate et mozzarella" }, price: 8.5, allergens: ["milk"] },
  { id: "greek", photo: "greek", veggie: true, name: { ca: "Amanida grega", es: "Ensalada griega", en: "Greek salad", fr: "Salade grecque" }, price: 9, allergens: ["milk"] }
];

// Pasta is served at lunch only (the app shows it as "lunch only" in the evening).
const PASTA = [
  { id: "foieravioli", photo: "ravioli", lunchOnly: true, name: { ca: "Raviolis de foie amb salsa de bolets", es: "Raviolis de foie con salsa de setas", en: "Foie gras ravioli, mushroom sauce", fr: "Raviolis au foie gras, sauce champignons" }, price: 13, allergens: ["gluten", "milk", "egg"] },
  { id: "truffleravioli", photo: "ravioli2", lunchOnly: true, name: { ca: "Raviolis de tòfona", es: "Raviolis de trufa", en: "Truffle ravioli", fr: "Raviolis à la truffe" }, price: 13, allergens: ["gluten", "milk", "egg"] },
  { id: "inktagliatelle", photo: "tagliatelle", lunchOnly: true, name: { ca: "Tagliatelle negres amb salsa de ceps", es: "Tagliatelle negras con salsa de ceps", en: "Squid-ink tagliatelle, porcini sauce", fr: "Tagliatelle à l’encre, sauce cèpes" }, price: 12.5, allergens: ["gluten", "milk", "egg", "molluscs"] },
  { id: "carbonara", photo: "carbonara", lunchOnly: true, name: { ca: "Carbonara", es: "Carbonara", en: "Carbonara", fr: "Carbonara" }, price: 11, allergens: ["gluten", "milk", "egg"] }
];

// Grill: `doneness` lets the customer choose how the meat is cooked.
const GRILL = [
  { id: "entrecote", photo: "entrecote", doneness: true, popular: true, name: { ca: "Entrecot a la brasa", es: "Entrecot a la brasa", en: "Grilled entrecôte", fr: "Entrecôte à la braise" }, price: 20, allergens: [] },
  { id: "churrasco", photo: "churrasco", doneness: true, name: { ca: "Xurrasco de vedella", es: "Churrasco de ternera", en: "Beef churrasco", fr: "Churrasco de bœuf" }, price: 15, allergens: [] },
  { id: "lambchops", photo: "lamb", doneness: true, name: { ca: "Costelles de xai", es: "Chuletas de cordero", en: "Lamb chops", fr: "Côtelettes d’agneau" }, price: 17, allergens: [] },
  { id: "botifarra", photo: "botifarra", name: { ca: "Botifarra amb patates", es: "Butifarra con patatas", en: "Catalan sausage with potatoes", fr: "Saucisse catalane et pommes de terre" }, price: 11, allergens: [] }
];

const DESSERTS = [
  { id: "pannacotta", photo: "pannacotta", popular: true, name: { ca: "Panna cotta", es: "Panna cotta", en: "Panna cotta", fr: "Panna cotta" }, price: 5, allergens: ["milk"] },
  { id: "cheesecake", photo: "cheesecake", name: { ca: "Pastís de formatge amb nabius", es: "Tarta de queso con arándanos", en: "Blueberry cheesecake", fr: "Cheesecake aux myrtilles" }, price: 5.5, allergens: ["gluten", "milk", "egg"] },
  { id: "icecake", photo: "icecake", name: { ca: "Pastís gelat", es: "Tarta helada", en: "Ice-cream cake", fr: "Gâteau glacé" }, price: 5, allergens: ["gluten", "milk", "egg"] }
];

const DRINKS = [
  { id: "masovera", name: { ca: "Cervesa artesana La Masovera", es: "Cerveza artesana La Masovera", en: "La Masovera craft beer", fr: "Bière artisanale La Masovera" }, price: 4.5, allergens: ["gluten"] },
  { id: "draught", name: { ca: "Canya", es: "Caña", en: "Draught beer", fr: "Demi pression" }, price: 2.5, allergens: ["gluten"] },
  { id: "vermouth", name: { ca: "Vermut de la casa", es: "Vermut de la casa", en: "House vermouth", fr: "Vermouth maison" }, price: 3.5, allergens: ["sulphites"] },
  { id: "gintonic", name: { ca: "Gintònic prèmium", es: "Gin-tonic prémium", en: "Premium gin & tonic", fr: "Gin tonic premium" }, price: 9, allergens: [] },
  { id: "redwine", name: { ca: "Copa de vi negre", es: "Copa de vino tinto", en: "Glass of red wine", fr: "Verre de vin rouge" }, price: 3, allergens: ["sulphites"] },
  { id: "softdrink", name: { ca: "Refresc", es: "Refresco", en: "Soft drink", fr: "Soda" }, price: 2.5, allergens: [] },
  { id: "water", name: { ca: "Aigua filtrada (gerra)", es: "Agua filtrada (jarra)", en: "Filtered water (jug)", fr: "Eau filtrée (carafe)" }, price: 1.5, allergens: [] }
];

// Items the house marked as sold out tonight (what the house panel would do).
const SOLD_OUT_IDS = ["rostitcroquettes"];
const withSoldOut = (item) => (SOLD_OUT_IDS.includes(item.id) ? { ...item, soldOut: true } : item);

export const CATEGORIES = [
  { id: "pizzas", items: PIZZAS.map((item) => ({ ...item, category: "pizzas", veggie: item.tags.includes("veggie") && !item.tags.includes("vegan"), vegan: item.tags.includes("vegan") })) },
  { id: "tapas", items: TAPAS.map((item) => ({ ...item, category: "tapas" })) },
  { id: "salads", items: SALADS.map((item) => ({ ...item, category: "salads" })) },
  { id: "grill", items: GRILL.map((item) => ({ ...item, category: "grill" })) },
  { id: "pasta", items: PASTA.map((item) => ({ ...item, category: "pasta" })) },
  { id: "desserts", items: DESSERTS.map((item) => ({ ...item, category: "desserts" })) },
  { id: "drinks", items: DRINKS.map((item) => ({ ...item, category: "drinks" })) }
];

CATEGORIES.forEach((category) => { category.items = category.items.map(withSoldOut); });

const ALL_ITEMS = CATEGORIES.flatMap((category) => category.items);
const BY_ID = Object.fromEntries(ALL_ITEMS.map((item) => [item.id, item]));

export function findItem(id) {
  return BY_ID[id];
}

export function itemName(item, lang) {
  return typeof item.name === "string" ? item.name : item.name[lang] || item.name.ca;
}

// Pizza filter chips on the menu.
export const PIZZA_TAGS = ["veggie", "vegan", "meat", "spicy"];
export const ALLERGENS = ["gluten", "milk", "egg", "nuts", "soy", "sesame", "mustard", "sulphites", "fish", "crustaceans", "molluscs"];
export const UPSELL_IDS = ["bravas", "cepcroquettes", "hummus"];
export const FAVOURITE_IDS = ["rut", "pizza957", "bosc", "formatges", "muntanya"];
// Euros added per item at terrace tables (none at the 957).
export const TERRACE_FEE = 0;
