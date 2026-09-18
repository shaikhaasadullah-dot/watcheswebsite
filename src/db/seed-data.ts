const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const collectionSeeds = [
  {
    slug: "heritage",
    name: "Heritage",
    tagline: "Dress watches for the moments that matter",
    description:
      "Timeless silhouettes, hand-finished dials and supple leather. Our Heritage line draws on a century of dress-watch tradition and refines it for modern wrists.",
    image: px(9423289),
    sortOrder: 1,
  },
  {
    slug: "sport",
    name: "Sport & Dive",
    tagline: "Built for depth, speed and everything in between",
    description:
      "Screw-down crowns, ceramic bezels and lume that glows through the night. Engineered to survive the ocean and look sharp at dinner.",
    image: px(36303024),
    sortOrder: 2,
  },
  {
    slug: "minimal",
    name: "Minimalist",
    tagline: "Nothing more than what the moment needs",
    description:
      "Slim cases, clean dials and honest materials. Quiet design that pairs with everything from a hoodie to a blazer.",
    image: px(33524465),
    sortOrder: 3,
  },
  {
    slug: "smart",
    name: "Smart",
    tagline: "Connected, without compromising on design",
    description:
      "Health tracking, notifications and week-long battery in a case you'd actually want to wear. Technology dressed properly.",
    image: px(5081914),
    sortOrder: 4,
  },
];

export type ProductSeed = {
  slug: string;
  name: string;
  brand: string;
  collection: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  gender: "men" | "women" | "unisex";
  style: "dress" | "sport" | "minimal" | "smart";
  movement: string;
  caseSize: string;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  dialColor: string;
  features: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
};

