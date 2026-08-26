// Branch network grouped by Region -> Area (from the church's records).
export interface AreaGroup { area: string; branches: string[]; }
export interface RegionGroup { region: string; count: number; areas: AreaGroup[]; }

export const branchNetwork: RegionGroup[] = [
  {
    "region": "Accra West",
    "count": 23,
    "areas": [
      {
        "area": "Kwashieman",
        "branches": [
          "Kwashieman",
          "Techiman",
          "Tetegu",
          "New Mamprobi"
        ]
      },
      {
        "area": "Ablekuma",
        "branches": [
          "Glefe",
          "Manhja",
          "Ablekuma",
          "Omanjor",
          "Joma",
          "Oshuman"
        ]
      },
      {
        "area": "Israel",
        "branches": [
          "Israel",
          "Alajo",
          "Amasaman",
          "Sapeiman",
          "Ashalaja",
          "Peace Village",
          "Kwabenya",
          "Pokuase",
          "Haatso",
          "Comet",
          "Ashongman",
          "Hobor",
          "Kofi Kwei"
        ]
      }
    ]
  },
  {
    "region": "Accra East",
    "count": 34,
    "areas": [
      {
        "area": "Ashaiman",
        "branches": [
          "Ashaiman Central",
          "Zenu",
          "Sun City",
          "Official Town",
          "Mataheko",
          "Santo",
          "ShaiHills",
          "New Jerusalem",
          "Shai Hills",
          "New Ningo",
          "Miotso",
          "Dawhenya",
          "Prampram",
          "Tema Newtown"
        ]
      },
      {
        "area": "Washington",
        "branches": [
          "Washington",
          "Israel",
          "Katamanso",
          "Gbetsile",
          "Peace land",
          "Promise Land",
          "Apollonia",
          "Gbetsile Fire -Service down",
          "Gbetsile Samco",
          "New land",
          "Police Assembly",
          "Mexico Assembly"
        ]
      },
      {
        "area": "Madina",
        "branches": [
          "Legon Madina",
          "Oyibi",
          "Panthang",
          "Dodowa"
        ]
      },
      {
        "area": "Baatsona",
        "branches": [
          "Baatsona",
          "Teshie Laskala",
          "Nana Krom",
          "Lakeside"
        ]
      }
    ]
  },
  {
    "region": "Central",
    "count": 14,
    "areas": [
      {
        "area": "Kasoa",
        "branches": [
          "Kasoa",
          "Nyanyano",
          "Koklobitey",
          "Akweyti",
          "Adom Estate",
          "Papase",
          "Adawukwa"
        ]
      },
      {
        "area": "Cape Coast",
        "branches": [
          "Cape Coast",
          "Takoradi",
          "Winneba",
          "Bronyibima",
          "Kwaprow",
          "Abakem",
          "Bantuma"
        ]
      }
    ]
  },
  {
    "region": "Volta East",
    "count": 27,
    "areas": [
      {
        "area": "Ho",
        "branches": [
          "Ho Central",
          "Dave",
          "Ziope",
          "English Assembly",
          "Hofedo",
          "Dzolokpuita",
          "Taviefe",
          "Sokode",
          "Abutia"
        ]
      },
      {
        "area": "Adaklu",
        "branches": [
          "Adaklu",
          "Sikaman",
          "Ahuda",
          "Kodeabe",
          "Adaklu Hehekpe",
          "Adidome",
          "Mafe Kumase",
          "Kplordu",
          "Dovie kope",
          "Norgbedzi Kofe",
          "Akatsi",
          "Denu",
          "Sogakope",
          "Sokpe"
        ]
      },
      {
        "area": "Tokokoe",
        "branches": [
          "Tokokoe",
          "Hodzo",
          "Akoefe",
          "Atikpui"
        ]
      }
    ]
  },
  {
    "region": "Volta West",
    "count": 21,
    "areas": [
      {
        "area": "Peki",
        "branches": [
          "Peki Central",
          "Peki Dzake",
          "Kpeve",
          "Wudome",
          "Hohoe",
          "Kpando",
          "Kudzra",
          "Dodo Amanfrom",
          "Vedeme",
          "Kpala",
          "Akakpo"
        ]
      },
      {
        "area": "Juapong",
        "branches": [
          "Juapong",
          "New Powmu",
          "Kponkpo",
          "Frankadua",
          "Asikuma",
          "Toh-Kpalime",
          "Sanga",
          "Kaira",
          "Dzemeni",
          "Gbodokope"
        ]
      }
    ]
  },
  {
    "region": "Other Areas & International",
    "count": 79,
    "areas": [
      {
        "area": "Nsawam",
        "branches": [
          "Nsawam",
          "Akpalebu",
          "Lartei",
          "Fotobi",
          "Ahodwo Ketewa",
          "Opare-Krom",
          "Obotwere",
          "Kotoku",
          "Adeiso",
          "Sakyikrom",
          "Pakro",
          "Dzatsui",
          "Ahodwo",
          "Suhum",
          "Asamankese",
          "Koforidua",
          "Teacher Mante",
          "Akim Oda"
        ]
      },
      {
        "area": "Northern",
        "branches": [
          "Tamale",
          "Kpandai",
          "Balai",
          "Bolga",
          "Wa",
          "Zabzugu"
        ]
      },
      {
        "area": "Kumasi",
        "branches": [
          "Kumasi Asabi",
          "Sokobang",
          "Sunyani",
          "Yeji",
          "Logah Kope",
          "Agor Kope",
          "Tonka",
          "Prang",
          "Kunkunde",
          "Freetown",
          "Koklutsu kope"
        ]
      },
      {
        "area": "Asutuare",
        "branches": [
          "Asutsuare",
          "Somanya",
          "Akuse",
          "Kpong",
          "Akrade",
          "Volivo",
          "Abuvienu",
          "Klebuse",
          "Factory (Estate)",
          "Alabo",
          "Sege",
          "Dedukope",
          "Lolonya"
        ]
      },
      {
        "area": "United Kingdom",
        "branches": [
          "Andover",
          "Trowbridge",
          "Mehan Mekshan",
          "Edgware",
          "Tothenham"
        ]
      },
      {
        "area": "Togo-Nigeria",
        "branches": [
          "Lome",
          "Zankara",
          "Seme-Nigeria",
          "Tomegbe",
          "LadeKope",
          "Galikope",
          "Teponi",
          "Amou Oblo",
          "Agbetikor",
          "Agripa Tadzi",
          "Kpalime",
          "Agou Nyogbo",
          "Akpadafe"
        ]
      },
      {
        "area": "International Missions",
        "branches": [
          "Liberia",
          "GS Road",
          "Gambia",
          "South Africa",
          "Siera Leone",
          "South Sudan",
          "Gok Machar",
          "Aweil Town",
          "Ahuu, Maluul Centre",
          "Mabior Rit",
          "Nyamlel",
          "Maluil Ariath",
          "Malual Loch"
        ]
      }
    ]
  }
];

export const totalBranches = branchNetwork.reduce((n, r) => n + r.count, 0);
