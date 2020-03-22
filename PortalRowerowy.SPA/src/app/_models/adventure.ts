import { AdventurePhoto } from './adventurePhoto';
import { User } from './user';

export interface Adventure {
    id: number;
    adventureName?: string;
    url?: any;
    adventurePhotos: AdventurePhoto[];
    distance: number;
    description: string;
    dateAdded: Date;
    photoUrl: string;
    userId: number;
    typeBicycle: string;
    user: User;
}