export const productSeeds: ProductSeed[] = [
  {
    slug: "meridian-classic-40",
    name: "Meridian Classic 40",
    brand: "Aurelle",
    collection: "heritage",
    shortDescription: "A hand-finished dress watch with a domed sapphire crystal and Italian calfskin strap.",
    description:
      "The Meridian Classic is the watch we would recommend to anyone buying their first serious timepiece. A 40mm polished steel case houses a Swiss automatic movement visible through the exhibition caseback. The cream lacquer dial is printed in seven passes for depth, and the tan Italian calfskin strap breaks in beautifully over the first month of wear.",
    price: 48900,
    compareAtPrice: 56000,
    images: [px(6804457), px(1697218), px(9423289)],
    gender: "unisex",
    style: "dress",
    movement: "Swiss automatic, 38h reserve",
    caseSize: "40mm",
    caseMaterial: "316L polished stainless steel",
    strapMaterial: "Italian calfskin leather",
    waterResistance: "50m",
    dialColor: "Cream",
    features: ["Exhibition caseback", "Domed sapphire crystal", "Quick-release strap", "Applied indices"],
    stock: 18,
    featured: true,
  },
  {
    slug: "sovereign-chronograph",
    name: "Sovereign Chronograph",
    brand: "Halvorsen",
    collection: "heritage",
    shortDescription: "A column-wheel chronograph with a tachymeter scale and black alligator-grain strap.",
    description:
      "Halvorsen's flagship chronograph pairs a column-wheel mechanical movement with a deep black dial and cream sub-registers. The 42mm case is brushed on top and polished on the flanks, so it catches light without shouting. Pushers are crisp, the tachymeter is legible, and the alligator-grain leather strap closes with a signed deployant clasp.",
    price: 129000,
    images: [px(9620354), px(13273980), px(11745345)],
    gender: "men",
    style: "dress",
    movement: "Mechanical column-wheel chronograph",
    caseSize: "42mm",
    caseMaterial: "Brushed & polished steel",
    strapMaterial: "Alligator-grain leather, deployant clasp",
    waterResistance: "100m",
    dialColor: "Black",
    features: ["Column-wheel chronograph", "Tachymeter bezel", "Deployant clasp", "Anti-reflective sapphire"],
    stock: 7,
    featured: true,
  },
  {
    slug: "noir-roman",
    name: "Noir Roman",
    brand: "Aurelle",
    collection: "heritage",
    shortDescription: "Black sunray dial, rose-gold Roman numerals, and a slim 9mm profile that slides under any cuff.",
    description:
      "Noir Roman is the evening watch. A black sunray dial shifts from charcoal to jet as it moves through light, framed by rose-gold Roman numerals and a matching case. At 9mm thick it disappears under a shirt cuff and reappears exactly when you want it to.",
    price: 64500,
    images: [px(9423289), px(9423283), px(31050003)],
    gender: "men",
    style: "dress",
    movement: "Swiss quartz",
    caseSize: "39mm",
    caseMaterial: "Rose-gold PVD steel",
    strapMaterial: "Black calfskin leather",
    waterResistance: "50m",
    dialColor: "Black sunray",
    features: ["9mm slim profile", "Rose-gold Roman numerals", "Sapphire crystal", "Date window at 6"],
    stock: 22,
  },
  {
    slug: "aurum-dress-34",
    name: "Aurum Dress 34",
    brand: "Aurelle",
    collection: "heritage",
    shortDescription: "A warm gold-tone case on a matching seven-link bracelet, made for wrists that prefer the finer things.",
    description:
      "Aurum is unapologetically gold. The 34mm case and seven-link bracelet are finished in 18k gold PVD over steel, with a champagne dial and diamond-cut hands that flash when they catch the light. It's a watch that works with jewelry rather than competing with it.",
    price: 89000,
    compareAtPrice: 99000,
    images: [px(19793735), px(15631259), px(39134860)],
    gender: "women",
    style: "dress",
    movement: "Swiss quartz",
    caseSize: "34mm",
    caseMaterial: "18k gold PVD steel",
    strapMaterial: "Seven-link gold-tone bracelet",
    waterResistance: "30m",
    dialColor: "Champagne",
    features: ["Butterfly clasp", "Diamond-cut hands", "Sapphire crystal", "Micro-adjust links"],
    stock: 12,
    featured: true,
  },
  {
    slug: "etoile-crystal-30",
    name: "Étoile Crystal 30",
    brand: "Aurelle",
    collection: "heritage",
    shortDescription: "A mother-of-pearl dial set with 12 Swarovski crystals in a delicate 30mm case.",
    description:
      "Étoile takes its name from the twelve crystal hour markers that sit like stars on a white mother-of-pearl dial. The 30mm case is finished in two-tone gold and steel, and the slim bracelet tapers to a hidden clasp. It's a gift watch, an anniversary watch, and a watch you'll reach for far more often than you expect.",
    price: 72000,
    images: [px(39134860), px(34203400), px(35115821)],
    gender: "women",
    style: "dress",
    movement: "Swiss quartz",
    caseSize: "30mm",
    caseMaterial: "Two-tone steel & gold PVD",
    strapMaterial: "Tapered two-tone bracelet",
    waterResistance: "30m",
    dialColor: "White mother-of-pearl",
    features: ["12 Swarovski crystal markers", "Mother-of-pearl dial", "Hidden clasp", "Gift box included"],
    stock: 15,
    isNew: true,
  },
  {
    slug: "tidewater-diver-42",
    name: "Tidewater Diver 42",
    brand: "Kestrel",
    collection: "sport",
    shortDescription: "ISO-rated to 300m, with a ceramic bezel and Swiss Super-LumiNova that glows through the night.",
    description:
      "Tidewater is a real dive watch. The unidirectional ceramic bezel clicks through 120 positions, the crown screws down, and the case is rated to 300 metres. A deep blue sunburst dial carries oversized markers filled with Super-LumiNova, and the three-link bracelet includes a wetsuit extension. Serious kit that still looks good with a linen shirt.",
    price: 115000,
    images: [px(36303024), px(30509139), px(15921384)],
    gender: "men",
    style: "sport",
    movement: "Swiss automatic, 41h reserve",
    caseSize: "42mm",
    caseMaterial: "Brushed 316L steel",
    strapMaterial: "Three-link steel bracelet, wetsuit extension",
    waterResistance: "300m",
    dialColor: "Blue sunburst",
    features: ["Ceramic 120-click bezel", "Screw-down crown", "Super-LumiNova", "Helium escape valve"],
    stock: 9,
    featured: true,
  },
  {
    slug: "azure-automatic",
    name: "Azure Automatic",
    brand: "Kestrel",
    collection: "sport",
    shortDescription: "An everyday steel automatic with an electric blue dial and integrated bracelet.",
    description:
      "Azure is what happens when a sports watch goes to design school. The integrated bracelet flows straight out of the case, the electric blue dial is finished with a vertical brush, and the automatic movement hums along at 28,800 vph. Wear it swimming, wear it to work, wear it to the wedding.",
    price: 98000,
    images: [px(15921373), px(15921372), px(33058091)],
    gender: "unisex",
    style: "sport",
    movement: "Automatic, 40h reserve",
    caseSize: "40mm",
    caseMaterial: "Brushed steel, polished bevels",
    strapMaterial: "Integrated steel bracelet",
    waterResistance: "100m",
    dialColor: "Electric blue",
    features: ["Integrated bracelet", "Vertical brushed dial", "Exhibition caseback", "Butterfly clasp"],
    stock: 14,
    isNew: true,
  },
  {
    slug: "trailhead-field",
    name: "Trailhead Field",
    brand: "Kestrel",
    collection: "sport",
    shortDescription: "A rugged field watch with sandwich dial, orange accents and a quick-change canvas strap.",
    description:
      "Trailhead was designed for weekends that get muddy. The sandblasted case shrugs off scratches, the sandwich dial glows from beneath, and the orange seconds hand makes reading the time at a glance easy. Comes with a waxed canvas strap and a spare orange rubber strap in the box.",
    price: 42000,
    images: [px(18868355), px(27102143), px(6166169)],
    gender: "unisex",
    style: "sport",
    movement: "Japanese automatic",
    caseSize: "40mm",
    caseMaterial: "Sandblasted steel",
    strapMaterial: "Waxed canvas + spare rubber strap",
    waterResistance: "100m",
    dialColor: "Black sandwich",
    features: ["Two straps included", "Sandwich lume dial", "Screw-down crown", "Hacking seconds"],
    stock: 30,
  },
  {
    slug: "obsidian-racer",
    name: "Obsidian Racer",
    brand: "Halvorsen",
    collection: "sport",
    shortDescription: "A blacked-out chronograph with a carbon-pattern dial and perforated racing strap.",
    description:
      "Obsidian Racer borrows from the pit lane. A black DLC case, carbon-textured dial and red chronograph hand keep things aggressive, while the perforated leather racing strap keeps things breathable. The quartz chronograph measures to 1/10th of a second for the moments that need it.",
    price: 76000,
    compareAtPrice: 84000,
    images: [px(11136241), px(9011195), px(16962525)],
    gender: "men",
    style: "sport",
    movement: "Swiss quartz chronograph",
    caseSize: "44mm",
    caseMaterial: "Black DLC-coated steel",
    strapMaterial: "Perforated leather racing strap",
    waterResistance: "100m",
    dialColor: "Carbon black",
    features: ["1/10th second chronograph", "DLC coating", "Racing strap", "Luminous hands"],
    stock: 11,
  },
  {
    slug: "lumen-mono",
    name: "Lumen Mono",
    brand: "Nord & Co",
    collection: "minimal",
    shortDescription: "A 38mm monochrome watch with a pure white dial, black hands and nothing else.",
    description:
      "Lumen Mono is our most-gifted watch, and it's easy to see why. A pure white dial, matte black hands, a slim 7mm case and a black leather strap. There is no logo on the dial, no date window, no complications. Just the time, presented as cleanly as we know how.",
    price: 24900,
    images: [px(33524465), px(31050002), px(9841018)],
    gender: "unisex",
    style: "minimal",
    movement: "Japanese quartz",
    caseSize: "38mm",
    caseMaterial: "Brushed steel",
    strapMaterial: "Black vegetable-tanned leather",
    waterResistance: "30m",
    dialColor: "White",
    features: ["7mm ultra-slim case", "No-logo dial", "Hardened mineral crystal", "Interchangeable strap"],
    stock: 45,
    featured: true,
  },
  {
    slug: "pale-dial-36",
    name: "Pale Dial 36",
    brand: "Nord & Co",
    collection: "minimal",
    shortDescription: "A softly rounded 36mm case with an eggshell dial and grey suede strap.",
    description:
      "Pale Dial 36 is the smaller sibling of Lumen Mono, built for wrists that prefer restraint. The eggshell dial is matte and warm, the case edges are softly rounded, and the grey suede strap feels like an old favourite from day one.",
    price: 22900,
    images: [px(1697214), px(1697215), px(33524465)],
    gender: "unisex",
    style: "minimal",
    movement: "Japanese quartz",
    caseSize: "36mm",
    caseMaterial: "Brushed steel",
    strapMaterial: "Grey suede leather",
    waterResistance: "30m",
    dialColor: "Eggshell",
    features: ["Rounded case", "Suede strap", "Slim 7.5mm profile", "Two-year warranty"],
    stock: 38,
  },
  {
    slug: "slate-minimal",
    name: "Slate Minimal",
    brand: "Nord & Co",
    collection: "minimal",
    shortDescription: "A moody slate-grey dial in a gunmetal case, on a matching steel mesh bracelet.",
    description:
      "Slate leans darker. A slate-grey dial sits in a gunmetal PVD case on a fine Milanese mesh bracelet that adjusts without tools. It's the minimal watch for people who wear mostly black and want something that doesn't fight for attention.",
    price: 27900,
    images: [px(19838194), px(31050003), px(1697218)],
    gender: "men",
    style: "minimal",
    movement: "Japanese quartz",
    caseSize: "40mm",
    caseMaterial: "Gunmetal PVD steel",
    strapMaterial: "Milanese mesh bracelet",
    waterResistance: "50m",
    dialColor: "Slate grey",
    features: ["Tool-free mesh clasp", "Gunmetal finish", "Sapphire-coated crystal", "Luminous hands"],
    stock: 26,
    isNew: true,
  },
  {
    slug: "rose-petite-32",
    name: "Rosé Petite 32",
    brand: "Nord & Co",
    collection: "minimal",
    shortDescription: "A rose-gold 32mm case with a blush dial and a slim mesh bracelet.",
    description:
      "Rosé Petite is small, warm and quietly confident. The 32mm rose-gold case frames a blush-pink dial with slim baton hands, and the matching mesh bracelet is light enough to forget you're wearing it. Comes with an additional blush leather strap.",
    price: 29500,
    images: [px(14410757), px(34833638), px(25227838)],
    gender: "women",
    style: "minimal",
    movement: "Japanese quartz",
    caseSize: "32mm",
    caseMaterial: "Rose-gold PVD steel",
    strapMaterial: "Rose-gold mesh + blush leather strap",
    waterResistance: "30m",
    dialColor: "Blush",
    features: ["Two straps included", "Slim 6.8mm case", "Rose-gold finish", "Gift box included"],
    stock: 33,
    featured: true,
  },
  {
    slug: "pulse-s2",
    name: "Pulse S2",
    brand: "Vektor",
    collection: "smart",
    shortDescription: "A full-featured smartwatch with AMOLED display, GPS, ECG and 10-day battery life.",
    description:
      "Pulse S2 is the smartwatch that finally looks like a watch. A 1.4-inch AMOLED display sits behind sapphire glass in a slim steel case, tracking heart rate, blood oxygen, sleep and 120 workout modes. GPS is built in, calls and notifications work with iOS and Android, and the battery lasts ten days between charges.",
    price: 34900,
    images: [px(5081914), px(18078983), px(19961771)],
    gender: "unisex",
    style: "smart",
    movement: "Digital, AMOLED display",
    caseSize: "44mm",
    caseMaterial: "Stainless steel, sapphire glass",
    strapMaterial: "Fluoroelastomer sport band",
    waterResistance: "50m (5 ATM)",
    dialColor: "AMOLED",
    features: ["10-day battery", "Built-in GPS", "ECG & SpO2", "iOS & Android"],
    stock: 40,
    featured: true,
  },
  {
    slug: "pulse-lite",
    name: "Pulse Lite",
    brand: "Vektor",
    collection: "smart",
    shortDescription: "Essential health and fitness tracking in a light, colourful 40mm case.",
    description:
      "Pulse Lite strips the smartwatch back to what most people actually use: steps, heart rate, sleep, notifications and a two-week battery. The 40mm aluminium case weighs 28 grams and comes with interchangeable silicone bands in four colours.",
    price: 19900,
    compareAtPrice: 24900,
    images: [px(6612230), px(8217438), px(8217295)],
    gender: "unisex",
    style: "smart",
    movement: "Digital, LCD display",
    caseSize: "40mm",
    caseMaterial: "Aluminium",
    strapMaterial: "Silicone band",
    waterResistance: "50m (5 ATM)",
    dialColor: "Colour LCD",
    features: ["14-day battery", "Sleep tracking", "28g weight", "Four band colours"],
    stock: 60,
  },
  {
    slug: "pulse-titan",
    name: "Pulse Titan",
    brand: "Vektor",
    collection: "smart",
    shortDescription: "A titanium smartwatch built for endurance athletes, with dual-band GPS and a 21-day battery.",
    description:
      "Pulse Titan is for people who go further. A grade-5 titanium case, sapphire glass, dual-band GPS for accurate tracking in cities and canyons, and a 21-day battery in smartwatch mode. Offline maps, altitude and barometric sensors, and a training load engine that tells you when to push and when to rest.",
    price: 44900,
    images: [px(18078986), px(5237706), px(18078983)],
    gender: "unisex",
    style: "smart",
    movement: "Digital, AMOLED display",
    caseSize: "46mm",
    caseMaterial: "Grade-5 titanium",
    strapMaterial: "Nylon loop + silicone band",
    waterResistance: "100m (10 ATM)",
    dialColor: "AMOLED",
    features: ["21-day battery", "Dual-band GPS", "Offline maps", "Titanium case"],
    stock: 20,
    isNew: true,
  },
];

