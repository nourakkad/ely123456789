/**
 * Copy this file, rename it (e.g. my-restaurant.js), fill in the data,
 * export from index.js, and add a route in App.js:
 *
 *   <Route path="/menu/my-restaurant" element={<MyRestaurantMenu />} />
 */
import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const restaurant = {
  name: { en: 'Restaurant Name', ar: 'اسم المطعم' },
  tagline: { en: 'Cuisine type', ar: 'نوع المطبخ' },
  logo: '/assets/logo/your-logo.png',
  location: { en: 'Address in English', ar: 'العنوان بالعربية' },
  phone: '+963XXXXXXXXX',
  whatsapp: '963XXXXXXXXX',
  instagram: 'https://www.instagram.com/handle',
  facebook: 'https://www.facebook.com/page',
  currency: { en: 'SYP', ar: 'ل.س' },
};

const colors = {
  primary: '#E31E24',
  primaryHover: '#B9151A',
  secondary: '#333333',
  wash: '#F5F5F5',
  ink: '#1A1A1A',
};

const categories = [
  {
    id: 'starters',
    title: { en: 'Starters', ar: 'مقبلات' },
    items: [
      {
        name: { en: 'Item name', ar: 'اسم الطبق' },
        description: { en: 'Optional description', ar: 'وصف اختياري' },
        price: 15000,
        image: '/assets/images/item.jpg',
        tags: ['new'],
      },
    ],
  },
];

const MyRestaurantMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default MyRestaurantMenu;
