import { Component, inject } from '@angular/core';
import { I18nService } from 'src/app/core/services/i18n.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AirArrivalAirport, SeaArrivalAirport, TransportSearchParams, TransportType, AirDepartureAirport, SeaDepartureAirport, TransportOption, GroundTransport } from 'src/app/interfaces/transport.interface';
import { TransportService } from 'src/app/core/services/transport.service';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  readonly i18n = inject(I18nService);

  arrivalAirports: string[] = Object.values(AirArrivalAirport); 
  departureAirports: string[] = Object.values(AirDepartureAirport);

  searchParams: TransportSearchParams = {
    departureLocation: null,
    arrivalLocation: null,
    departureDate: undefined,
    returnDate: undefined,
    type: 'Plane'
  };

  flights: TransportOption[] = [];
  errorMessage: string = '';

  groundTransports: GroundTransport[] = [];
  groundErrorMessage: string = '';

  constructor(private transportService: TransportService, private router: Router) {}


setTransportType(type: string) {
  this.searchParams.type = type;

  // Reset select values
  this.searchParams.departureLocation = null;
  this.searchParams.arrivalLocation = null;

  if (type === 'Plane') {
    this.arrivalAirports = Object.values(AirArrivalAirport);
    this.departureAirports = Object.values(AirDepartureAirport);
  } else if (type === 'Ship') {
    this.arrivalAirports = Object.values(SeaArrivalAirport);
    this.departureAirports = Object.values(SeaDepartureAirport);
  }

  this.getAllTransportFilteredByType(type);
}
  searchflight() {
    if (this.searchParams.departureLocation && this.searchParams.arrivalLocation) {
      this.transportService
        .searchByRoute(this.searchParams.departureLocation, this.searchParams.arrivalLocation)
        .subscribe({
          next: (response) => {
            this.flights = response.data || [];
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'حدث خطأ أثناء البحث';
            this.flights = [];
          }
        });
    } else if (this.searchParams.departureDate && this.searchParams.returnDate) {
      this.transportService
        .searchByDateRange(this.searchParams.departureDate, this.searchParams.returnDate)
        .subscribe({
          next: (response) => {
            this.flights = response.data || [];
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'حدث خطأ أثناء البحث';
            this.flights = [];
          }
        });
    }
  }

  getAllTransportFilteredByType(type: string) {
    this.transportService.getTransportOptions().subscribe({
      next: (response) => {
        this.flights = response.data.filter(f => f.internationalTransportType === type);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'فشل في جلب الرحلات';
        this.flights = [];
      }
    });
  }

  searchByType(type: string) {
    this.transportService.getTransportsByType(type).subscribe({
      next: (response) => {
        this.groundTransports = (response.data || []).map(gt => ({
          ...gt,
          amenities: gt.description?.split(',').map(a => a.trim()) || []
        }));
        this.groundErrorMessage = '';
      },
      error: (err) => {
        this.groundTransports = [];
        this.groundErrorMessage = 'حدث خطأ أثناء جلب البيانات';
        console.error(err);
      }
    });
  }

  bookFlight(flight: any) {
    this.router.navigate(['booking/international'], { state: { selectedFlight: flight } });
  }
formatDurationString(value: string): string {
  
  if (!value) return '';

  // Split by " : " (spaces around colon)
  const parts = value.split(' : ');

  if (parts.length !== 3) return value; // fallback if format is unexpected

  const [hours, minutes, seconds] = parts;
   console.log(hours, minutes, seconds);
  return `${hours} days - ${minutes} hour - ${seconds} min`;
}

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(price);
  }
}
