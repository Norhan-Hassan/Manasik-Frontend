import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css'],
})
export class HeroSliderComponent implements OnInit {
  

  readonly slides: Slide[] = [
    {
      image:
        'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Experience Makkah',
      subtitle: 'The Sacred City',
      description:
        'Begin your spiritual journey at the holiest site in Islam',
    },
    {
      image:
        'https://images.unsplash.com/photo-1733895422653-cf8a2370f87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Discover Madinah',
      subtitle: 'The City of Light',
      description:
        "Visit the Prophet's Mosque and experience tranquility",
    },
    {
      image:
        'https://images.unsplash.com/photo-1629971138860-4ff46dfb714f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Complete Journey',
      subtitle: 'Makkah & Madinah',
      description:
        'All-inclusive packages for a seamless pilgrimage',
    },
  ];

  currentIndex = 0;
  private intervalId: any;

ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), 6000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}


