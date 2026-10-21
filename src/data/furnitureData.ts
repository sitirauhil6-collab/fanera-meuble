import { Product, StoreSettings } from '../types/furniture';

export const initialStoreSettings: StoreSettings = {
  storeName: 'Fanera Meuble',
  tagline: 'Perajin Furnitur Kayu Solid & Mebel Eksklusif Jepara',
  sellerWhatsApp: '6281234567890',
  workshopAddress: 'Jl. R.A. Kartini No. 88, Bapangan, Jepara, Jawa Tengah & Showroom Gandaria, Jakarta Selatan',
  bankAccountBCA: 'BCA 0840 9921 82 a.n Fanera Meuble',
  bankAccountMandiri: 'Mandiri 1370 0192 8812 a.n Fanera Meuble',
  shippingNote: 'Armada truk khusus ekspedisi mebel berkain pelindung tebal untuk seluruh Pulau Jawa & Bali. Pengiriman kontainer pelabuhan untuk luar pulau.'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-aruna-chair',
    name: 'Kursi Santai Jati & Rotan Alami "Aruna"',
    category: 'ruang-tamu',
    price: 2450000,
    woodType: 'Kayu Jati Perhutani (TPK Grade A)',
    dimensions: '68 x 75 x 78 cm (Tinggi Duduk 40 cm)',
    weightEstKg: 14,
    image: '/src/assets/images/product_teak_lounge_chair_1792587645629.jpg',
    shortDescription: 'Kursi santai berdesain modern Japandi dengan sandaran dan dudukan anyaman rotan asli Jepara.',
    fullDescription: 'Dibuat dari kayu jati TPK Perhutani pilihan berkadar air rendah (<12%) sehingga tahan muai dan bebas retak. Sandaran dan dudukan dianyam rapat dengan tangan menggunakan rotan alami jenis manau grade premium yang lentur dan sejuk saat diduduki berjam-jam.',
    stock: 4,
    isPreOrder: false,
    isFeatured: true,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Bleached Teak (Scandinavian Light)',
      'Deep Charcoal Satin'
    ],
    joineryDetails: 'Sambungan purus pasak (Mortise and Tenon) tradisional tanpa baut ekspos untuk kekuatan struktural puluhan tahun.'
  },
  {
    id: 'prod-suar-dining',
    name: 'Meja Makan Solid Wood Suar "Nirmala" 6-8 Kursi',
    category: 'ruang-makan',
    price: 7800000,
    woodType: 'Kayu Suar / Trembesi Alami',
    dimensions: '200 x 90 x 76 cm (Tebal Daun 7.5 cm)',
    weightEstKg: 85,
    image: '/src/assets/images/product_suar_dining_table_1792587646515.jpg',
    shortDescription: 'Meja makan slab solid utuh satu lembaran kayu suar dengan kontur tepian alami (live edge).',
    fullDescription: 'Menghadirkan keagungan serat kayu alami ke ruang makan Anda. Daun meja dibuat dari satu potongan kayu suar utuh tanpa sambungan lem tengah, ditopang oleh kaki silang hollow steel berlapis matte powder coating anti-gores dan anti-karat.',
    stock: 2,
    isPreOrder: false,
    isFeatured: true,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Deep Charcoal Satin'
    ],
    joineryDetails: 'Slot baut ekspansi di bawah permukaan daun meja agar kayu leluasa bernapas secara alami tanpa melengkung.'
  },
  {
    id: 'prod-kalyana-credenza',
    name: 'Kredensa Tambour Sungkai "Kalyana"',
    category: 'ruang-tamu',
    price: 4650000,
    woodType: 'Kayu Sungkai Solid',
    dimensions: '160 x 45 x 75 cm',
    weightEstKg: 38,
    image: '/src/assets/images/product_sungkai_credenza_1792587646762.jpg',
    shortDescription: 'Kabinet sideboard dengan pintu geser bilah kayu halus (tambour slats) bergaya Skandinavia tropis.',
    fullDescription: 'Kayu sungkai solid dengan guratan serat cerah alami dan karakter minimalis bersih. Pintu geser fleksibel tambour meluncur mulus mengikuti rel lengkung, dilengkapi rak dalam bertingkat dengan lubang instalasi kabel audio/TV tersembunyi.',
    stock: 3,
    isPreOrder: false,
    isFeatured: true,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Bleached Teak (Scandinavian Light)',
      'Walnut Brown (Hangat Elegan)'
    ],
    joineryDetails: 'Rangka mitered joint 45 derajat diperkuat biskuit kayu dan rel geser kayu berlilin organik tanpa macet.'
  },
  {
    id: 'prod-laras-bed',
    name: 'Dipan Platform Minimalis Jati "Laras" King Size',
    category: 'kamar-tidur',
    price: 8900000,
    woodType: 'Kayu Jati Perhutani (TPK Grade A)',
    dimensions: '180 x 200 x 85 cm (Matras 180x200)',
    weightEstKg: 72,
    image: '/src/assets/images/product_teak_platform_bed_1792587647046.jpg',
    shortDescription: 'Tempat tidur kayu jati solid berprofil melayang (floating effect) dengan sandaran kepala ergonomis.',
    fullDescription: 'Rancangan tempat tidur bergaya zen minimalis dengan pinggiran platform kayu tebal yang kokoh. Memberikan ketenangan istirahat maksimal karena konstruksi terkunci presisi tanpa derit (anti-squeak guarantee).',
    stock: 1,
    isPreOrder: true,
    preOrderDays: 14,
    isFeatured: true,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Bleached Teak (Scandinavian Light)'
    ],
    joineryDetails: 'Knockdown precision fitting berstandar ekspor memudahkan perakitan di kamar tanpa merusak serat kayu.'
  },
  {
    id: 'prod-sarasvati-desk',
    name: 'Meja Kerja & Belajar Kayu Jati "Sarasvati"',
    category: 'ruang-kerja',
    price: 3850000,
    woodType: 'Kayu Jati Perhutani (TPK Grade A)',
    dimensions: '140 x 60 x 75 cm',
    weightEstKg: 32,
    image: '/src/assets/images/hero_furniture_living_1792587645572.jpg',
    shortDescription: 'Meja kerja ramping proporsional dengan 2 laci penyimpanan soft-close dan kabel-tray rapi.',
    fullDescription: 'Dirancang untuk produktivitas di rumah maupun kantor eksekutif. Permukaan daun meja jati halus dilapisi pelindung anti-noda kopi/air. Sudut meja dibulatkan (rounded bevel edge) sehingga nyaman untuk pergelangan tangan saat mengetik.',
    stock: 5,
    isPreOrder: false,
    isFeatured: false,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Deep Charcoal Satin'
    ],
    joineryDetails: 'Laci dengan konstruksi ekor burung (Dovetail joint) tradisional yang terkenal paling kokoh di dunia perkayuan.'
  },
  {
    id: 'prod-bumi-coffee-table',
    name: 'Coffee Table Bundar Fluted Jati "Bumi"',
    category: 'ruang-tamu',
    price: 1950000,
    woodType: 'Kayu Jati Perhutani (TPK Grade A)',
    dimensions: 'Diameter 80 cm x Tinggi 42 cm',
    weightEstKg: 18,
    image: '/src/assets/images/hero_furniture_living_1792587645572.jpg',
    shortDescription: 'Meja tamu bundar dengan alas pilar bertekstur galur (fluted wood) yang artistik.',
    fullDescription: 'Titik vokal sempurna untuk ruang santai keluarga. Bentuk bundar mempermudah sirkulasi lalu lalang di ruang tamu tanpa khawatir tersandung sudut tajam, aman untuk anak kecil.',
    stock: 6,
    isPreOrder: false,
    isFeatured: false,
    finishingOptions: [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Deep Charcoal Satin'
    ],
    joineryDetails: 'Penyusunan bilah fluted melingkar simetris di atas dasar kayu solid penyeimbang anti guncang.'
  }
];

export const woodGuides = [
  {
    name: 'Kayu Jati (Teak)',
    character: 'Kadar minyak alami tinggi, sangat tahan rayap, urat tegas berwarna cokelat keemasan.',
    durability: 'Kelas Kuat I & Kelas Awet I (Tahan 30+ Tahun)',
    recommendation: 'Sangat ideal untuk kursi lounge, dipan, dan perabot warisan keluarga.'
  },
  {
    name: 'Kayu Sungkai',
    character: 'Warna terang krem keputihan dengan alur serat lurus teratur yang lembut.',
    durability: 'Kelas Kuat II & Awet III (Oven Kering Stabil)',
    recommendation: 'Pilihan favorit interior minimalis kontemporer, Japandi, dan Skandinavia.'
  },
  {
    name: 'Kayu Suar (Trembesi)',
    character: 'Potongan tebal megah dengan tepian live edge alami dan transisi warna dramatis.',
    durability: 'Kelas Kuat II (Bobot sangat padat dan kokoh)',
    recommendation: 'Ikonik untuk meja makan jamuan pesta, meja rapat, atau konsol lobi.'
  }
];
