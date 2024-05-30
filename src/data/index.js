const USERS = {
    1: {
        id: 1,
        username: 'Alexia Jane',
        avatar: require('../../assets/images/users/32.jpeg'),
    },
    2: {
        id: 2,
        username: 'Jacky Depp',
        avatar: require('../../assets/images/users/35.jpeg'),
    },
};

const REVIEWS = {
    1: {
        id: 1,
        date: '21 May, 2022',
        author: USERS[1],
        rating: 7,
        text: 'Lorem ipsum dolor sit amet. Iusto nihil et porro soluta ut labore nesciunt sed dolor nihil qui laudantium consequatur',
    },
    2: {
        id: 2,
        date: '14 July, 2021',
        author: USERS[2],
        rating: 9.1,
        text: 'Lorem ipsum dolor sit amet.',
    },
};

export const HOTELS = {
    1: {
        id: 1,
        title: 'Argos in Cappadocia',
        image: require('../../assets/images/hotels/cp-1.jpeg'),
        location: 'Turkey, Cappadocia',
        rating: 9,
        pricePeerDay: '130$',
        type: 'HOTEL',
    },
    2: {
        id: 2,
        title: 'Sultan Cave Suites',
        image: require('../../assets/images/hotels/cp-2.jpeg'),
        location: 'Turkey, Cappadocia',
        rating: 9.3,
        pricePeerDay: '230$',
        type: 'HOTEL',
    },
    3: {
        id: 3,
        title: 'Villa Brunella',
        image: require('../../assets/images/hotels/capri-1.jpeg'),
        location: 'Italy, Capri',
        rating: 9.4,
        pricePeerDay: '280$',
        type: 'HOTEL',
    },
    4: {
        id: 4,
        title: 'Hotel La Floridiana',
        image: require('../../assets/images/hotels/capri-2.jpeg'),
        location: 'Italy, Capri',
        rating: 9.3,
        pricePeerDay: '190$',
        type: 'HOTEL',
    },
    5: {
        id: 5,
        title: "Le Taha'a by Pearl Resorts",
        image: require('../../assets/images/hotels/polynesia-1.jpeg'),
        location: 'Polynesia, Bora Bora',
        rating: 9.2,
        pricePeerDay: '250$',
        type: 'HOTEL',
    },
    6: {
        id: 6,
        title: 'Le Meridien Bora Bora',
        image: require('../../assets/images/hotels/polynesia-2.jpeg'),
        location: 'Polynesia, Bora Bora',
        rating: 9.4,
        pricePeerDay: '270$',
        type: 'HOTEL',
    },
    7: {
        id: 7,
        title: 'InterContinental Phuket Resort',
        image: require('../../assets/images/hotels/phuket-1.jpg'),
        location: 'Thailand, Phuket',
        rating: 9.2,
        pricePeerDay: '210$',
        type: 'HOTEL',
    },
    8: {
        id: 8,
        title: 'The Nai Harn',
        image: require('../../assets/images/hotels/phuket-2.jpeg'),
        location: 'Thailand, Phuket',
        rating: 9.4,
        pricePeerDay: '430$',
        type: 'HOTEL',
    },
    9: {
        id: 9,
        title: 'Hotel Poseidon',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Italy, Amalfi Coast',
        rating: 9.2,
        pricePeerDay: '330$',
        type: 'HOTEL',
    },
    10: {
        id: 10,
        title: 'Le Agavi Hotel',
        image: require('../../assets/images/hotels/ac-2.jpeg'),
        location: 'Italy, Amalfi Coast',
        rating: 9.4,
        pricePeerDay: '350$',
        type: 'HOTEL',
    },
    11: {
        id: 11,
        title: 'Hotel Casa 1800 Granada',
        image: require('../../assets/images/hotels/granada-1.jpeg'),
        location: 'Spain, Granada',
        rating: 9.2,
        pricePeerDay: '230$',
        type: 'HOTEL',
    },
    12: {
        id: 12,
        title: 'Parador de Granada',
        image: require('../../assets/images/hotels/granada-2.jpeg'),
        location: 'Spain, Granada',
        rating: 9.4,
        pricePeerDay: '120$',
        type: 'HOTEL',
    },

    13: {
        id: 13,
        title: 'Konansou',
        image: require('../../assets/images/hotels/cb-1.jpeg'),
        location: 'Japan, Cherry blossoms',
        rating: 9.2,
        pricePeerDay: '740$',
        type: 'HOTEL',
    },
    14: {
        id: 14,
        title: 'Shuhokaku Kogetsu',
        image: require('../../assets/images/hotels/cb-2.jpeg'),
        location: 'Japan, Cherry blossoms',
        rating: 9.4,
        pricePeerDay: '240$',
        type: 'HOTEL',
    },
};

