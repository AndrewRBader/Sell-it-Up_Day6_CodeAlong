// models/product_model.js

const products = [
    {
        name: 'Internet Friends',
        price: 29,
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
    },
    {
        name: 'Angry Pants',
        price: 35,
        image:
            'https://cdn.shopify.com/s/files/1/1297/1509/products/HERO_c5b0ec76-ad06-4cc7-a165-6129e11a8ff6_x1440.jpg?v=1571274622',
    },
    {
        name: 'Dead Cool',
        price: 50,
        image:
            'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_40030160-f468-4d50-8f30-c8b9733ce84e_x1440.jpg?v=1575020412',
    },
];

module.exports = products

// we will access the array data through our 'database'
// without our module.exports we would not be able to access data from this file