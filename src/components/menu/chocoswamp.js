import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const restaurant = {
  name: { en: 'Choco Swamp', ar: 'شوكو سوامب' },
  tagline: { en: 'Chocolate & Desserts', ar: 'شوكولاتة وحلويات' },
  logo: '/assets/logo/cocoswamp.png',
  location: {
    en: 'Tanzeem Kafrsousa - Damaskino Mall - Food court B2',
    ar: 'تنظيم كفرسوسة - دامسكينو مول - ردهة المطاعم B2',
  },
  phone: '+963944000710',
  whatsapp: '963944000710',
  instagram: 'https://www.instagram.com/chocoswamp',
  facebook: 'https://www.facebook.com/chocoswamp',
  currency: { en: 'SYP', ar: 'ل.س' },
};

const colors = {
  primary: '#E31E24',
  primaryHover: '#B9151A',
  secondary: '#5C3826',
  wash: '#FDE9E4',
  ink: '#2A1A10',
};

const categories = [
  {
    id: 'hot-drinks',
    title: { en: 'Hot Drinks', ar: 'مشروبات ساخنة' },
    items: [
      {
        name: { en: 'Hot Chocolate', ar: 'شوكولاتة ساخنة' },
        description: { en: 'Rich Belgian chocolate with fresh milk', ar: 'شوكولاتة بلجيكية غنية مع حليب طازج' },
        price: 25000,
      },
      {
        name: { en: 'Caramel Latte', ar: 'لاتيه كراميل' },
        description: { en: 'Espresso, steamed milk, and caramel', ar: 'إسpresso مع حليب مبخر وكراميل' },
        price: 30000,
      },
    ],
  },
  {
    id: 'desserts',
    title: { en: 'Desserts', ar: 'حلويات' },
    items: [
      {
        name: { en: 'Chocolate Fondue', ar: 'طبق شوكولاتة' },
        description: { en: 'Served with fresh fruits and marshmallows', ar: 'تُقدّم مع فواكه طازجة ومارشميلو' },
        price: 75000,
        tags: ['popular'],
      },
      {
        name: { en: 'Brownie Sundae', ar: 'براوني مع آيس كريم' },
        description: { en: 'Warm brownie with ice cream and sauce', ar: 'براوني دافئ مع آيس كريم وصلصة' },
        price: 55000,
      },
    ],
  },
];

const ChocoSwampMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default ChocoSwampMenu;
