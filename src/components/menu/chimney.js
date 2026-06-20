import React from 'react';
import RestaurantMenuBase from './RestaurantMenuBase';

const img = (file) => encodeURI(`/assets/menu/chimney/${file}`);

const d = (ar, en) => ({ ar, en });

const item = (ar, en, description, imageFile) => ({
  name: { ar, en },
  ...(description ? { description } : {}),
  ...(imageFile ? { image: img(imageFile) } : {}),
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
  promo: {
    ar: 'استعداد تام لتخديم كافة المناسبات و حفلات أعياد الميلاد ، حفلات التخرج ، المناسبات الخاصة و غيرها\n\nمع تشكيلة مميزة من قوالب الكيك الفاخرة و التسالي\n\nمزمزة شريك مناسباتكم',
    en: 'Fully prepared to cater all occasions and celebrations — birthday parties, graduation parties, private events, and more.\n\nFeaturing a distinctive selection of premium cake molds and snacks.\n\nMazmazeh — your occasions partner.',
  },
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
    id: 'winter-chimney',
    title: { en: 'Winter Chimney Roll', ar: 'أصناف الشتوي تشيميني رول' },
    items: [
      item(
        'سحلب مع حليب',
        'Sahlab with Milk',
        d('مع مكسرات أو جوز الهند أو القرفة', 'With nuts, coconut, or cinnamon'),
        'Sahlab with Milk.jpg'
      ),
      item('كستنا', 'Chestnuts', undefined, 'Chestnuts.jpeg'),
      item('كراوية', 'Karawiya', undefined, 'Karawiya.jpg'),
      item('حبوب', 'Grains', undefined, 'Grains.jpg'),
      item('شوندر', 'Beets', undefined, 'Beets.jpg'),
      item('فول نابت', 'Boiled Fava Beans', undefined, 'Boiled Fava Beans.jpg'),
      item('بليلة', 'Balila', undefined, 'Balila.jpg'),
      item('بطاطا حلوة', 'Sweet Potato', undefined, 'Sweet Potato.jpeg'),
      item('ميكس شتوي', 'Winter Mix', undefined, 'Winter MIx.jpg'),
    ],
  },
  {
    id: 'wafer-chocolate',
    title: { en: 'Wafer Chocolate', ar: 'أصناف وافر شوكولا' },
    items: [
      item('تشميني فتوش فواكه مع آيس كريم', 'Chimney Fruit Fattoush with Ice Cream', toppings, 'Chimney Fruit Fattoush with Ice Cream.jpg'),
      item('غوفر فواكه مع آيس كريم', 'Fruit Gaufre with Ice Cream', toppings, 'Fruit Gaufre with Ice Cream.jpg'),
      item('كريب فواكه مع آيس كريم', 'Fruit Crepe with Ice Cream', toppings, 'Fruit Crepe with Ice Cream.jpg'),
      item('تشميني رول بالكاسة', 'Chimney Roll in a Cup', dipToppings, 'Chimney Roll in a Cup.jpeg'),
    ],
  },
  {
    id: 'tamari',
    title: { en: 'Tamari Cakes', ar: 'تماري كعك' },
    items: [
      item('تماري كلاسيك', 'Classic Tamari', tamariClassic, 'Classic Tamari.jpg'),
      item('تماري كلاسيك دبل', 'Double Classic Tamari', tamariClassic, 'Double Classic Tamari.jpg'),
      item('تماري كلاسيك بالموز', 'Classic Tamari with Banana', tamariBanana, 'Classic Tamari with Banana.jpg'),
      item('تماري كعك اكسترا', 'Extra Tamari Cake', tamariExtra, 'Extra Tamari Cake.jpg'),
      item('تماري شوكولا', 'Chocolate Tamari', tamariChocolate, 'Chocolate Tamari.jpg'),
    ],
  },
  {
    id: 'damascus-snacks',
    title: { en: 'Damascus Snacks', ar: 'تسالي شامية' },
    items: [
      item('ترمس', 'Lupini Beans', undefined, 'Lupini Beans.jpg'),
      item('عرنوس ذرة مسلوق', 'Boiled Corn on the Cob', undefined, 'Boiled Corn on the Cob.jpg'),
      item('علبة سلطة ذرة', 'Corn Salad Box', undefined, 'Corn Salad Box.jpeg'),
      item('سلطة ذرة دبل', 'Double Corn Salad', cornDouble, 'Double Corn Salad.jpg'),
      item('شيبس حلزون نكهات', 'Spiral Chips Flavors', spiralChips, 'Spiral Chips Flavors.jpg'),
    ],
  },
  {
    id: 'saj-manouche',
    title: { en: 'Saj Manouche', ar: 'مناقيش صاج' },
    items: [
      item('محمرة', 'Muhammara', undefined, 'Muhammara.jpg'),
      item('لبنة وزيتون', 'Labneh & Olives', undefined, 'Labneh & Olives.jpg'),
      item('جبنة', 'Cheese', undefined, 'Cheese.jpg'),
      item('زعتر', 'Zaatar', undefined, 'Zaatar.jpeg'),
      item('قشقوان', 'Kashkaval', undefined, 'Kashkaval.jpg'),
      item('محمرة وقشقوان', 'Muhammara & Kashkaval', undefined, 'Muhammara & Kashkaval.jpg'),
      item('زعتر مع قشقوان', 'Zaatar with Kashkaval', undefined, 'Zaatar & Kashkaval .jpeg'),
      item('زعتر ومحمرة', 'Zaatar & Muhammara', undefined, 'Zaatar & Muhammara.jpeg'),
      item('زيتون مع قشقوان', 'Olives with Kashkaval', undefined, 'Olives with Kashkaval.jpg'),
      item('فطر مع قشقوان', 'Mushroom with Kashkaval', undefined, 'Mushroom with Kashkaval.jpg'),
      item('ذرة مع قشقوان', 'Corn with Kashkaval', undefined, 'Corn with Kashkaval.jpg'),
      item('بيتزا', 'Pizza', undefined, 'Pizza.jpg'),
      item('لحومات باردة مع قشقوان', 'Cold Cuts with Kashkaval', undefined, 'Cold Cuts with Kashkaval.jpg'),
      item('شوكولا', 'Chocolate', chocolateManouche, 'Chocolate.jpg'),
      item('قشطة وعسل وموز', 'Cream & Honey & Banana', undefined, 'Cream & Honey & banana.jpg'),
      item('قشطة وعسل ومكسرات', 'Cream & Honey & Nuts', undefined, 'Cream & Honey & Nuts.jpg'),
    ],
  },
  {
    id: 'juices',
    title: { en: 'Juices', ar: 'عصائر' },
    items: [
      item('منغا', 'Mango', undefined, 'Mango.jpg'),
      item('برتقال', 'Orange', undefined, 'Orange.jpeg'),
      item('رمان', 'Pomegranate', undefined, 'Pomegranate.jpg'),
      item('فريز', 'Strawberry', undefined, 'Strawberry.jpg'),
      item('ليمون', 'Lemon', undefined, 'Lemon.jpeg'),
    ],
  },
  {
    id: 'slush',
    title: { en: 'Slush', ar: 'سلاش' },
    items: [
      item('فريز وحليب', 'Strawberry & Milk', undefined, 'Strawberry & Milk.jpg'),
      item('آيس كوفي', 'Iced Coffee', undefined, 'Iced Coffee.jpg'),
    ],
  },
  {
    id: 'ice-cream',
    title: { en: 'Ice Cream', ar: 'آيس كريم' },
    items: [
      item('بوري عادي', 'Regular Cone', undefined, 'Regular Cone.jpg'),
      item('بوري دبل', 'Double Cone', undefined, 'Double Cone.jpg'),
      item('بوري بسكوت أو كاسة', 'Cone, Biscuit, or Cup'),
    ],
  },
  {
    id: 'cocktails',
    title: { en: 'Cocktails', ar: 'كوكتيلات' },
    items: [
      item('موز وحليب', 'Banana & Milk', undefined, 'Banana & Milk.jpg'),
      item('فريز وموز وحليب', 'Strawberry, Banana & Milk', undefined, 'Strawberry, Banana & Milk.jpg'),
      item('فواكه مشكلة', 'Mixed Fruits', undefined, 'Mixed Fruits.jpeg'),
      item('أفوكادو وحليب', 'Avocado & Milk', undefined, 'Avocado & Milk.jpeg'),
    ],
  },
  {
    id: 'milkshake',
    title: { en: 'Milkshakes', ar: 'ميلك شيك' },
    items: [
      item('ميلك شيك أوريو', 'Oreo Milkshake', undefined, 'Oreo Milkshake.jpg'),
      item('ميلك شيك فانيل', 'Vanilla Milkshake', undefined, 'Vanilla Milkshake.jpeg'),
      item('ميلك شيك شوكولا', 'Chocolate Milkshake', undefined, 'Chocolate Milkshake.jpg'),
      item('ميلك شيك سيريلاك سادة', 'Plain Cerealac Milkshake', undefined, 'Plain Cerealac Milkshake.jpg'),
      item('ميلك شيك سيريلاك + كورن فليكس', 'Cerealac & Corn Flakes Milkshake', undefined, 'Cerealac & Corn Flakes Milkshake.jpeg'),
      item('ميلك شيك سيريلاك + مارشميلو', 'Cerealac & Marshmallow Milkshake', undefined, 'Cerealac & Marshmallow Milkshake.jpeg'),
    ],
  },
  {
    id: 'saj-ice-cream',
    title: { en: 'Ice Cream on Saj', ar: 'بوظة عالصاج' },
    items: [
      item('شوكولا', 'Chocolate', sajIceOpts, 'Chocolate.jpg'),
      item('فانيل', 'Vanilla', sajIceOpts, 'Vanilla saj.jpeg'),
      item('فريز', 'Strawberry', sajIceOpts, 'Strawberry (2).jpg'),
      item('منغا', 'Mango', sajIceOpts, 'Mango.jpg'),
    ],
  },
];

const ChimneyMenu = () => (
  <RestaurantMenuBase restaurant={restaurant} colors={colors} categories={categories} />
);

export default ChimneyMenu;