type ReviewSeed = {
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  daysAgo: number;
};

const reviewPools: Record<ProductSeed["style"], ReviewSeed[]> = {
  dress: [
    { author: "James Whitfield", location: "London, UK", rating: 5, title: "Punches far above its price", body: "I've owned watches costing three times as much and this one gets more compliments. The dial finishing is genuinely lovely in person and the strap softened up within a week.", daysAgo: 12 },
    { author: "Priya Nair", location: "Toronto, CA", rating: 5, title: "Bought it for my father's 60th", body: "He hasn't taken it off. The packaging made the moment feel special and the engraving option was a nice touch. Delivery was two days early.", daysAgo: 27 },
    { author: "Marcus Chen", location: "San Francisco, US", rating: 4, title: "Elegant, slightly dressy for daily wear", body: "Beautiful watch. I wear it to the office and dinners. Docking a star only because I wish the clasp were a deployant on the base model.", daysAgo: 45 },
    { author: "Sofia Romano", location: "Milan, IT", rating: 5, title: "Sits perfectly under a cuff", body: "Slim, light and the proportions are exactly right. It looks far more expensive than it was. Would absolutely buy from Watches World again.", daysAgo: 61 },
    { author: "Daniel Okafor", location: "Lagos, NG", rating: 4, title: "Great first 'real' watch", body: "Sapphire crystal, automatic movement, proper leather — at this price it's hard to argue. The lume is minimal but that's expected on a dress watch.", daysAgo: 88 },
  ],
  sport: [
    { author: "Tom Bradley", location: "Sydney, AU", rating: 5, title: "Took it diving in Bali — flawless", body: "Bezel action is crisp, lume is bright all night, and the bracelet extension actually works over a 5mm wetsuit. Genuinely impressed for the money.", daysAgo: 9 },
    { author: "Elena Petrova", location: "Berlin, DE", rating: 5, title: "My everyday watch now", body: "I wanted one watch for gym, work and weekends. This is it. Accurate to about +3 seconds a day and it's survived a few knocks without a mark.", daysAgo: 33 },
    { author: "Ryan Mitchell", location: "Austin, US", rating: 4, title: "Heavy but in a good way", body: "It's got presence on the wrist. Bracelet is solid and the clasp feels premium. If you have a small wrist consider trying it on first.", daysAgo: 50 },
    { author: "Aiden Walsh", location: "Dublin, IE", rating: 5, title: "Best value sports watch I've owned", body: "Finishing is way beyond what I expected. The brushed and polished transitions are sharp and the dial colour changes beautifully through the day.", daysAgo: 72 },
    { author: "Lucas Ferreira", location: "Lisbon, PT", rating: 4, title: "Great watch, strap took time", body: "The watch itself is superb. The rubber strap was a bit stiff initially but softened after a couple of weeks of wear.", daysAgo: 104 },
  ],
  minimal: [
    { author: "Hannah Kim", location: "Seoul, KR", rating: 5, title: "Exactly what a minimal watch should be", body: "No branding, no clutter, just clean lines. It goes with literally every outfit I own. I've bought two more as gifts.", daysAgo: 6 },
    { author: "Oliver Brandt", location: "Copenhagen, DK", rating: 5, title: "So thin you forget it's there", body: "I've never worn a watch consistently before this one. It's light, it looks great and I get asked about it constantly.", daysAgo: 21 },
    { author: "Maya Patel", location: "Manchester, UK", rating: 4, title: "Lovely, wish it had lume", body: "Design is perfect. Only thing I'd change is a touch of lume on the hands for evenings. Strap quality is excellent.", daysAgo: 39 },
    { author: "Noah Williams", location: "Chicago, US", rating: 5, title: "Great student watch", body: "Affordable, classy and durable enough for campus life. The mesh bracelet adjusts without tools which is a lifesaver.", daysAgo: 58 },
    { author: "Isabelle Laurent", location: "Paris, FR", rating: 5, title: "Perfect proportions", body: "The 36mm size is spot on for my wrist. The dial has a warm, matte quality that photos don't capture.", daysAgo: 93 },
  ],
  smart: [
    { author: "Chris Nolan", location: "Denver, US", rating: 5, title: "Finally a smartwatch that looks like a watch", body: "Battery genuinely lasts over a week, GPS locks in seconds and the steel case doesn't scream 'gadget'. Sleep tracking has been eye-opening.", daysAgo: 8 },
    { author: "Amara Osei", location: "Accra, GH", rating: 4, title: "Great tracking, app could be better", body: "Hardware is excellent — bright screen, accurate heart rate. The companion app works fine but the UI is a little dated.", daysAgo: 24 },
    { author: "Jake Thompson", location: "Vancouver, CA", rating: 5, title: "Marathon training companion", body: "Used it for a full 16-week training block. Dual-band GPS is noticeably more accurate downtown and the training load feature is legit useful.", daysAgo: 41 },
    { author: "Zoe Martin", location: "Melbourne, AU", rating: 5, title: "My 16-year-old loves it", body: "Bought as a birthday gift. Easy to set up with her phone, the band colours are fun and it's survived netball season.", daysAgo: 66 },
    { author: "Leo Fischer", location: "Zurich, CH", rating: 4, title: "Solid all-rounder", body: "Does everything I need — notifications, workouts, payments. Screen is crisp. Slightly wish it charged faster.", daysAgo: 97 },
  ],
};

export function reviewsForProduct(product: ProductSeed, index: number): ReviewSeed[] {
  const pool = reviewPools[product.style];
  const count = 3 + (index % 3); // 3-5 reviews
  const start = index % pool.length;
  const out: ReviewSeed[] = [];
  for (let i = 0; i < count; i++) {
    const r = pool[(start + i) % pool.length];
    out.push({ ...r, daysAgo: r.daysAgo + index * 2 });
  }
  return out;
}
