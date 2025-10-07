// src/data/data.ts

export interface MultiLangString {
  fr: string;
  en: string;
  wo: string;
}

export interface Quiz {
  question: MultiLangString;
  options: {
    fr: string[];
    en: string[];
    wo: string[];
  };
  correctAnswer: number;
}

export interface Artwork {
  id: string;
  title: MultiLangString;
  description: MultiLangString;
  audioUrl: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
  history: MultiLangString;
  arModel: string;
  culturalSignificance: MultiLangString;
  period: string;
  origin: string;
  quiz: Quiz;
}

export const artworks: Artwork[] = [
  {
    id: 'oeuvre1',
    title: {
      fr: 'Masque Cérémoniel Wolof',
      en: 'Wolof Ceremonial Mask',
      wo: 'Masque bu Wolof',
    },
    description: {
      fr: "Ce masque sacré était utilisé lors des cérémonies d'initiation Wolof. Sculpté dans du bois d'ébène, il représente les ancêtres et la sagesse transmise à travers les générations. Les motifs géométriques symbolisent l'harmonie entre le monde physique et spirituel.",
      en: 'This sacred mask was used during Wolof initiation ceremonies. Carved from ebony wood, it represents ancestors and wisdom passed through generations. The geometric patterns symbolize harmony between the physical and spiritual worlds.',
      wo: "Masque bii dafa nekk bu njool ci seremoni yu initiation yu Wolof. Dafa sedd ci bant bu ñuul, te dafa mel ni ay maam-maam ak xam-xam buy jàpp ci wet wi ci wet. Motif yi dañuy wone jëkkando bu am ci àdduna bi ñuy gis ak bi ñuy xamul.",
    },
    audioUrl: '/mock-audio-mask.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageUrl: '../../assets/oeuvre0.jpg',
    category: 'Art Wolof',
    history: {
      fr: "XVIIIe siècle : Création par les maîtres sculpteurs de la région de Kaolack. Le masque était gardé par le chef spirituel du village et transmis de génération en génération. Il jouait un rôle central dans les rites de passage vers l'âge adulte.",
      en: '18th century: Created by master sculptors from the Kaolack region. The mask was kept by the village spiritual leader and passed down through generations. It played a central role in coming-of-age rituals.',
      wo: "Ñeel 18: Dafa sedd ci kanam say maître sculpteur yu Kaolack. Boroom kersa gi ngi koy tëral te jox ci wet wi ci wet. Dafa am njëg bu mag ci seremoni yu jàpp ci dund bi.",
    },
    arModel: '/models/mask.gltf',
    culturalSignificance: {
      fr: "Le masque incarne la connexion spirituelle avec les ancêtres et sert de pont entre les mondes. Les Wolof croient que porter ce masque permet de recevoir la sagesse des aînés disparus.",
      en: 'The mask embodies spiritual connection with ancestors and serves as a bridge between worlds. The Wolof believe that wearing this mask allows one to receive wisdom from departed elders.',
      wo: "Masque bi dafa mel ni jëkkando bu kersa ak say maam-maam, te dafa mel ni pont bu jël àdduna yi. Wolof dañuy gëm ne di bàyyi masque bii dafa jamontal xam-xam bu seen mag-mag.",
    },
    period: '1750-1800',
    origin: 'Kaolack, Sénégal',
    quiz: {
      question: {
        fr: 'À quelle occasion ce masque était-il utilisé?',
        en: 'On what occasion was this mask used?',
        wo: 'Masque bii dañu koy jëfandikoo ci lan?',
      },
      options: {
        fr: ['Mariages', "Cérémonies d'initiation", 'Funérailles', 'Fêtes de récolte'],
        en: ['Weddings', 'Initiation ceremonies', 'Funerals', 'Harvest festivals'],
        wo: ['Takkusaan', 'Seremoni yu initiation', 'Tey', 'Fête yu ngaay'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre2',
    title: {
      fr: 'Statue de Fécondité Sérère',
      en: 'Serer Fertility Statue',
      wo: 'Statue bu Fécondité yu Sérère',
    },
    description: {
      fr: "Cette sculpture emblématique représente une mère portant son enfant. Elle symbolise la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospérité.",
      en: 'This iconic sculpture depicts a mother carrying her child. It symbolizes fertility, motherhood, and the continuity of life in Serer culture. The prominent breasts and rounded belly evoke abundance and prosperity.',
      wo: "Sculpture bii dafa wone beneen yaay buy dàq xale. Dafa mel ni fécondité, yaayam, ak continuité bu dund ci culture Sérère. Neen yi am ci kanam ak biir bu ronn dañuy wone yoom ak njariñ.",
    },
    audioUrl: '/mock-audio-statue.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    imageUrl: '../../assets/oeuvre1.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XIXe siècle : Sculptée pour honorer la déesse de la fertilité Kokh Kox. Cette statue était placée dans les sanctuaires familiaux et les femmes venaient y prier pour avoir des enfants.",
      en: '19th century: Carved to honor the fertility goddess Kokh Kox. This statue was placed in family shrines and women came to pray for children.',
      wo: "Ñeel 19: Sedd ngir rend honneur ci dieu bu fécondité Kokh Kox. Statue bii dañu koy des ci sanctuaire yu njëkk te jigéen dañuy ñëw naan ngir am doom.",
    },
    arModel: '/models/statue.gltf',
    culturalSignificance: {
      fr: "Dans la cosmogonie Sérère, la femme est au centre de la perpétuation de la vie. Cette statue est vénérée comme un symbole sacré de la transmission générationnelle.",
      en: 'In Serer cosmogony, women are at the center of perpetuating life. This statue is venerated as a sacred symbol of generational transmission.',
      wo: "Ci cosmogonie Sérère, jigéen dafa nekk ci digg bu perpétuation bu dund. Statue bii dañu koy naan te mel ni ndigël bu boroom barke bu transmission bu wet ci wet.",
    },
    period: '1850-1900',
    origin: 'Thiès, Sénégal',
    quiz: {
      question: {
        fr: 'Quelle déesse cette statue honore-t-elle?',
        en: 'Which goddess does this statue honor?',
        wo: 'Lan môy tur dieu buy statue bii rend honneur?',
      },
      options: {
        fr: ['Mame Coumba', 'Kokh Kox', 'Yaye Boye', 'Maam Kumba Bang'],
        en: ['Mame Coumba', 'Kokh Kox', 'Yaye Boye', 'Maam Kumba Bang'],
        wo: ['Mame Coumba', 'Kokh Kox', 'Yaye Boye', 'Maam Kumba Bang'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre3',
    title: {
      fr: 'Tapisserie Peule "Migration du Peuple"',
      en: 'Fulani Tapestry "Migration of the People"',
      wo: 'Tapisserie Peul "Démeneer bu Nit ñi"',
    },
    description: {
      fr: "Cette se la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospérité se la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospéritése la fertilité, la maternité et la continuité de la vie dans la culture Sérère. Les seins proéminents et le ventre rond évoquent l'abondance et la prospérité tapisserie colorée raconte l'histoire des migrations des Peuls à travers l'Afrique de l'Ouest. Tissée à la main avec des fibres naturelles teintes, elle illustre les troupeaux, les caravanes et les paysages traversés.",
      en: 'This colorful tapestry tells the story of Fulani migrations across West Africa. Hand-woven with dyed natural fibers, it illustrates herds, caravans, and landscapes traversed.',
      wo: "Tapisserie bii bu am melo dafa xalaat historia bu démeneeru Peul ci Afrique de l'Ouest. Dafa sedd ci loxo ak fibre yu nàtt bu des couleur, te dafa wone say nag, caravane ak paysage yu jël.",
    },
    audioUrl: '/mock-audio-tapestry.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    imageUrl: '../../assets/oeuvre2.jpg',
    category: 'Art Textiles',
    history: {
      fr: "XXe siècle : Créée par des artisanes Peules de Matam, cette tapisserie témoigne des routes ancestrales empruntées par les bergers nomades. Chaque motif représente une étape clé du voyage.",
      en: '20th century: Created by Fulani artisans from Matam, this tapestry bears witness to ancestral routes taken by nomadic herders. Each pattern represents a key stage of the journey.',
      wo: "Ñeel 20: Sedd ci kanam say artisan Peul yu Matam, tapisserie bii dafa wone yoon bu maam-maam yu berger nomade. Bëpp motif dafa mel ni étape bu mag ci joola bi.",
    },
    arModel: '/models/tapestry.gltf',
    culturalSignificance: {
      fr: "Les Peuls sont un peuple nomade dont l'identité est liée aux grandes migrations pastorales. Cette œuvre célèbre la résilience et l'adaptabilité de cette communauté.",
      en: 'The Fulani are a nomadic people whose identity is linked to great pastoral migrations. This work celebrates the resilience and adaptability of this community.',
      wo: "Peul dañu ñuy démeneeru te seen identité dafa jël ak démeneer bu mag bu pastorale. Liggéey bii dafa wone résistance ak adaptation bu communauté bii.",
    },
    period: '1920-1950',
    origin: 'Matam, Sénégal',
    quiz: {
      question: {
        fr: 'Que représente principalement cette tapisserie?',
        en: 'What does this tapestry mainly represent?',
        wo: 'Lan môy tapisserie bii wone ci kanam?',
      },
      options: {
        fr: ['Des batailles', 'Des migrations', 'Des mariages', 'Des récoltes'],
        en: ['Battles', 'Migrations', 'Weddings', 'Harvests'],
        wo: ['Xare', 'Démeneer', 'Takkusaan', 'Ngaay'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre4',
    title: {
      fr: 'Tambour Sabar du Ndawrabine',
      en: 'Sabar Drum of Ndawrabine',
      wo: 'Sabar bu Ndawrabine',
    },
    description: {
      fr: "Le sabar est bien plus qu'un instrument : c'est le cœur battant de la culture wolof. Ce tambour spécifique, appelé Ndawrabine, accompagne les grandes cérémonies et les danses traditionnelles. Son son puissant porte les messages des ancêtres.",
      en: 'The sabar is more than an instrument: it is the beating heart of Wolof culture. This specific drum, called Ndawrabine, accompanies major ceremonies and traditional dances. Its powerful sound carries messages from ancestors.',
      wo: "Sabar dafa gën ci instrument: môy xol buy dawal ci culture Wolof. Sabar bii, buy tuddu Ndawrabine, dafa jël ak seremoni yu mag ak saytu bu aada. Son bi am doole dafa laal batal yu maam-maam.",
    },
    audioUrl: '/mock-audio-drum.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    imageUrl: '../../assets/oeuvre3.jpg',
    category: 'Art Wolof',
    history: {
      fr: "Le sabar existe depuis des siècles dans la tradition wolof. Ce Ndawrabine particulier a été fabriqué dans les années 1960 par un maître luthier de Dakar et a accompagné d'innombrables célébrations.",
      en: 'The sabar has existed for centuries in Wolof tradition. This particular Ndawrabine was made in the 1960s by a master craftsman from Dakar and has accompanied countless celebrations.',
      wo: "Sabar am na ci aada Wolof jamano yu bare. Ndawrabine bii sedd na ci at 1960 ci kanam maître luthier bu Dakar te jël na fête yu bari baax.",
    },
    arModel: '/models/drum.gltf',
    culturalSignificance: {
      fr: "Le sabar est utilisé pour communiquer, célébrer, et connecter les vivants aux esprits. Chaque rythme raconte une histoire, exprime une émotion ou transmet un enseignement.",
      en: 'The sabar is used to communicate, celebrate, and connect the living to spirits. Each rhythm tells a story, expresses an emotion, or transmits a teaching.',
      wo: "Sabar dañu koy jëfandikoo ngir waxtaan, fete, ak jël nit ñuy dund ak say rab. Bëpp rythme dafa xalaat beneen historia, wone beneen sentiment, wala laal xam-xam.",
    },
    period: '1960-1970',
    origin: 'Dakar, Sénégal',
    quiz: {
      question: {
        fr: 'À quoi sert principalement le sabar?',
        en: 'What is the sabar mainly used for?',
        wo: 'Lan môy sabar jëfandikoo ci kanam?',
      },
      options: {
        fr: ['Décoration', 'Communication et célébration', 'Commerce', 'Construction'],
        en: ['Decoration', 'Communication and celebration', 'Trade', 'Construction'],
        wo: ['Décoration', 'Waxtaan ak fete', 'Jàllante', 'Construction'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre5',
    title: {
      fr: 'Peinture "Résistance" - Hommage aux Femmes Africaines',
      en: 'Painting "Resistance" - Tribute to African Women',
      wo: 'Peinture "Résistance" - Honneur ci Jigéen yu Afrique',
    },
    description: {
      fr: "Cette peinture contemporaine célèbre le rôle des femmes africaines dans les luttes d'indépendance et la construction des nations. Les couleurs vives et les silhouettes puissantes évoquent la force, la dignité et la détermination.",
      en: 'This contemporary painting celebrates the role of African women in independence struggles and nation-building. The vibrant colors and powerful silhouettes evoke strength, dignity, and determination.',
      wo: "Peinture bii bu leew dafa rend honneur ci njëg bu jigéen yu Afrique ci xare yu indépendance ak construction bu nation. Melo yu baax ak silhouette yu doole dañuy wone doole, njariñ ak détermination.",
    },
    audioUrl: '/mock-audio-painting.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    imageUrl: '../../assets/oeuvre4.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XXIe siècle : Peinte par une artiste sénégalaise moderne, cette œuvre s'inscrit dans un mouvement de redécouverte et de célébration des héroïnes oubliées de l'histoire africaine.",
      en: '21st century: Painted by a modern Senegalese artist, this work is part of a movement to rediscover and celebrate forgotten heroines of African history.',
      wo: "Ñeel 21: Peinture sedd na ci kanam beneen artiste sénégalais bu leew, liggéey bii dafa nekk ci mouvement bu gis ak rend honneur ci héroïne yu yaatal ci historia Afrique.",
    },
    arModel: '/models/painting.gltf',
    culturalSignificance: {
      fr: "Les femmes ont toujours été au cœur des transformations sociales en Afrique. Cette peinture rappelle leurs sacrifices et leur contribution essentielle à la liberté.",
      en: 'Women have always been at the heart of social transformations in Africa. This painting recalls their sacrifices and essential contribution to freedom.',
      wo: "Jigéen nekk na ci kanam ci bëpp transformation sociale ci Afrique. Peinture bii dafa rapp seen sacrifice ak seen njëg bu mag ci liberté.",
    },
    period: '2010-2020',
    origin: 'Dakar, Sénégal',
    quiz: {
      question: {
        fr: 'Que célèbre cette peinture?',
        en: 'What does this painting celebrate?',
        wo: 'Lan môy peinture bii fete?',
      },
      options: {
        fr: ['La nature', 'Les femmes africaines résistantes', 'Les traditions', 'Les récoltes'],
        en: ['Nature', 'Resilient African women', 'Traditions', 'Harvests'],
        wo: ['Nàtt', 'Jigéen yu Afrique yu résistant', 'Aada', 'Ngaay'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre6',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre5.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre7',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre7.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre8',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre8.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre9',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre9.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre10',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre10.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre11',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre11.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre12',
    title: {
      fr: 'Collier Royal Mandingue',
      en: 'Mandinka Royal Necklace',
      wo: 'Collier Royal Mandingue',
    },
    description: {
      fr: "Ce collier en or et perles de corail était porté par les rois Mandingues lors des grandes audiences. Chaque perle symbolise une qualité royale : sagesse, courage, justice et générosité.",
      en: 'This gold and coral bead necklace was worn by Mandinka kings during major audiences. Each bead symbolizes a royal quality: wisdom, courage, justice, and generosity.',
      wo: "Collier bii ci wor ak perle yu corail dañu koy bàyyi burr Mandingue ci audience yu mag. Bëpp perle dafa mel ni beneen qualité royal: xam-xam, fit, justice ak yeneen.",
    },
    audioUrl: '/mock-audio-necklace.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    imageUrl: '../../assets/oeuvre12.jpg',
    category: 'Histoire Panafricaine',
    history: {
      fr: "XVIe siècle : Créé pour l'empire du Mali à son apogée. Ce collier représente la richesse et le pouvoir des grands empires d'Afrique de l'Ouest.",
      en: '16th century: Created for the Mali Empire at its peak. This necklace represents the wealth and power of the great West African empires.',
      wo: "Ñeel 16: Sedd ngir empire Mali ci yoon bi gën. Collier bii dafa wone alal ak doole bu empire yu mag yu Afrique de l'Ouest.",
    },
    arModel: '/models/necklace.gltf',
    culturalSignificance: {
      fr: "Dans l'empire du Mali, les bijoux royaux n'étaient pas que des ornements : ils symbolisaient le lien entre le roi et son peuple, ainsi que la responsabilité du pouvoir.",
      en: 'In the Mali Empire, royal jewelry was not just ornamentation: it symbolized the link between the king and his people, as well as the responsibility of power.',
      wo: "Ci empire Mali, bijou royal dañu koy mel ci kanam wala ornement: dañuy wone jëkkando bu am ci nekk burr ak nit ñi, ak responsabilité bu doole.",
    },
    period: '1500-1600',
    origin: 'Empire du Mali',
    quiz: {
      question: {
        fr: 'Que symbolise chaque perle du collier?',
        en: 'What does each bead of the necklace symbolize?',
        wo: 'Lan môy bëpp perle bu collier wone?',
      },
      options: {
        fr: ['Des victoires', 'Des qualités royales', 'Des ancêtres', 'Des territoires'],
        en: ['Victories', 'Royal qualities', 'Ancestors', 'Territories'],
        wo: ['Victoire', 'Qualité royal', 'Maam-maam', 'Territoire'],
      },
      correctAnswer: 1,
    },
  },
  {
    id: 'oeuvre13',
    title: {
      fr: 'Masque Cérémoniel Wolof',
      en: 'Wolof Ceremonial Mask',
      wo: 'Masque bu Wolof',
    },
    description: {
      fr: "Ce masque sacré était utilisé lors des cérémonies d'initiation Wolof. Sculpté dans du bois d'ébène, il représente les ancêtres et la sagesse transmise à travers les générations. Les motifs géométriques symbolisent l'harmonie entre le monde physique et spirituel.",
      en: 'This sacred mask was used during Wolof initiation ceremonies. Carved from ebony wood, it represents ancestors and wisdom passed through generations. The geometric patterns symbolize harmony between the physical and spiritual worlds.',
      wo: "Masque bii dafa nekk bu njool ci seremoni yu initiation yu Wolof. Dafa sedd ci bant bu ñuul, te dafa mel ni ay maam-maam ak xam-xam buy jàpp ci wet wi ci wet. Motif yi dañuy wone jëkkando bu am ci àdduna bi ñuy gis ak bi ñuy xamul.",
    },
    audioUrl: '/mock-audio-mask.mp3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageUrl: '../../assets/oeuvre0.jpg',
    category: 'Art Wolof',
    history: {
      fr: "XVIIIe siècle : Création par les maîtres sculpteurs de la région de Kaolack. Le masque était gardé par le chef spirituel du village et transmis de génération en génération. Il jouait un rôle central dans les rites de passage vers l'âge adulte.",
      en: '18th century: Created by master sculptors from the Kaolack region. The mask was kept by the village spiritual leader and passed down through generations. It played a central role in coming-of-age rituals.',
      wo: "Ñeel 18: Dafa sedd ci kanam say maître sculpteur yu Kaolack. Boroom kersa gi ngi koy tëral te jox ci wet wi ci wet. Dafa am njëg bu mag ci seremoni yu jàpp ci dund bi.",
    },
    arModel: '/models/mask.gltf',
    culturalSignificance: {
      fr: "Le masque incarne la connexion spirituelle avec les ancêtres et sert de pont entre les mondes. Les Wolof croient que porter ce masque permet de recevoir la sagesse des aînés disparus.",
      en: 'The mask embodies spiritual connection with ancestors and serves as a bridge between worlds. The Wolof believe that wearing this mask allows one to receive wisdom from departed elders.',
      wo: "Masque bi dafa mel ni jëkkando bu kersa ak say maam-maam, te dafa mel ni pont bu jël àdduna yi. Wolof dañuy gëm ne di bàyyi masque bii dafa jamontal xam-xam bu seen mag-mag.",
    },
    period: '1750-1800',
    origin: 'Kaolack, Sénégal',
    quiz: {
      question: {
        fr: 'À quelle occasion ce masque était-il utilisé?',
        en: 'On what occasion was this mask used?',
        wo: 'Masque bii dañu koy jëfandikoo ci lan?',
      },
      options: {
        fr: ['Mariages', "Cérémonies d'initiation", 'Funérailles', 'Fêtes de récolte'],
        en: ['Weddings', 'Initiation ceremonies', 'Funerals', 'Harvest festivals'],
        wo: ['Takkusaan', 'Seremoni yu initiation', 'Tey', 'Fête yu ngaay'],
      },
      correctAnswer: 1,
    },
  },
];

// ============================================
// CATÉGORIES
// ============================================

export const categories = [
  'Art Wolof',
  'Histoire Panafricaine',
  'Art Textiles',
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Récupère une œuvre par son ID
 */
export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};

/**
 * Filtre les œuvres par catégorie
 */
export const getArtworksByCategory = (category: string): Artwork[] => {
  return artworks.filter(artwork => artwork.category === category);
};

/**
 * Recherche d'œuvres par titre ou description
 */
export const searchArtworks = (query: string, lang: 'fr' | 'en' | 'wo' = 'fr'): Artwork[] => {
  const lowerQuery = query.toLowerCase();
  return artworks.filter(artwork => 
    artwork.title[lang].toLowerCase().includes(lowerQuery) ||
    artwork.description[lang].toLowerCase().includes(lowerQuery) ||
    artwork.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Obtient le nombre total d'œuvres
 */
export const getTotalArtworks = (): number => {
  return artworks.length;
};

/**
 * Obtient une œuvre aléatoire
 */
export const getRandomArtwork = (): Artwork => {
  const randomIndex = Math.floor(Math.random() * artworks.length);
  return artworks[randomIndex];
};

/**
 * Récupère les œuvres d'une période spécifique
 */
export const getArtworksByPeriod = (period: string): Artwork[] => {
  return artworks.filter(artwork => artwork.period === period);
};

/**
 * Récupère toutes les périodes uniques
 */
export const getAllPeriods = (): string[] => {
  return [...new Set(artworks.map(artwork => artwork.period))];
};

/**
 * Récupère toutes les origines uniques
 */
export const getAllOrigins = (): string[] => {
  return [...new Set(artworks.map(artwork => artwork.origin))];
};