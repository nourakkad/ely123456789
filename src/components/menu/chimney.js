import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const d = (ar, en) => ({ ar, en });

const item = (ar, en, description) => ({
  name: { ar, en },
  ...(description ? { description } : {}),
});

const toppings = d('لوتس - كرانش - نيوتيلا', 'Lotus - Crunch - Nutella');
const dipToppings = d('مغطسة بالشوكولا نيوتيلا - كرانش - لوتس', 'Dipped in Nutella - Crunch - Lotus chocolate');
const tamariClassic = d('دبس - طحينة - سمسم - سكر ناعم', 'Molasses - tahini - sesame - fine sugar');
const tamariBanana = d('دبس - طحينة - سمسم - سكر ناعم - موز', 'Molasses - tahini - sesame - fine sugar - banana');
const tamariExtra = d('دبس - طحينة - سمسم - سكر ناعم - موز - قشطة - عسل - نسله - مكسرات', 'Molasses - tahini - sesame - sugar - banana - cream - honey - Nestlé - nuts');
const tamariChocolate = d('لوتس - نيوتيلا - كرانش', 'Lotus - Nutella - Crunch');
const cornDouble = d('شيدر - كريم تشيز', 'Cheddar - cream cheese');
const spiralChips = d('جبنة أو ملح أو شطة أو كاري أو اندومي أو نكهة مزمزة الخاصة', 'Cheese, salt, spicy, curry, Indomie, or Mazmazeh special flavor');
const chocolateManouche = d('لوتس - كرانش - نيوتيلا', 'Lotus - Crunch - Nutella');
const sajIceOpts = d('مع بسكوت أو فواكه أو سادة', 'With biscuit, fruits, or plain');

const restaurant = {
  name: { en: 'Chimney Roll', ar: 'تشيميني رول' },
  tagline: { en: 'Menu', ar: 'مينو تشيميني' },
  logo: '/assets/logo/chimney.png',
  logoBackground: '#FFFFFF',
  currency: { en: 'SYP', ar: 'ل.س' },
};

const colors = {
  primary: '#FFC107',
  primaryHover: '#FFA000',
  secondary: '#6A1B9A',
  wash: '#FFF8E1',
  ink: '#1A1A1A',
};

const categories = [
  {
    id: 'wafer-chocolate',
    title: { en: 'Wafer Chocolate', ar: 'أصناف وافر شوكولا' },
    items: [
      item('تشميني فتوش فواكه مع آيس كريم', 'Chimney Fruit Fattoush with Ice Cream', toppings),
      item('غوفر فواكه مع آيس كريم', 'Fruit Gaufre with Ice Cream', toppings),
      item('كريب فواكه مع آيس كريم', 'Fruit Crepe with Ice Cream', toppings),
      item('تشميني رول بالكاسة', 'Chimney Roll in a Cup', dipToppings),
    ],
  },
  {
    id: 'tamari',
    title: { en: 'Tamari Cakes', ar: 'تماري كعك' },
    items: [
      item('تماري كلاسيك', 'Classic Tamari', tamariClassic),
      item('تماري كلاسيك دبل', 'Double Classic Tamari', tamariClassic),
      item('تماري كلاسيك بالموز', 'Classic Tamari with Banana', tamariBanana),
      item('تماري كعك اكسترا', 'Extra Tamari Cake', tamariExtra),
      item('تماري شوكولا', 'Chocolate Tamari', tamariChocolate),
    ],
  },
  {
    id: 'damascus-snacks',
    title: { en: 'Damascus Snacks', ar: 'تسالي شامية' },
    items: [
      item('ترمس', 'Lupini Beans'),
      item('عرنوس ذرة مسلوق', 'Boiled Corn on the Cob'),
      item('علبة سلطة ذرة', 'Corn Salad Box'),
      item('سلطة ذرة دبل', 'Double Corn Salad', cornDouble),
      item('شيبس حلزون نكهات', 'Spiral Chips Flavors', spiralChips),
    ],
  },
  {
    id: 'saj-manouche',
    title: { en: 'Saj Manouche', ar: 'مناقيش صاج' },
    items: [
      item('محمرة', 'Muhammara'),
      item('لبنة وزيتون', 'Labneh & Olives'),
      item('جبنة', 'Cheese'),
      item('زعتر', 'Zaatar'),
      item('قشقوان', 'Kashkaval'),
      item('محمرة وقشقوان', 'Muhammara & Kashkaval'),
      item('زعتر مع قشقوان', 'Zaatar with Kashkaval'),
      item('زعتر ومحمرة', 'Zaatar & Muhammara'),
      item('زيتون مع قشقوان', 'Olives with Kashkaval'),
      item('فطر مع قشقوان', 'Mushroom with Kashkaval'),
      item('ذرة مع قشقوان', 'Corn with Kashkaval'),
      item('بيتزا', 'Pizza'),
      item('لحومات باردة مع قشقوان', 'Cold Cuts with Kashkaval'),
      item('شوكولا', 'Chocolate', chocolateManouche),
      item('قشطة وعسل', 'Cream & Honey'),
    ],
  },
  {
    id: 'juices',
    title: { en: 'Juices', ar: 'عصائر' },
    items: [
      item('منغا', 'Mango'),
      item('برتقال', 'Orange'),
      item('رمان', 'Pomegranate'),
      item('فريز', 'Strawberry'),
      item('ليمون', 'Lemon'),
    ],
  },
  {
    id: 'slush',
    title: { en: 'Slush', ar: 'سلاش' },
    items: [
      item('فريز وحليب', 'Strawberry & Milk'),
      item('آيس كوفي', 'Iced Coffee'),
    ],
  },
  {
    id: 'ice-cream',
    title: { en: 'Ice Cream', ar: 'آيس كريم' },
    items: [
      item('بوري عادي', 'Regular Cone'),
      item('بوري دبل', 'Double Cone'),
      item('بوري بسكوت أو كاسة', 'Cone, Biscuit, or Cup'),
    ],
  },
  {
    id: 'cocktails',
    title: { en: 'Cocktails', ar: 'كوكتيلات' },
    items: [
      item('موز وحليب', 'Banana & Milk'),
      item('فريز وموز وحليب', 'Strawberry, Banana & Milk'),
      item('فواكه مشكلة', 'Mixed Fruits'),
      item('أفوكادو وحليب', 'Avocado & Milk'),
    ],
  },
  {
    id: 'milkshake',
    title: { en: 'Milkshakes', ar: 'ميلك شيك' },
    items: [
      item('ميلك شيك أوريو', 'Oreo Milkshake'),
      item('ميلك شيك فانيل', 'Vanilla Milkshake'),
      item('ميلك شيك شوكولا', 'Chocolate Milkshake'),
      item('ميلك شيك سيريلاك سادة', 'Plain Cerealac Milkshake'),
      item('ميلك شيك سيريلاك + كورن فليكس', 'Cerealac & Corn Flakes Milkshake'),
      item('ميلك شيك سيريلاك + مارشميلو', 'Cerealac & Marshmallow Milkshake'),
    ],
  },
  {
    id: 'saj-ice-cream',
    title: { en: 'Ice Cream on Saj', ar: 'بوظة عالصاج' },
    items: [
      item('شوكولا', 'Chocolate', sajIceOpts),
      item('فانيل', 'Vanilla', sajIceOpts),
      item('فريز', 'Strawberry', sajIceOpts),
      item('منغا', 'Mango', sajIceOpts),
    ],
  },
];

const ChimneyMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default ChimneyMenu;
