import { MALE_PHOTO_PLACEHOLDER, FEMALE_PHOTO_PLACEHOLDER } from 'assets';
import moment from 'moment';

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

export function generateCompanyEmail(fName, lName, rank, isRehire=false) {
  const firstName = fName.split(' ');
  const ctr = isRehire ? 1 : "";
  if (rank.toLowerCase() === 'rank and file') {
    return `${firstName[0][0]}${lName.replace(" ", "")}${ctr}.vcdcph@gmail.com`.toLowerCase();
  } else {
    return `${firstName[0]}.${lName.replace(" ", "")}${ctr}@vcdcph.com`.toLowerCase();
  }
}

export function getProbationaryEndDate(dateHired) {
  return moment(dateHired)
            .endOf('day')
            .add(6, 'months')
            .endOf('day')
}

export function getContractEndDate(dateHired) {
  return moment(dateHired)
            .endOf('day')
            .add(6, 'months')
            .endOf('day')
}

export function upsert(array, element, index) {
  const i = array.findIndex(_element => _element[index] === element[index]);
  if (i > -1) array[i] = element;
  else array.push(element);
console.log({array})
  return array;
}