export const TOP_PLACES = [
    {
        id: 1,
        image: require('../../assets/Services/wash.jpg'),
        title: 'Cleaning',
        location: 'Home',
        description:
            'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
        rating: 9.4,
        gallery: [
            require('../../assets/images/trips/3722dd4614a5a58f2ec8ebf17c22f76d.jpeg'),
            require('../../assets/images/trips/af933a359582704eee05be198e882be0.jpeg'),
        ],
        reviews: [REVIEWS[2], REVIEWS[1]],
        hotels: [HOTELS[9], HOTELS[10]],
        type: 'PLACE',
    },
    {
        id: 4,
        image: require('../../assets/Services/Carpenter.jpg'),
        title: 'Carpenting',
        location: 'Furniture',
        description:
            'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
        rating: 8.9,
        gallery: [],
        reviews: [REVIEWS[1], REVIEWS[2]],
        hotels: [HOTELS[11], HOTELS[12]],
        type: 'PLACE',
    },
    {
        id: 6,
        image: require('../../assets/Services/Sofawash.jpeg'),
        title: 'Washing',
        location: 'Car',
        description:
            "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
        rating: 7.4,
        gallery: [],
        reviews: [REVIEWS[1], REVIEWS[2]],
        hotels: [HOTELS[13], HOTELS[14]],
        type: 'PLACE',
    },
];

export const PLACES = [
    {
        id: 5,
        image: require('../../assets/Services/wash.jpg'),
        title: 'Cleaning',
        location: 'Home',
        description:
            "Cappadocia's landscape includes dramatic expanses of soft volcanic rock, shaped by erosion into towers, cones, valleys, and caves. Rock-cut churches and underground tunnel complexes from the Byzantine and Islamic eras are scattered throughout the countryside.",
        rating: 9.2,
        gallery: [
            require('../../assets/images/trips/4c73f37e70dded978374960fb29360f2.jpeg'),
            require('../../assets/images/trips/55608c7000bb15d24ee022f3d3f0bf8a.jpeg'),
            require('../../assets/images/trips/c68a4484f89d0c087ebdaa43629d2a7a.jpeg'),
        ],
        reviews: [REVIEWS[1], REVIEWS[2]],
        hotels: [HOTELS[1], HOTELS[2]],
        type: 'PLACE',
    },
    {
        id: 2,
        image: require('../../assets/Services/Carpenter.jpg'),
        title: 'Carpenting',
        location: 'Furniture',
        description:
            'Capri is an island of a thousand faces, where visitors can walk the trails skirting the cliffs above the Mediterranean in total solitude, dive into the crystalline waters of its rocky shore, or plunge into the vibrant crowds of the Piazzetta and shop in the most fashionable boutiques in the world.',
        rating: 9.1,
        gallery: [],
        reviews: [REVIEWS[2], REVIEWS[1]],
        hotels: [HOTELS[3], HOTELS[4]],
        type: 'PLACE',
    },
    {
        id: 3,
        image: require('../../assets/Services/carwash.jpg'),
        title: 'Washing',
        location: 'Car',
        description:
            'Learn how you can travel Bora Bora on a budget and how overwater bungalows are possible for cheap plus tips on keeping Bora Bora trip costs low.',
        rating: 8.9,
        gallery: [],
        reviews: [REVIEWS[1], REVIEWS[2]],
        hotels: [HOTELS[5], HOTELS[6]],
        type: 'PLACE',
    },
    {
        id: 7,
        image: require('../../assets/Services/Plumber.jpg'),
        title: 'plumbing',
        location: 'Repairing',
        description:
            'Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand',
        rating: 9.2,
        gallery: [],
        reviews: [REVIEWS[2], REVIEWS[1]],
        hotels: [HOTELS[7], HOTELS[8]],
        type: 'PLACE',
    },
];

export const SEARCH_PLACES = [...PLACES, ...TOP_PLACES].map(item => ({
    ...item,
    id: Math.random().toString(),
}));

export const SEARCH_HOTELS = [...Object.values(HOTELS)].map(item => ({
    ...item,
    id: Math.random().toString(),
}));

export const WORKERS = {
    1: {
        id: 1,
        name: 'John Doe',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'New York, USA',
        rating: 9,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Plumbing', 'Electrical', 'Carpentry'],
    },
    2: {
        id: 2,
        name: 'Jane Smith',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Los Angeles, USA',
        rating: 8.5,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Cleaning', 'Gardening'],
    },
    3: {
        id: 3,
        name: 'Jane Smith',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Los Angeles, USA',
        rating: 8.5,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Cleaning', 'Gardening'],
    },
    4: {
        id: 4,
        name: 'Jane Smith',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Los Angeles, USA',
        rating: 8.5,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Cleaning', 'Gardening'],
    },
    5: {
        id: 5,
        name: 'Jane Smith',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Los Angeles, USA',
        rating: 8.5,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Cleaning', 'Gardening'],
    },
    6: {
        id: 6,
        name: 'Jane Smith',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
        location: 'Los Angeles, USA',
        rating: 8.5,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis faucibus ante eget maximus. Sed vulputate, nisi a gravida viverra, urna metus luctus turpis, nec aliquet sapien libero nec dolor.',
        workTags: ['Cleaning', 'Gardening'],
    },
    // Add more worker data as needed
};


export const SEARCH_ALL = [...SEARCH_PLACES, ...SEARCH_HOTELS];