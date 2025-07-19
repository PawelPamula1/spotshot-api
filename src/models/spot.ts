export interface Spot {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
  latitude: number;
  longitude: number;
  author: {
    userId: number;
    authorName: string;
  };
}

export let spots: Spot[] = [
  {
    id: '1',
    name: 'Montmartre Stairs',
    city: 'Paris',
    country: 'France',
    image:
      'https://i.pinimg.com/1200x/cb/6a/27/cb6a27f7050de6002bad81f325030d15.jpg',
    description: 'Romantic view with stairs and sunset light.',
    latitude: 48.8867,
    longitude: 2.3431,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '2',
    name: 'Brooklyn Bridge',
    city: 'New York',
    country: 'USA',
    image:
      'https://i.pinimg.com/1200x/24/c3/51/24c351bde762697fa8adeee8a59da1d1.jpg',
    description: 'Iconic NYC spot with skyline in the background.',
    latitude: 40.7061,
    longitude: -73.9969,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '3',
    name: 'Shibuya Crossing',
    city: 'Tokyo',
    country: 'Japan',
    image:
      'https://i.pinimg.com/736x/62/cf/b4/62cfb46cdc9f1107c40cab0f02d42945.jpg',
    description: "The world's busiest crosswalk from above.",
    latitude: 35.6595,
    longitude: 139.7004,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '4',
    name: 'Śmietnik',
    city: 'Lublin',
    country: 'Poland',
    image:
      'https://vintagefootball.eu/_next/image?url=%2Fabout%2Fmarcin.png&w=3840&q=75',
    description: 'Chuj w dupę Marcinowi.',
    latitude: 51.2465,
    longitude: 22.5684,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '5',
    name: 'Santorini Viewpoint',
    city: 'Santorini',
    country: 'Greece',
    image:
      'https://i.pinimg.com/1200x/f2/3f/eb/f23febb8c8c81d4f6a471f05229a2a5e.jpg',
    description: 'White buildings with blue domes and sea view.',
    latitude: 36.3932,
    longitude: 25.4615,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '6',
    name: 'Burj Khalifa Deck',
    city: 'Dubai',
    country: 'UAE',
    image:
      'https://i.pinimg.com/1200x/d2/7d/ca/d27dca6abf508281ea171f4f31b6d2b5.jpg',
    description: 'Tallest building in the world with panoramic city views.',
    latitude: 25.1972,
    longitude: 55.2744,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '7',
    name: 'Big Ben from Westminster Bridge',
    city: 'London',
    country: 'UK',
    image:
      'https://i.pinimg.com/1200x/6c/74/ab/6c74ab8da0e2647966ff03ab4fb3c22b.jpg',
    description: 'Classic view with Thames River in the foreground.',
    latitude: 51.5007,
    longitude: -0.1246,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '8',
    name: 'Colosseum at Sunset',
    city: 'Rome',
    country: 'Italy',
    image:
      'https://i.pinimg.com/736x/c7/82/19/c78219acbfe21f59e025c45c9894faad.jpg',
    description: 'Ancient ruins glowing in warm sunset tones.',
    latitude: 41.8902,
    longitude: 12.4922,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '9',
    name: 'Golden Gate Bridge Viewpoint',
    city: 'San Francisco',
    country: 'USA',
    image:
      'https://i.pinimg.com/1200x/95/35/20/953520d7631d3916a5cb58545a94955d.jpg',
    description: 'Iconic red bridge with foggy backdrop.',
    latitude: 37.8199,
    longitude: -122.4783,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '10',
    name: 'Christ the Redeemer',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    image:
      'https://i.pinimg.com/736x/2c/44/19/2c44190db96a991d0af8c4dd8574c1a9.jpg',
    description: 'Panoramic view from Corcovado mountain.',
    latitude: -22.9519,
    longitude: -43.2105,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '11',
    name: 'Table Mountain Viewpoint',
    city: 'Cape Town',
    country: 'South Africa',
    image:
      'https://i.pinimg.com/736x/79/f5/42/79f54212c9416d9890bf9c3eb6c5e2a5.jpg',
    description: 'Sweeping views over Cape Town from a flat-topped mountain.',
    latitude: -33.9628,
    longitude: 18.4098,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '12',
    name: 'Petra Treasury',
    city: 'Petra',
    country: 'Jordan',
    image:
      'https://i.pinimg.com/1200x/e7/a8/f1/e7a8f131a516eed477d5c9650b7fbb7e.jpg',
    description: 'Ancient rock-carved facade glowing at golden hour.',
    latitude: 30.3285,
    longitude: 35.4444,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '13',
    name: 'Hallstatt Lakeside',
    city: 'Hallstatt',
    country: 'Austria',
    image:
      'https://i.pinimg.com/1200x/03/fc/a8/03fca81e97fccd1b822b35e8c2d236f2.jpg',
    description: 'Fairy-tale village reflecting in a mountain lake.',
    latitude: 47.5615,
    longitude: 13.6481,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '14',
    name: 'Taj Mahal at Sunrise',
    city: 'Agra',
    country: 'India',
    image:
      'https://i.pinimg.com/1200x/01/ce/f5/01cef5442ceed59e4d66375d811839af.jpg',
    description: 'Symmetrical wonder bathed in warm morning light.',
    latitude: 27.1751,
    longitude: 78.0421,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '15',
    name: 'Neuschwanstein Castle',
    city: 'Bavaria',
    country: 'Germany',
    image:
      'https://i.pinimg.com/1200x/34/8f/4c/348f4c695b304fadbb1ebd2175a208f2.jpg',
    description: 'Fairy-tale castle nestled in the Alps.',
    latitude: 47.5576,
    longitude: 10.7498,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '16',
    name: 'Blue City Viewpoint',
    city: 'Chefchaouen',
    country: 'Morocco',
    image:
      'https://i.pinimg.com/736x/94/df/21/94df2130050ce6ed703ae79e9efe7851.jpg',
    description: 'Panoramic view of the blue-painted medina.',
    latitude: 35.1718,
    longitude: -5.2697,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '17',
    name: 'Lake Bled Island',
    city: 'Bled',
    country: 'Slovenia',
    image:
      'https://i.pinimg.com/736x/91/14/0b/91140bb7698c2650b10165503e8a035a.jpg',
    description: 'Charming church on an island in emerald waters.',
    latitude: 46.363,
    longitude: 14.0936,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '18',
    name: 'Cinque Terre Coastline',
    city: 'Manarola',
    country: 'Italy',
    image:
      'https://i.pinimg.com/1200x/0e/45/7f/0e457fa23a1f8f769e8603e59656438d.jpg',
    description: 'Colorful houses clinging to steep seaside cliffs.',
    latitude: 44.108,
    longitude: 9.7286,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '19',
    name: 'The Louvre Pyramid',
    city: 'Paris',
    country: 'France',
    image:
      'https://i.pinimg.com/736x/e3/5b/52/e35b5292d6ef1ed79477be1e6c8f7a16.jpg',
    description: 'Glass pyramid glowing at twilight.',
    latitude: 48.8606,
    longitude: 2.3376,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '20',
    name: 'Skógafoss Waterfall',
    city: 'Skógafoss',
    country: 'Iceland',
    image:
      'https://i.pinimg.com/736x/82/25/1a/82251abd94566496b8066e4d4a205348.jpg',
    description: 'Powerful waterfall with vibrant rainbows.',
    latitude: 63.5321,
    longitude: -19.5116,
    author: {
      userId: 1,
      authorName: 'Emma Dubois',
    },
  },
  {
    id: '21',
    name: 'Morskie Oko',
    city: 'Zakopane',
    country: 'Poland',
    image:
      'https://i.pinimg.com/1200x/28/4f/82/284f82b9ab1b277e2df5e21ca4ca133c.jpg',
    description: 'Malownicze górskie jezioro otoczone Tatrami.',
    latitude: 49.1984,
    longitude: 20.07,
    author: {
      userId: 2,
      authorName: 'Jan Kowalski',
    },
  },
  {
    id: '22',
    name: 'Zamek w Mosznej',
    city: 'Moszna',
    country: 'Poland',
    image:
      'https://i.pinimg.com/1200x/72/aa/de/72aade426e16b2c3d29c9c0be6558baf.jpg',
    description: 'Bajkowy zamek z 99 wieżami – polski Hogwarts.',
    latitude: 50.4462,
    longitude: 17.7756,
    author: {
      userId: 3,
      authorName: 'Anna Nowak',
    },
  },
  {
    id: '23',
    name: 'Stare Miasto w Gdańsku',
    city: 'Gdańsk',
    country: 'Poland',
    image:
      'https://i.pinimg.com/1200x/3b/c6/31/3bc631a9660f9c66434170792f9e568b.jpg',
    description: 'Kolorowe kamienice i urokliwe uliczki nad Motławą.',
    latitude: 54.352,
    longitude: 18.6466,
    author: {
      userId: 4,
      authorName: 'Marek Wiśniewski',
    },
  },
  {
    id: '24',
    name: 'Jezioro Solińskie',
    city: 'Solina',
    country: 'Poland',
    image:
      'https://i.pinimg.com/1200x/de/b0/90/deb090ec7720d800468a4937f4dba1a9.jpg',
    description: 'Spokojne jezioro z pięknymi zachodami słońca.',
    latitude: 49.3827,
    longitude: 22.4678,
    author: {
      userId: 5,
      authorName: 'Karolina Zielińska',
    },
  },
];
