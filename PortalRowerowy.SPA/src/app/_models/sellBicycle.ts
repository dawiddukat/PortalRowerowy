import { SellBicyclePhoto } from './sellBicyclePhoto';

export interface SellBicycle {
    id: number;
    sellBicycleName?: string;
    // url?: any;
    sellBicyclePhotos: SellBicyclePhoto[];
    price?: number;
    typeBicycle: string;
    description: string;
    dateAdded: Date;
    photoUrl: string;
    userId: number;
}

