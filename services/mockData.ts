// IWA Mock Data - Wrestlers, Events, News

export interface Wrestler {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  image: any;
  isChampion?: boolean;
  championships?: string[];
  height: string;
  weight: string;
  hometown: string;
  finisher: string;
  bio: string;
  wins: number;
  losses: number;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  month: string;
  location: string;
  venue: string;
  image: any;
  isPast: boolean;
  mainEvent?: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: any;
  content: string;
}

export const wrestlers: Wrestler[] = [
  {
    id: '1',
    name: 'BLAZE',
    nickname: 'The Inferno',
    role: 'HEAVYWEIGHT CHAMPION',
    image: require('../assets/images/wrestler-blaze.jpg'),
    isChampion: true,
    championships: ['IWA Heavyweight Championship'],
    height: '6\'4"',
    weight: '265 lbs',
    hometown: 'Phoenix, Arizona',
    finisher: 'Inferno Driver',
    bio: 'Blaze rose through the independent circuit with a trail of destruction. His explosive power and ruthless aggression have made him the most dominant champion in IWA history.',
    wins: 47,
    losses: 8,
  },
  {
    id: '2',
    name: 'TITAN',
    nickname: 'The Immovable',
    role: 'TAG TEAM',
    image: require('../assets/images/wrestler-titan.jpg'),
    isChampion: false,
    height: '6\'8"',
    weight: '320 lbs',
    hometown: 'Detroit, Michigan',
    finisher: 'Titan Bomb',
    bio: 'Standing at nearly seven feet tall, Titan is a force of nature. His partnership with Sarrak has made them the most feared tag team in the promotion.',
    wins: 38,
    losses: 12,
  },
  {
    id: '3',
    name: 'VIPER',
    nickname: 'The Striker',
    role: 'TAG TEAM',
    image: require('../assets/images/wrestler-viper.jpg'),
    isChampion: false,
    height: '6\'1"',
    weight: '225 lbs',
    hometown: 'Las Vegas, Nevada',
    finisher: 'Venom Strike',
    bio: 'Quick, cunning, and absolutely lethal. Viper combines technical prowess with a vicious streak that has left many opponents unable to continue.',
    wins: 42,
    losses: 15,
  },
  {
    id: '4',
    name: 'SARRAK',
    nickname: 'The Destroyer',
    role: 'TAG TEAM',
    image: require('../assets/images/wrestler-sarrak.jpg'),
    isChampion: false,
    height: '6\'5"',
    weight: '285 lbs',
    hometown: 'Chicago, Illinois',
    finisher: 'Sarrak Slam',
    bio: 'A powerhouse with incredible technical ability. Sarrak and Titan form the devastating duo known as "The Titans of Destruction."',
    wins: 35,
    losses: 14,
  },
  {
    id: '5',
    name: 'GARDSON',
    nickname: 'The Prodigy',
    role: 'TAG TEAM',
    image: require('../assets/images/wrestler-gardson.jpg'),
    isChampion: false,
    height: '6\'0"',
    weight: '215 lbs',
    hometown: 'Miami, Florida',
    finisher: 'Prodigy Lock',
    bio: 'The youngest competitor on the roster, Gardson has already proven he belongs among the elite. His technical mastery is unmatched.',
    wins: 28,
    losses: 9,
  },
  {
    id: '6',
    name: 'PHOENIX',
    nickname: 'The Risen',
    role: 'CONTENDER',
    image: require('../assets/images/wrestler-phoenix.jpg'),
    isChampion: false,
    height: '6\'2"',
    weight: '235 lbs',
    hometown: 'Atlanta, Georgia',
    finisher: 'Phoenix Rising',
    bio: 'After a career-threatening injury, Phoenix returned stronger than ever. His incredible comeback story has made him a fan favorite.',
    wins: 31,
    losses: 11,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'INFERNO RISING:',
    subtitle: 'BLAZE VS. TITAN',
    date: 'October 28, 2024',
    day: '28',
    month: 'OCT',
    location: 'IWA Arena, Chicago',
    venue: 'IWA Arena',
    image: require('../assets/images/event-match.jpg'),
    isPast: false,
    mainEvent: 'IWA Heavyweight Championship Match',
  },
  {
    id: '2',
    title: 'INFERNO RISING:',
    subtitle: 'BLAZE VS. TITAN',
    date: 'November 28, 2024',
    day: '28',
    month: 'NOV',
    location: 'IWA Arena, Chicago',
    venue: 'IWA Arena',
    image: require('../assets/images/event-match.jpg'),
    isPast: false,
    mainEvent: 'Tag Team Championship Tournament',
  },
  {
    id: '3',
    title: 'INFERNO RISING:',
    subtitle: 'BLAZE VS. TITAN',
    date: 'October 26, 2024',
    day: '26',
    month: 'OCT',
    location: 'IWA Arena, Chicago',
    venue: 'IWA Arena',
    image: require('../assets/images/event-match.jpg'),
    isPast: true,
    mainEvent: 'Number One Contender Match',
  },
];

