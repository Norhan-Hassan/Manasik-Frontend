import { Hotel } from './hotel.interface';
import { TransportOption } from './transport.interface';

export interface Package {
  id: string;
  name: string;
  description: string;
  duration: number;
  hotels: Hotel[];
  transportOptions: TransportOption[];
  totalPrice: number;
  discount?: number;
  imageUrl: string;
  inclusions: string[];
  exclusions: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

