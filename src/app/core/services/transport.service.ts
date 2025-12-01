import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransportOption, TransportSearchParams,ApiResponse, GroundTransport } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // getTransportOptions(params?: TransportSearchParams): Observable<ApiResponse<TransportOption[]>> {
  //   let httpParams = new HttpParams();
  //   if (params) {
  //     Object.entries(params).forEach(([key, value]) => {
  //       if (value !== undefined && value !== null) {
  //         httpParams = httpParams.set(key, value.toString());
  //       }
  //     });
  //   }
  //   return this.http.get<ApiResponse<TransportOption[]>>(`${this.apiUrl}/transport`, { params: httpParams });
  // }
  getTransportOptions(): Observable<ApiResponse<TransportOption[]>> {
  
   
    return this.http.get<ApiResponse<TransportOption[]>>(`${this.apiUrl}/InternationalTransport/GetAllTransports`);
  }
 searchByRoute(departure: string, arrival: string): Observable<ApiResponse<TransportOption[]>> {
  const params = new HttpParams()
    .set('departureAirport', departure)
    .set('arrivalAirport', arrival);

  return this.http.get<ApiResponse<TransportOption[]>>(
    `${this.apiUrl}/InternationalTransport/SearchByRoute`,
    { params }
  );
}
  searchByDateRange(startDate: string, endDate: string): Observable<ApiResponse<TransportOption[]>> {
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('returnDate', endDate);
      return this.http.get<ApiResponse<TransportOption[]>>(
    `${this.apiUrl}/InternationalTransport/SearchByDateRange`,
    { params }
  );
  }
  getTransportOptionById(id: string): Observable<TransportOption> {
    return this.http.get<TransportOption>(`${this.apiUrl}/transport/${id}`);
  }

  // method for ground transport
   getTransportsByType(Type: string): Observable<ApiResponse<GroundTransport[]>> {
     const params = new HttpParams()
    .set('transportType', Type)
    
     return this.http.get<ApiResponse<GroundTransport[]>>(`${this.apiUrl}/GroundTransport/SearchByType`, { params });
   }
}



