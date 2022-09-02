import { MALE_PHOTO_PLACEHOLDER, FEMALE_PHOTO_PLACEHOLDER } from 'assets';

export function getAvatar(gender: string = "male") {
    if (gender.toLocaleLowerCase() == "female") {
        return FEMALE_PHOTO_PLACEHOLDER;
    }
    return MALE_PHOTO_PLACEHOLDER;
};