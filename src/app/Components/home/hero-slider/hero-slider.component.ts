import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { I18nService } from 'src/app/core/services/i18n.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

/**
 * HeroSliderComponent
 * Standalone component that displays a set of hero images and handles
 * auto-sliding, navigation arrows, and indicator dots.
 *
 * Inputs / Outputs: none for now. The images are defined here by default
 * (moved from HomeComponent). This component is reusable and can be extended
 * to accept an `@Input() images: string[]` in the future.
 */
@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css'],
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  // Slides: each entry contains image url and translation keys for content.
  readonly slides = [
    {
      image:
        'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleKey: 'hero.slides.0.title',
      subtitleKey: 'hero.slides.0.subtitle',
      descKey: 'hero.slides.0.description',
      badges: [
        { icon: 'map-pin', textKey: 'hero.badges.destinations' },
        { icon: 'clock', textKey: 'hero.badges.yearRound' },
        { icon: 'users', textKey: 'hero.badges.pilgrims' },
      ],
    },
    {
      image:
        'https://images.unsplash.com/photo-1733895422653-cf8a2370f87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleKey: 'hero.slides.1.title',
      subtitleKey: 'hero.slides.1.subtitle',
      descKey: 'hero.slides.1.description',
      badges: [
        { icon: 'map-pin', textKey: 'hero.badges.destinations' },
        { icon: 'calendar', textKey: 'hero.badges.yearRound' },
        { icon: 'users', textKey: 'hero.badges.pilgrims' },
      ],
    },
    {
      image:
        'https://images.unsplash.com/photo-1629971138860-4ff46dfb714f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleKey: 'hero.slides.2.title',
      subtitleKey: 'hero.slides.2.subtitle',
      descKey: 'hero.slides.2.description',
      badges: [
        { icon: 'map-pin', textKey: 'hero.badges.destinations' },
        { icon: 'calendar', textKey: 'hero.badges.yearRound' },
        { icon: 'users', textKey: 'hero.badges.pilgrims' },
      ],
    },
  ];

  // Reactive index for the current slide
  readonly index = signal<number>(0);
  readonly i18n = inject(I18nService);

  private intervalId: any = null;

  ngOnInit(): void {
    // Start auto-slide every 5 seconds
    this.intervalId = setInterval(() => this.next(), 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Move to next slide
  next(): void {
    const next = (this.index() + 1) % this.slides.length;
    this.index.set(next);
  }

  // Move to previous slide
  prev(): void {
    const prev = (this.index() - 1 + this.slides.length) % this.slides.length;
    this.index.set(prev);
  }

  // Select slide by dot
  goTo(i: number): void {
    this.index.set(i);
  }
}
