// IWA Mock Data - Wrestlers, Events, News

export type WrestlerStatus = 'Active' | 'Injured' | 'Suspended';

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
  status: WrestlerStatus;
  ranking?: number;
  achievements: string[];
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
    status: 'Active',
    ranking: 1,
    achievements: [
      '2024 IWA Heavyweight Champion',
      'Royal Rumble Winner 2024',
      'Match of the Year 2023',
      'Undefeated streak: 23 matches',
    ],
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
    status: 'Active',
    ranking: 2,
    achievements: [
      '2x Tag Team Champion',
      'King of the Ring 2023',
      'Most Dominant Big Man Award',
    ],
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
    status: 'Suspended',
    ranking: 5,
    achievements: [
      'Tag Team Champion',
      'Hardcore Championship',
      'Fastest Submission Record',
    ],
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
    status: 'Active',
    ranking: 3,
    achievements: [
      '2x Tag Team Champion',
      'Monster Mayhem Winner',
      'Power Slam Tournament Champion',
    ],
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
    status: 'Active',
    ranking: 6,
    achievements: [
      'Rookie of the Year 2023',
      'Youngest Tag Team Champion',
      'Rising Star Award',
    ],
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
    status: 'Injured',
    ranking: 4,
    achievements: [
      'Comeback of the Year 2024',
      'Former Intercontinental Champion',
      'Fan Favorite Award',
    ],
  },
];

// Shows with YouTube videos
export interface Show {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  thumbnail: any;
  youtubeId: string;
  duration: string;
  matches: ShowMatch[];
}

export interface ShowMatch {
  id: string;
  title: string;
  wrestlers: string[];
  rating: number;
  userRatings: number;
}

export const shows: Show[] = [
  {
    id: '1',
    title: 'INFERNO RISING',
    subtitle: 'Episode 42',
    date: 'Oct 20, 2024',
    thumbnail: require('../assets/images/event-match.jpg'),
    youtubeId: 'dQw4w9WgXcQ',
    duration: '2:15:00',
    matches: [
      {
        id: 'm1',
        title: 'Blaze vs Titan - Heavyweight Championship',
        wrestlers: ['BLAZE', 'TITAN'],
        rating: 4.8,
        userRatings: 1250,
      },
      {
        id: 'm2',
        title: 'Viper & Gardson vs Sarrak & Phoenix',
        wrestlers: ['VIPER', 'GARDSON', 'SARRAK', 'PHOENIX'],
        rating: 4.5,
        userRatings: 890,
      },
    ],
  },
  {
    id: '2',
    title: 'INFERNO RISING',
    subtitle: 'Episode 41',
    date: 'Oct 13, 2024',
    thumbnail: require('../assets/images/event-match.jpg'),
    youtubeId: 'dQw4w9WgXcQ',
    duration: '2:00:00',
    matches: [
      {
        id: 'm3',
        title: 'Phoenix Returns - Battle Royal',
        wrestlers: ['PHOENIX', 'VIPER', 'GARDSON', 'SARRAK'],
        rating: 4.7,
        userRatings: 1580,
      },
    ],
  },
];

// Predictions & Polls
export interface Prediction {
  id: string;
  eventId: string;
  matchTitle: string;
  wrestler1: string;
  wrestler2: string;
  wrestler1Votes: number;
  wrestler2Votes: number;
  isOpen: boolean;
  deadline: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isOpen: boolean;
  type: 'match-type' | 'booking' | 'general';
  deadline: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export const predictions: Prediction[] = [
  {
    id: 'p1',
    eventId: '1',
    matchTitle: 'Heavyweight Championship',
    wrestler1: 'BLAZE',
    wrestler2: 'TITAN',
    wrestler1Votes: 4250,
    wrestler2Votes: 3100,
    isOpen: true,
    deadline: 'Oct 28, 2024',
  },
  {
    id: 'p2',
    eventId: '2',
    matchTitle: 'Tag Team Finals',
    wrestler1: 'VIPER & GARDSON',
    wrestler2: 'SARRAK & PHOENIX',
    wrestler1Votes: 2890,
    wrestler2Votes: 3450,
    isOpen: true,
    deadline: 'Nov 28, 2024',
  },
];

export const polls: Poll[] = [
  {
    id: 'poll1',
    question: 'What match type should Blaze vs Titan be?',
    options: [
      { id: 'o1', text: 'Steel Cage Match', votes: 3200 },
      { id: 'o2', text: 'Last Man Standing', votes: 4500 },
      { id: 'o3', text: 'Ironman Match', votes: 2100 },
      { id: 'o4', text: 'Hell in a Cell', votes: 5800 },
    ],
    isOpen: true,
    type: 'match-type',
    deadline: 'Oct 25, 2024',
  },
  {
    id: 'poll2',
    question: 'Who should Phoenix face in his return match?',
    options: [
      { id: 'o1', text: 'Blaze', votes: 2800 },
      { id: 'o2', text: 'Viper', votes: 1900 },
      { id: 'o3', text: 'Gardson', votes: 1500 },
      { id: 'o4', text: 'Sarrak', votes: 2200 },
    ],
    isOpen: true,
    type: 'booking',
    deadline: 'Nov 15, 2024',
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
