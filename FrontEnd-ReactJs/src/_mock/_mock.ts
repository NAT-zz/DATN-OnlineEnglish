import { sub } from 'date-fns';
//
import {
  age,
  role,
  price,
  title,
  email,
  rating,
  percent,
  country,
  company,
  boolean,
  sentence,
  lastName,
  fullName,
  firstName,
  description,
  fullAddress,
  phoneNumber,
} from './assets';

// ----------------------------------------------------------------------

const _mock = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index: number) => email[index],
  phoneNumber: (index: number) => phoneNumber[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[index],
  role: (index: number) => role[index],
  company: (index: number) => company[index],
  address: {
    fullAddress: (index: number) => fullAddress[index],
    country: (index: number) => country[index],
  },
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index],
  },
  text: {
    title: (index: number) => title[index],
    sentence: (index: number) => sentence[index],
    description: (index: number) => description[index],
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index],
  },
  image: {
    cover: (index: number) =>
      `https://assets.minimals.cc/public/assets/images/mock/cover/cover-${index+1}.webp`,
    product: (index: number) =>
      `https://api-prod-minimal-v610.pages.dev/assets/images/m-products/product-${index + 1}.webp`,
    avatar: (index: number) =>
      `https://api-prod-minimal-v610.pages.dev/assets/images/avatar/avatar-${index + 1}.webp`,
  },
};

export default _mock;
