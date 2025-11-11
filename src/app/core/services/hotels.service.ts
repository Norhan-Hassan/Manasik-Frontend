import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hotel, HotelSearchParams, Room } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getHotels(params?: HotelSearchParams): Observable<Hotel[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => httpParams = httpParams.append(key, v.toString()));
          } else {
            httpParams = httpParams.set(key, value.toString());
          }
        }
      });
    }
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`, { params: httpParams });
  }

  getHotelById(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  getRooms(hotelId: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/hotels/${hotelId}/rooms`);
  }

  getRoomById(hotelId: string, roomId: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/hotels/${hotelId}/rooms/${roomId}`);
  }
}

