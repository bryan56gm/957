// Venue facts. Address, phone and hours come from Google Maps and the 957's Instagram bio
// ("Dilluns i dimarts tancat · 13:00–23:00"); the opening calendar changes by month, confirm with the house.
export const VENUE = {
  name: "957 Gastrobar",
  address: "Carrer Major, 33 · Esterri d’Àneu",
  phone: "+34973802354",
  phoneLabel: "973 80 23 54",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=957+Gastrobar+Esterri+d%27%C3%80neu",
  instagram: "https://www.instagram.com/957.gastrobar/",
  hours: "13:00–23:00",
  kitchenClose: "22:45",
  opensAt: "13:00",
  // Weekly pattern shown in "This week" (0 = Sunday). "both" = lunch and dinner.
  week: { 0: "both", 1: "closed", 2: "closed", 3: "dinner", 4: "dinner", 5: "both", 6: "both" }
};

// The demo always runs on a busy Saturday evening, whatever the real time is,
// so greetings, opening status and pick-up slots look right during a daytime meeting.
export const DEMO_CLOCK_START = { weekday: 6, hour: 20, minute: 52 };

export const TABLES = { 7: "terrace", 4: "inside", 9: "inside" };
export const SCANNED_TABLE = 9;
export const WAITLIST_TABLE = 4;

// Pick-up slots the kitchen has already filled (demo only).
export const FULL_SLOT_INDEXES = [1, 3];

export const CUSTOMER = { name: "Marta", phone: "6·· ··· 418" };

// Previous orders shown in "Comandes" (days ago, lines with the same shape as cart lines).
export const PAST_ORDERS = [
  {
    id: "past-1", daysAgo: 1, mode: "takeaway", code: 31,
    lines: [
      { itemId: "rut", base: "classic", extras: [], removed: [], qty: 1 },
      { itemId: "formatges", base: "buckwheat", extras: [], removed: [], qty: 1 },
      { itemId: "bravas", qty: 1 }
    ]
  },
  {
    id: "past-2", daysAgo: 9, mode: "table", table: 9, code: 12,
    lines: [
      { itemId: "pizza957", base: "classic", extras: ["porcini"], removed: [], qty: 1 },
      { itemId: "bosc", base: "classic", extras: [], removed: ["onion"], qty: 1 },
      { itemId: "cepcroquettes", qty: 6 },
      { itemId: "masovera", qty: 2 }
    ]
  }
];
