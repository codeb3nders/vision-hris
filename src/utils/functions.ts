import { MALE_PHOTO_PLACEHOLDER, FEMALE_PHOTO_PLACEHOLDER } from 'assets';

export function getAvatar(gender: string = 'male') {
  if (gender.toLocaleLowerCase() == 'female') {
    return FEMALE_PHOTO_PLACEHOLDER;
  }
  return MALE_PHOTO_PLACEHOLDER;
}

export function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export function generateArrayOfYears(lessYears:number) {
  var max = new Date().getFullYear()
  var min = max - lessYears
  var years:number[] = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}