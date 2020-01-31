import { UserPhoto } from './userPhoto';
import { SellBicycle } from './SellBicycle';
import { Adventure } from './Adventure';

export interface User {
        /*Podstawowe informacje*/
        id: number;
        username: string;
        gender: string;
        age: number;
        typeBicycle: string;
        created: Date;
        lastActive: Date;
        country: string;
        voivodeship: string;
        city: string;
        /*info*/
        bicycles: string;
        profession: string;
        /*o mnie */
        description: string;
        /*zainteresowanie*/
        interests: string;
        dreamBicycle: string;
        /*zdjęcia*/
        userPhotos: UserPhoto[];
        /*sprzedawane rowery*/
        sellBicycles: SellBicycle[];
        /*wyprawy*/
        adventures: Adventure[];
        photoUrl: string;
}
