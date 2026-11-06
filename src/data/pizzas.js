// 957 Gastrobar pizzas. Names come from public reviews and the venue's own posts; there is no
// published carta with prices, so prices are approximate (reviews: 8–11,50 €, specials up to 14 €)
// and ingredients marked `confirmed: false` are a best guess. Replace with the real carta before showing.
// `tags` drive the menu filter. `remove`: ingredients the customer can take out.
export const PIZZAS = [
  {
    id: "rut", num: 1, name: "Rut", photo: "rut", signature: true, confirmed: true, price: 14, tags: ["meat"],
    allergens: ["gluten", "milk"], remove: ["foie", "parmesan"],
    desc: {
      ca: "Tomàquet, mozzarella, pernil ibèric, parmesà i foie micuit",
      es: "Tomate, mozzarella, jamón ibérico, parmesano y foie micuit",
      en: "Tomato, mozzarella, Iberian ham, parmesan and foie gras micuit",
      fr: "Tomate, mozzarella, jambon ibérique, parmesan et foie gras mi-cuit"
    }
  },
  {
    id: "bosc", num: 2, name: "Bosc", photo: "bosc", popular: true, confirmed: false, price: 11.5, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["onion", "parmesan"],
    desc: {
      ca: "Tomàquet, mozzarella, ceps, bolets de temporada, ceba confitada i parmesà",
      es: "Tomate, mozzarella, ceps, setas de temporada, cebolla confitada y parmesano",
      en: "Tomato, mozzarella, porcini, seasonal mushrooms, candied onion and parmesan",
      fr: "Tomate, mozzarella, cèpes, champignons de saison, oignon confit et parmesan"
    }
  },
  {
    id: "muntanya", num: 3, name: "Muntanya", photo: "muntanya", popular: true, confirmed: false, price: 11.5, tags: ["meat"],
    allergens: ["gluten", "milk"], remove: ["onion", "goat"],
    desc: {
      ca: "Tomàquet, mozzarella, llonganissa del Pallars, formatge de cabra i ceba",
      es: "Tomate, mozzarella, longaniza del Pallars, queso de cabra y cebolla",
      en: "Tomato, mozzarella, Pallars cured sausage, goat cheese and onion",
      fr: "Tomate, mozzarella, saucisson du Pallars, fromage de chèvre et oignon"
    }
  },
  {
    id: "ombra", num: 4, name: "Ombra", photo: "ombra", isNew: true, confirmed: false, price: 11.5, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["rocket", "tomato"],
    desc: {
      ca: "Base d’olivada negra, mozzarella, tomàquet sec i ruca",
      es: "Base de olivada negra, mozzarella, tomate seco y rúcula",
      en: "Black olive tapenade base, mozzarella, sun-dried tomato and rocket",
      fr: "Base de tapenade noire, mozzarella, tomate séchée et roquette"
    }
  },
  {
    id: "terra", num: 5, name: "Terra", photo: "terra", confirmed: false, price: 11.5, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["aubergine", "pepper", "onion"],
    desc: {
      ca: "Base d’olivada, mozzarella, albergínia, pebrot escalivat i ceba",
      es: "Base de olivada, mozzarella, berenjena, pimiento escalivado y cebolla",
      en: "Olive tapenade base, mozzarella, aubergine, roasted pepper and onion",
      fr: "Base de tapenade, mozzarella, aubergine, poivron grillé et oignon"
    }
  },
  {
    id: "pizza957", num: 6, name: "957", photo: "pizza957", signature: true, confirmed: false, price: 12.5, tags: ["meat"],
    allergens: ["gluten", "milk"], remove: ["onion", "rocket"],
    desc: {
      ca: "La de la casa: tomàquet, mozzarella, botifarra, ceps i ceba confitada",
      es: "La de la casa: tomate, mozzarella, butifarra, ceps y cebolla confitada",
      en: "The house pizza: tomato, mozzarella, Catalan sausage, porcini and candied onion",
      fr: "Celle de la maison : tomate, mozzarella, saucisse catalane, cèpes et oignon confit"
    }
  },
  {
    id: "formatges", num: 7, name: "5 Formatges", photo: "formatges", popular: true, confirmed: true, price: 11, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["goat", "blue"],
    desc: {
      ca: "Tomàquet, mozzarella, parmesà, formatge blau, de cabra i del Pirineu",
      es: "Tomate, mozzarella, parmesano, queso azul, de cabra y del Pirineo",
      en: "Tomato, mozzarella, parmesan, blue, goat and Pyrenean cheese",
      fr: "Tomate, mozzarella, parmesan, bleu, chèvre et fromage des Pyrénées"
    }
  },
  {
    id: "estacions", num: 8, name: "4 Estacions", photo: "estacions", confirmed: true, price: 10.5, tags: ["meat"],
    allergens: ["gluten", "milk"], remove: ["olives", "mushroom", "artichoke"],
    desc: {
      ca: "Tomàquet, mozzarella, pernil dolç, xampinyons, carxofa i olives",
      es: "Tomate, mozzarella, jamón cocido, champiñones, alcachofa y aceitunas",
      en: "Tomato, mozzarella, cooked ham, mushrooms, artichoke and olives",
      fr: "Tomate, mozzarella, jambon, champignons, artichaut et olives"
    }
  },
  {
    id: "barbacoa", num: 9, name: "Barbacoa", photo: "barbacoa", popular: true, confirmed: true, price: 11, tags: ["meat"],
    allergens: ["gluten", "milk", "mustard", "sulphites"], remove: ["onion", "bacon"],
    desc: {
      ca: "Salsa barbacoa, mozzarella, carn picada, bacon i ceba",
      es: "Salsa barbacoa, mozzarella, carne picada, bacon y cebolla",
      en: "Barbecue sauce, mozzarella, minced beef, bacon and onion",
      fr: "Sauce barbecue, mozzarella, viande hachée, bacon et oignon"
    }
  },
  {
    id: "cabra", num: 10, name: "Cabra i espinacs", photo: "cabra", confirmed: true, price: 11, tags: ["veggie"],
    allergens: ["gluten", "milk", "nuts"], remove: ["nuts", "honey"],
    desc: {
      ca: "Tomàquet, mozzarella, formatge de cabra, espinacs, nous i mel",
      es: "Tomate, mozzarella, queso de cabra, espinacas, nueces y miel",
      en: "Tomato, mozzarella, goat cheese, spinach, walnuts and honey",
      fr: "Tomate, mozzarella, chèvre, épinards, noix et miel"
    }
  },
  {
    id: "bacalla", num: 11, name: "Bacallà i jalapenys", photo: "bacalla", spicy: true, confirmed: true, price: 11.5, tags: ["spicy"],
    allergens: ["gluten", "milk", "fish"], remove: ["jalapeno", "onion"],
    desc: {
      ca: "Tomàquet, mozzarella, bacallà esqueixat, jalapenys i ceba morada",
      es: "Tomate, mozzarella, bacalao desmigado, jalapeños y cebolla morada",
      en: "Tomato, mozzarella, shredded salt cod, jalapeños and red onion",
      fr: "Tomate, mozzarella, morue effilochée, jalapeños et oignon rouge"
    }
  },
  {
    id: "bolets", num: 12, name: "Bolets", photo: "bolets", confirmed: true, price: 10, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["garlic", "parsley"],
    desc: {
      ca: "Tomàquet, mozzarella, xampinyons, gírgoles, all i julivert",
      es: "Tomate, mozzarella, champiñones, setas de cardo, ajo y perejil",
      en: "Tomato, mozzarella, mushrooms, oyster mushrooms, garlic and parsley",
      fr: "Tomate, mozzarella, champignons, pleurotes, ail et persil"
    }
  },
  {
    id: "vegetal", num: 13, name: "Vegetal", photo: "vegetal", confirmed: true, price: 10, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["pepper", "onion", "olives"],
    desc: {
      ca: "Tomàquet, mozzarella, carbassó, pebrot, ceba, xampinyons i olives",
      es: "Tomate, mozzarella, calabacín, pimiento, cebolla, champiñones y aceitunas",
      en: "Tomato, mozzarella, courgette, pepper, onion, mushrooms and olives",
      fr: "Tomate, mozzarella, courgette, poivron, oignon, champignons et olives"
    }
  },
  {
    id: "vegana", num: 14, name: "Vegana", photo: "vegana", confirmed: true, price: 10.5, tags: ["veggie", "vegan"],
    allergens: ["gluten"], remove: ["pepper", "onion"],
    desc: {
      ca: "Tomàquet, formatge vegà, verdures de temporada i alfàbrega",
      es: "Tomate, queso vegano, verduras de temporada y albahaca",
      en: "Tomato, vegan cheese, seasonal vegetables and basil",
      fr: "Tomate, fromage végan, légumes de saison et basilic"
    }
  },
  {
    id: "margarita", num: 15, name: "Margarita", photo: "margarita", confirmed: false, price: 8, tags: ["veggie"],
    allergens: ["gluten", "milk"], remove: ["basil"],
    desc: {
      ca: "Tomàquet, mozzarella i alfàbrega fresca",
      es: "Tomate, mozzarella y albahaca fresca",
      en: "Tomato, mozzarella and fresh basil",
      fr: "Tomate, mozzarella et basilic frais"
    }
  }
];

// Pizza base. Buckwheat (gluten-free) is a real option of the house; the surcharge is a guess.
export const BASES = [
  { id: "classic", price: 0 },
  { id: "buckwheat", price: 2 }
];

// Extra toppings (prices to confirm).
export const EXTRAS = [
  { id: "mozzarella", price: 1.5 },
  { id: "ham", price: 3 },
  { id: "porcini", price: 2.5 },
  { id: "foie", price: 3.5 },
  { id: "goat", price: 2 },
  { id: "egg", price: 1.5 },
  { id: "jalapeno", price: 1 },
  { id: "rocket", price: 1 }
];

export const DONENESS = ["rare", "medium", "well"];