export const news: NewsItem[] = [
  {
    id: '1',
    category: 'ANNOUNCEMENTS',
    title: 'BLAZE DEFEATS TITAN AGAINST THE WRESTLING...',
    excerpt: 'Breen Wrestling Finals, aecnpna onoereh con sape retrosaifint een orlne ocer conseguetly investments vitin rre...',
    date: '07/25, 2023',
    image: require('../assets/images/news-1.jpg'),
    content: 'In a stunning main event at IWA Inferno Rising, Blaze successfully defended his Heavyweight Championship against the monstrous Titan. The match, which lasted over 25 minutes, saw both competitors push themselves to their absolute limits.',
  },
  {
    id: '2',
    category: 'DONE',
    title: 'BLAZE DEFEATS TITAN TOUR',
    excerpt: 'Soing onocte riplenr oerthoilc osarnd canoltrboamliot conondanlvioninr arnufigroad iflion lonnorin...',
    date: '07/13, 2022',
    image: require('../assets/images/news-2.jpg'),
    content: 'The IWA World Tour has been officially announced, with dates spanning across 15 cities nationwide. Fans will have the opportunity to see their favorite wrestlers live in action.',
  },
  {
    id: '3',
    category: 'ONBOARD 1',
    title: 'BLAZE DEFEATS LERPDIVE',
    excerpt: 'Setenooquunnetehs oasnb lot derilib.pol llogoorin gomnonosifoorn oenn...',
    date: '07/18, 2023',
    image: require('../assets/images/news-1.jpg'),
    content: 'In a shocking upset, Blaze managed to overcome Lerpdive in what many are calling the match of the year. The technical display from both competitors had the crowd on their feet.',
  },
  {
    id: '4',
    category: 'ANNOUNCEMENTS',
    title: 'BLAZE DEFEATS TITAN',
    excerpt: 'Lorem ipsum dolor sit amet, oaert conditure adisodiling elit oaristen elto noniftdod oofite nofdopel oagnifnimo...',
    date: '07/13, 2023',
    image: require('../assets/images/news-2.jpg'),
    content: 'The rematch everyone has been waiting for finally happened. Blaze and Titan collided once again in an epic encounter that will go down in IWA history.',
  },
  {
    id: '5',
    category: 'RESULTS',
    title: 'VIPER CLAIMS TAG TEAM GOLD',
    excerpt: 'Viper and Gardson have officially formed a new tag team partnership after their stunning victory...',
    date: '06/20, 2023',
    image: require('../assets/images/news-1.jpg'),
    content: 'In a surprise turn of events, Viper has found a new tag team partner in the young prodigy Gardson. Together they defeated the former champions in a hard-fought match.',
  },
  {
    id: '6',
    category: 'BREAKING',
    title: 'PHOENIX RETURNS FROM INJURY',
    excerpt: 'After 8 months on the sidelines, Phoenix made his triumphant return to the IWA ring...',
    date: '05/15, 2023',
    image: require('../assets/images/news-2.jpg'),
    content: 'The crowd erupted as Phoenix\'s music hit and the fan favorite walked out for the first time since his devastating injury. Phoenix is back and ready to reclaim his spot.',
  },
];
