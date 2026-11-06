// Stock photos (Unsplash License: free for commercial use), served by Unsplash's CDN.
// Each one was checked in a browser (loads, and matches the dish). Final app: the 957's own photos.
const CDN = "https://images.unsplash.com/photo-";
const PHOTOS = {
  hero: "1594007654729-407eedc4be65",
  welcome: "1763647836753-e06fe1f8707b",
  room: "1709548145082-04d0cde481d4",
  terrace: "1724426057815-a12b34f027c1",
  rut: "1584782930656-e2bc1e803fc7",
  bosc: "1654722906292-1f712f25a799",
  muntanya: "1628840042765-356cda07504e",
  ombra: "1593560708920-61dd98c46a4e",
  terra: "1662107020289-813b87d0f3ed",
  pizza957: "1700760934249-93efbb574d23",
  formatges: "1593504049359-74330189a345",
  estacions: "1788537894982-bf4fff1db08f",
  barbacoa: "1734769484424-36b99dd84818",
  cabra: "1627461985459-51600559fffe",
  bacalla: "1657799831232-e9548089a643",
  bolets: "1672856398893-2fb52d807874",
  vegetal: "1625401514458-6c8a5e7d55da",
  vegana: "1581873372796-635b67ca2008",
  margarita: "1574071318508-1cdbab80d002",
  hummus: "1783455442171-16dbde079c53",
  bravas: "1565599837634-134bc3aadce8",
  artichokechips: "1745284053042-9d0b00c1e906",
  croquettes: "1674480367370-4e4bd64eb3c5",
  croquettes2: "1767974963436-2208b3553561",
  fritters: "1734774924912-dcbb467f8599",
  calamari: "1778600731531-7d836a32704c",
  honeycheese: "1743193144224-d2db90ea7784",
  caprese: "1769458313937-b5ad8f84942e",
  greek: "1769481614068-47cfb4d1f125",
  ravioli: "1676832661871-994153cf2d93",
  ravioli2: "1778850620699-79ba3ff60bf0",
  tagliatelle: "1765100778802-f684a4b7fd20",
  carbonara: "1764586119076-61711e8ed25a",
  entrecote: "1614119068601-483274e9dcb7",
  churrasco: "1558030006-450675393462",
  lamb: "1766589152485-9aafd9812a19",
  botifarra: "1598401863352-3de5501f4890",
  pannacotta: "1787550275377-9f54a07c68c8",
  cheesecake: "1533134242443-d4fd215305ad",
  icecake: "1576681471886-734fad6d7f25"
};

export function photoUrl(name, width = 800) {
  const id = PHOTOS[name];
  return id ? `${CDN}${id}?auto=format&fit=crop&w=${width}&q=62` : null;
}
