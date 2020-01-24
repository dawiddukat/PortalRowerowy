import { UserPhoto } from './userPhoto';

export interface User {
    id: number;
        username: string;
        gender: string;
        age: number;
        typeBicycle: string;

        created: Date;
        lastActive: Date;
        country: string;
        city: string;
        bicycles: string;
        profession: string;

        description: string;
        interests: string;
        dreamBicycle: string;

        userPhotos: UserPhoto[];

        sellBicycles: any[];

        adventures: any[];
        
        photoUrl: string;
}
