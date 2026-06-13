import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const item = (ar, en, description) => ({
  name: { ar, en },
  ...(description ? { description: { ar: description.ar, en: description.en } } : {}),
});

const restaurant = {
  name: { en: 'Kousa Mahshi', ar: 'كوسا محشي' },
  tagline: { en: 'Menu', ar: 'مينو كوسا محشي' },
  logo: '/assets/logo/kussa.png',
  currency: { en: 'SYP', ar: 'ل.س' },
};

const colors = {
  primary: '#F57C00',
  primaryHover: '#E65100',
  secondary: '#1A1A1A',
  wash: '#FFF8E1',
  ink: '#1A1A1A',
};

const categories = [
  {
    id: 'specialties',
    title: { en: 'House Specialties', ar: 'الأصناف الخاصة' },
    items: [
      item('يبرق', 'Yabraq'),
      item('سجقات', 'Sujukat'),
      item('محاشي مشكل', 'Mixed Mahshi'),
      item('يخنة ملفوف', 'Cabbage Stew'),
      item('يلنجي', 'Yalanji', {
        ar: 'ورق عنب، باذنجان، كوسا',
        en: 'Grape leaves, eggplant, zucchini',
      }),
    ],
  },
  {
    id: 'ramadan',
    title: { en: 'Ramadan & Catering', ar: 'قائمة التواصي وأصناف رمضان' },
    items: [
      item('برك', 'Barak', {
        ar: 'جبنة، لحمة، دجاج',
        en: 'Cheese, meat, chicken',
      }),
      item('عجة', 'Eggah'),
      item('كبة مشوية', 'Grilled Kibbeh'),
      item('كبة مقلية', 'Fried Kibbeh'),
      item('كبة لبنية', 'Kibbeh Labaniyeh'),
      item('شيش برك', 'Shish Barak'),
      item('ملوخية دجاج', 'Molokhia with Chicken'),
      item('كباب هندي', 'Indian Kebab'),
      item('حراء اصبعو', "Harra' Isba'o"),
      item('اوزي', 'Ouzi'),
      item('بطاطا محشية', 'Stuffed Potato'),
      item('معكرونة بالبشاميل', 'Pasta Béchamel'),
      item('بطاطا بالقشقوان', 'Potato with Kashkaval'),
      item('بطاطا بالموزاريلا', 'Potato with Mozzarella'),
      item('بطاطا بالشيدر', 'Potato with Cheddar'),
    ],
  },
  {
    id: 'soups',
    title: { en: 'Soups', ar: 'شوربات' },
    items: [item('شوربة عدس', 'Lentil Soup'), item('شوربة فطر', 'Mushroom Soup')],
  },
  {
    id: 'salads',
    title: { en: 'Salads', ar: 'سلطات' },
    items: [
      item('فتوش', 'Fattoush'),
      item('تبولة', 'Tabbouleh'),
      item('سلطة شوندر', 'Beet Salad'),
    ],
  },
  {
    id: 'appetizers',
    title: { en: 'Appetizers', ar: 'مقبلات' },
    items: [
      item('معكرونة باردة', 'Cold Pasta Salad'),
      item('متبل شوندر', 'Beet Dip'),
      item('متبل باذنجان', 'Eggplant Dip'),
      item('بابا غنوج', 'Baba Ghanoush'),
    ],
  },
  {
    id: 'grills',
    title: { en: 'Grills & Special Cuts', ar: 'مشاوي وخاصات' },
    items: [
      item('مقادم', 'Meqadem'),
      item('لسانات', 'Tongues'),
      item('أباوات', 'Abawat'),
      item('حفاتي', 'Hafati'),
      item('راس غنم', 'Lamb Head'),
      item('نخاعات', 'Marrow Bones'),
    ],
  },
];

const KousaMahshiMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default KousaMahshiMenu;
