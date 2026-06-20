import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const img = (file) => encodeURI(`/assets/menu/kousa mahshi/${file}`);

const item = (ar, en, description, imageFile) => ({
  name: { ar, en },
  ...(description ? { description: { ar: description.ar, en: description.en } } : {}),
  ...(imageFile ? { image: img(imageFile) } : {}),
});

const restaurant = {
  name: { en: 'Kousa Mahshi', ar: 'كوسا محشي' },
  promo: {
    en: 'Fully prepared for all occasions and special orders — the full range of Levantine cuisine',
    ar: 'استعداد تام لكافة المناسبات و الطلبات الخاصة ، من جميع أصناف المطبخ الشامي',
  },
  logo: '/assets/logo/kousa-me7shi.png',
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
      item('يبرق', 'Yabraq', null, 'yabraq.jpg'),
      item('سجقات', 'Sujukat', null, 'Sujukat.jpeg'),
      item('محاشي مشكل', 'Mixed Mahshi', null, 'mixed mahshi.jpg'),
      item('يخنة ملفوف', 'Cabbage Stew', null, 'cabbage stew.jpg'),
      item('يلنجي', 'Yalanji', {
        ar: 'ورق عنب، باذنجان، كوسا',
        en: 'Grape leaves, eggplant, zucchini',
      }, 'yalanji.jpg'),
    ],
  },
  {
    id: 'ramadan',
    title: { en: 'Ramadan & Catering', ar: 'قائمة التواصي وأصناف رمضان' },
    items: [
      item('برك', 'Barak', {
        ar: 'جبنة، لحمة، دجاج',
        en: 'Cheese, meat, chicken',
      }, 'barak.jpg'),
      item('عجة', 'Eggah', null, 'eggah.jpg'),
      item('كبة مشوية', 'Grilled Kibbeh', null, 'grilled kibbeh.jpg'),
      item('كبة مقلية', 'Fried Kibbeh', null, 'fried kibbeh.jpg'),
      item('كبة لبنية', 'Kibbeh Labaniyeh', null, 'kibbeh labaniyeh.jpg'),
      item('شيش برك', 'Shish Barak', null, 'shish barak.jpg'),
      item('ملوخية دجاج', 'Molokhia with Chicken', null, 'molokhia with chicken.jpg'),
      item('كباب هندي', 'Indian Kebab', null, 'indian kabab.jpg'),
      item('حراء اصبعو', "Harra' Isba'o", null, "Harra' Isba'o.jpeg"),
      item('اوزي', 'Ouzi', null, 'ouzi.jpg'),
      item('بطاطا محشية', 'Stuffed Potato', null, 'stuffed potato.jpg'),
      item('معكرونة بالبشاميل', 'Pasta Béchamel', null, 'pasta béchamel.jpg'),
      item('بطاطا بالقشقوان', 'Potato with Kashkaval', null, 'patato with kashkaval.jpg'),
      item('بطاطا بالموزاريلا', 'Potato with Mozzarella', null, 'patato with mozzarella.jpg'),
      item('بطاطا بالشيدر', 'Potato with Cheddar', null, 'patato with cheddar.jpg'),
      item('مقادم', 'Meqadem', null, 'Meqadem.jpeg'),
      item('لسانات', 'Tongues', null, 'tongues.jpg'),
      item('أباوات', 'Abawat', null, 'abawat.jpg'),
      item('حفاتي', 'Hafati', null, 'Hafati.jpeg'),
      item('راس غنم', 'Lamb Head', null, 'lamp head.jpg'),
      item('نخاعات', 'Marrow Bones', null, 'marrow bones.jpg'),
      item('معكرونة باردة', 'Cold Pasta Salad', null, 'cold pasta salad.jpg'),
      item('متبل شوندر', 'Beet Dip', null, 'beet dip.jpg'),
      item('متبل باذنجان', 'Eggplant Dip', null, 'Eggplant Dip.jpeg'),
      item('بابا غنوج', 'Baba Ghanoush', null, 'baba ghanoush.jpg'),
      item('فتوش', 'Fattoush', null, 'fattoush.jpg'),
      item('تبولة', 'Tabbouleh', null, 'tabbouleh.jpg'),
      item('سلطة شوندر', 'Beet Salad', null, 'beet salad.jpg'),
      item('شوربة عدس', 'Lentil Soup', null, 'lentil soup.jpg'),
      item('شوربة فطر', 'Mushroom Soup', null, 'mushroom soup.jpg'),
    ],
  },
];

const KousaMe7shiMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default KousaMe7shiMenu;
