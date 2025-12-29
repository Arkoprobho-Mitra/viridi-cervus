
export const products = [
    {
        id: 1,
        brand: 'StyleCast',
        title: 'Men Striped Pullover',
        price: 1529,
        originalPrice: 4499,
        discount: 66,
        rating: 3.2,
        ratingCount: 5,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=StyleCast+Sweater',
        color: 'Navy Blue',
        isAd: true
    },
    {
        id: 2,
        brand: 'Powerlook',
        title: 'SS25 Pullover Sweater',
        price: 1299,
        originalPrice: 2799,
        discount: 54,
        rating: 4.2,
        ratingCount: 64,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Powerlook+Sweater',
        color: 'Grey',
        isAd: false
    },
    {
        id: 3,
        brand: 'Campus Sutra',
        title: 'Cable Knit Woollen Pullover',
        price: 739,
        originalPrice: 1999,
        discount: 63,
        rating: 4.2,
        ratingCount: '2.2k',
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Campus+Sutra',
        color: 'Blue',
        isAd: false
    },
    {
        id: 4,
        brand: 'Raymond',
        title: 'Checked Self Design Pullover',
        price: 1754,
        originalPrice: 2699,
        discount: 35,
        rating: null,
        ratingCount: null,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Raymond',
        color: 'Black',
        isAd: false
    },
    {
        id: 5,
        brand: 'Roadster',
        title: 'Solid Cardigan',
        price: 958,
        originalPrice: 1999,
        discount: 52,
        rating: 4.2,
        ratingCount: '4.8k',
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Roadster+Cardigan',
        color: 'Beige',
        isAd: false
    },
    {
        id: 6,
        brand: 'The Indian Garage Co',
        title: 'Self Designed Acrylic Pullover',
        price: 868,
        originalPrice: 2799,
        discount: 69,
        rating: 4.5,
        ratingCount: 118,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Indian+Garage+Co',
        color: 'Green',
        isAd: false
    },
    {
        id: 7,
        brand: 'Powerlook',
        title: 'Men Self Design Pullover',
        price: 1403,
        originalPrice: 2699,
        discount: 48,
        rating: 4.2,
        ratingCount: 32,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Powerlook',
        color: 'Brown',
        isAd: false
    },
    {
        id: 8,
        brand: 'Mr Bowerbird',
        title: 'Solid Pullover Sweater',
        price: 1481,
        originalPrice: 3799,
        discount: 61,
        rating: 4.3,
        ratingCount: 938,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Mr+Bowerbird',
        color: 'Black',
        isAd: false
    },
    {
        id: 9,
        brand: 'Roadster',
        title: 'Turtleneck Pullover',
        price: 764,
        originalPrice: 1699,
        discount: 55,
        rating: 4.2,
        ratingCount: 104,
        image: 'https://placehold.co/400x500/e9e9ed/282c3f?text=Roadster+Turtleneck',
        color: 'Grey',
        isAd: false
    }
];

export const filterOptions = {
    brands: ['Roadster', 'Monte Carlo', 'Mast & Harbour', 'StyleCast', 'glitchez', 'V-Mart', 't-base'],
    prices: ['Rs. 300 to Rs. 5000'],
    colors: [
        { name: 'Black', hex: '#000000', count: 2227 },
        { name: 'Grey', hex: '#808080', count: 1789 },
        { name: 'Blue', hex: '#0000FF', count: 1566 },
        { name: 'Navy Blue', hex: '#000080', count: 1524 },
        { name: 'Green', hex: '#008000', count: 1206 },
        { name: 'Brown', hex: '#A52A2A', count: 1138 },
        { name: 'Beige', hex: '#F5F5DC', count: 941 }
    ],
    discountRange: [
        '10% and above',
        '20% and above',
        '30% and above',
        '40% and above',
        '50% and above',
        '60% and above',
        '70% and above',
        '80% and above'
    ]
};
