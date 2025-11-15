import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelsService } from 'src/app/core/services/hotels.service';
import { LucideAngularModule } from 'lucide-angular';

/**
 * HotelDetailsComponent
 * - Standalone component that fetches hotel by id using HotelsService.getHotelById
 * - Displays all hotel information including image, name, price, distance, city, rate, and description
 * - This component is responsible only for presentation and fetching; actions (booking, review)
 *   can be implemented by other services.
 */
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotels = inject(HotelsService);

  loading = true;
  hotel: any = null;

  ngOnInit(): void {
    // Read :id from route params and fetch hotel details.
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.hotels.getHotelById(id).subscribe({
      next: (h) => {
        this.hotel = h;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load hotel', err);
        this.loading = false;
      },
    });
  }
}
