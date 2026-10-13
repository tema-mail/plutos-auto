// Контакты Plutos Auto – как на plutosauto.ru (снято 14.10.2026).
export const site = {
  name: 'Plutos Auto',
  tagline: 'Доставка новых автомобилей под заказ из Европы',
  address: 'Ленинградский проспект, д. 36, стр. 39, пом. 43',
  city: 'Москва',
  // точка организации в Яндекс Картах (plutosauto, org 112969842901)
  coords: [55.790236, 37.56723] as [number, number],
  map: 'https://yandex.ru/maps/org/plutosauto/112969842901/?ll=37.567230%2C55.790236&z=17',
  phones: [
    { dept: 'Отдел продаж', phone: '+7 977 122 61 00', href: 'tel:+79771226100', who: 'Олег' },
    { dept: 'Отдел продаж', phone: '+7 991 155 22 20', href: 'tel:+79911552220', who: 'Евгений' },
    { dept: 'Отдел логистики', phone: '+375 44 776 06 07', href: 'tel:+375447760607', who: 'Евгений' },
    { dept: 'Бухгалтерия', phone: '+7 925 924 50 94', href: 'tel:+79259245094', who: 'Татьяна' },
  ],
  emails: ['BLR_opt@mail.ru', 'Zhenya-vechorko@yandex.ru'],
  whatsapp: 'https://wa.me/375445158847',
  telegram: 'https://t.me/PlutosAuto',
  instagram: 'https://www.instagram.com/plutos.auto/',
  youtube: 'https://www.youtube.com/@PlutosAuto',
  vk: 'https://vk.com/plutosauto',
  facebook: 'https://www.facebook.com/plutosauto/',
  contract: 'https://docs.google.com/document/d/1BumylgvEzWF3K7JBcJbH869PnSRhnKR2KRWaIG4pfbc/edit?usp=sharing',
};

export const nav = [
  { href: '#models', label: 'Модели авто' },
  { href: '#quiz', label: 'Заказать подбор' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#services', label: 'Услуги' },
  { href: '#contacts', label: 'Контакты' },
];

// Ссылка с учётом подпапки GitHub Pages.
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const img = (path: string) => url(`img/${path}`);
/** srcset из пары размеров, которые делает scripts/photos.py */
export const srcset = (base: string, widths: number[]) => widths.map((w) => `${img(`${base}-${w}.webp`)} ${w}w`).join(', ');
