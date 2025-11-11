export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  imageUrl: string;
  amenities: string[];
  rooms: Room[];
  pricePerNight: number;
  distanceFromHaram?: number;
  distanceFromNabawi?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  amenities: string[];
  imageUrl?: string;
  available: boolean;
}

export interface HotelSearchParams {
  city?: string;
  country?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: string[];
  distanceFromHaram?: number;
  distanceFromNabawi?: number;
}

