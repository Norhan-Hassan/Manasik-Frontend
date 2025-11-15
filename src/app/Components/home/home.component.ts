import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
// New standalone components to keep HomeComponent lightweight and composable
import { HeroSliderComponent } from './hero-slider/hero-slider.component';
import { AIChatComponent } from './ai-chat/ai-chat.component';
import { I18nService } from 'src/app/core/services/i18n.service';

// Interfaces
export interface QuickAction {
  icon: string;
  title: string;
  description: string;
  color: string;
  route?: string;
  titleKey?: string;
  descriptionKey?: string;
}

export interface Package {
  id: number;
  title: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  included: string[];
}

export interface Step {
  icon: string;
  step: string;
  title: string;
  description: string;
  titleKey?: string;
  descriptionKey?: string;
}

export interface Statistic {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  // Use translation keys for testimonial text so content can be localized.
  textKey?: string;
  text?: string; // fallback if no key provided (e.g., from backend)
  verified: boolean;
}

export interface FAQ {
  // Optionally store translation keys to support i18n. If keys are absent,
  // `question`/`answer` will be used as provided (useful for backend-driven content).
  question?: string;
  answer?: string;
  questionKey?: string;
  answerKey?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  // Import HeroSliderComponent and AIChatComponent so the home page can use them
  imports: [CommonModule, RouterModule, LucideAngularModule, FormsModule, HeroSliderComponent, AIChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private readonly router = inject(Router);
  // expose i18n service to the template so static text can flip languages
  readonly i18n = inject(I18nService);

  // Hero slider has been moved to a dedicated standalone component: HeroSliderComponent

  // State management
  readonly animateIn = signal<boolean>(false);
  readonly openFAQ = signal<string | null>(null);
  readonly searchQuery = signal<string>('');
  readonly newsletterEmail = signal<string>('');
  readonly isSubmittingNewsletter = signal<boolean>(false);

  // Quick Actions Data (use i18n keys for title/description so these can translate)
  readonly actions: QuickAction[] = [
    {
      icon: 'package',
      title: 'Book Complete Package',
      description: 'All-inclusive Umrah planning',
      color: 'rgba(var(--primary-rgb), 0.1)',
      route: '/packages',
      // keys for translation
      // titleKey/descriptionKey are optional; fallback to title/description
      // when backend provides raw strings.
      // Using keys here ensures these UI items are translated.
      // Keys: home.actions.0.title, home.actions.0.desc etc.
      // See I18nService for translations.
    },
    {
      icon: 'building-2',
      title: 'Find Hotels',
      description: 'Near Haram with best prices',
      color: 'rgba(16, 185, 129, 0.1)',
      route: '/hotels',
    },
    {
      icon: 'bus',
      title: 'Transport Options',
      description: 'Comfortable & reliable',
      color: 'rgba(245, 158, 11, 0.1)',
      route: '/transport',
    },
  ];

  // Featured Packages Data
  readonly packages: Package[] = [
    {
      id: 1,
      title: 'Premium Umrah Package',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxOTExMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      price: 2499,
      duration: '14 Days',
      rating: 4.8,
      reviews: 234,
      category: 'Premium',
      included: ['5-Star Hotel', 'Flight Included', 'Visa Assistance', 'Transport']
    },
    {
      id: 2,
      title: 'Standard Umrah Package',
      image: 'https://images.unsplash.com/photo-1662104128135-7bd873b2befd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwcGF0dGVybnxlbnwxfHx8fDE3NjE5Nzk0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080 ',
      price: 1799,
      duration: '10 Days',
      rating: 4.6,
      reviews: 189,
      category: 'Standard',
      included: ['4-Star Hotel', 'Visa Assistance', 'Transport', 'Breakfast']
    },
    {
      id: 3,
      title: 'Economy Umrah Package',
      image: 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwaG9seXxlbnwxfHx8fDE3NjIwMDAzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080 ',
      price: 1299,
      duration: '7 Days',
      rating: 4.5,
      reviews: 156,
      category: 'Economy',
      included: ['3-Star Hotel', 'Visa Assistance', 'Shared Transport']
    },
    {
      id: 4,
      title: 'VIP Umrah Experience',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxOTExMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      price: 4999,
      duration: '21 Days',
      rating: 5.0,
      reviews: 98,
      category: 'VIP',
      included: ['Luxury Hotel', 'Business Class', 'Private Guide', '24/7 Concierge']
    }
  ];

  // Filtered packages based on selected category
  filteredPackages = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') return this.packages;
    return this.packages.filter(p => p.category === category);
  });

  // Categories for filter
  readonly categories = ['All', 'Economy', 'Standard', 'Premium', 'VIP'];
  selectedCategory = signal('All');

  // How It Works Data
  readonly steps: Step[] = [
    {
      icon: 'search',
      step: '01',
      // keys: home.steps.0.title / home.steps.0.description
      title: 'Choose Package/Services',
      description: 'Browse our curated packages or build your own custom journey',
      // keep keys optional for translation
    },
    {
      icon: 'settings',
      step: '02',
      title: 'Customize Your Trip',
      description: 'Select hotels, transport, and dates that work best for you'
    },
    {
      icon: 'credit-card',
      step: '03',
      title: 'Secure Payment',
      description: 'Pay securely with multiple payment options and flexible plans'
    },
    {
      icon: 'check-circle',
      step: '04',
      title: 'Receive Confirmation',
      description: 'Get instant confirmation and all travel documents via email'
    }
  ];

  // Statistics Data
  readonly stats: Statistic[] = [
    { icon: 'users', value: 50000, suffix: '+', label: 'stats.totalBookings' },
    { icon: 'trending-up', value: 98, suffix: '%', label: 'stats.satisfactionRate' },
    { icon: 'headphones', value: 24, suffix: '/7', label: 'stats.supportAvailable' },
    { icon: 'map-pin', value: 200, suffix: '+', label: 'stats.destinations' }
  ];

  // Testimonials Data — use translation keys for the message body so it can be
  // translated via I18nService. Names and avatars remain as-is (user data).
  readonly testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed ',
      rating: 5,
      textKey: 'testimonials.items.0',
      verified: true,
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima ',
      rating: 5,
      textKey: 'testimonials.items.1',
      verified: true,
    },
    {
      id: 3,
      name: 'Mohammad Ali',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad ',
      rating: 5,
      textKey: 'testimonials.items.2',
      verified: true,
    },
  ];

  // FAQ Data — use translation keys so FAQs are localized. If you later fetch
  // FAQs from the backend, keep the `question`/`answer` fields and omit keys.
  readonly faqs: FAQ[] = [
    { questionKey: 'faq.items.0.question', answerKey: 'faq.items.0.answer' },
    { questionKey: 'faq.items.1.question', answerKey: 'faq.items.1.answer' },
    { questionKey: 'faq.items.2.question', answerKey: 'faq.items.2.answer' },
    { questionKey: 'faq.items.3.question', answerKey: 'faq.items.3.answer' },
    { questionKey: 'faq.items.4.question', answerKey: 'faq.items.4.answer' },
    { questionKey: 'faq.items.5.question', answerKey: 'faq.items.5.answer' },
    { questionKey: 'faq.items.6.question', answerKey: 'faq.items.6.answer' },
    { questionKey: 'faq.items.7.question', answerKey: 'faq.items.7.answer' },
  ];

  ngOnInit(): void {
    // Trigger hero animation on load
    setTimeout(() => this.animateIn.set(true), 100);
  }

  ngOnDestroy(): void {
    // Nothing to clean up in HomeComponent related to hero slider anymore.
  }

  /**
   * Set selected category filter
   */
  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  /**
   * Toggle FAQ item open/close state
   */
  toggleFAQ(question?: string): void {
    // If no question/key provided (e.g., backend didn't provide keys), do nothing
    if (!question) return;
    this.openFAQ.update((current) => (current === question ? null : question));
  }

  /**
   * Check if FAQ is open
   */
  isFAQOpen(question?: string): boolean {
    if (!question) return false;
    return this.openFAQ() === question;
  }

  /**
   * Handle search form submission
   */
  onSearchSubmit(): void {
    const query = this.searchQuery().trim();
    if (query) {
      this.router
        .navigate(['/search'], { queryParams: { q: query } })
        .catch((err) => console.error('Navigation error:', err));
    }
  }

  /**
   * Handle quick action click
   */
  onActionClick(action: QuickAction): void {
    if (action.route) {
      this.router
        .navigate([action.route])
        .catch((err) => console.error('Navigation error:', err));
    }
  }

  /**
   * Handle package view details
   */
  onViewPackageDetails(packageId: number): void {
    this.router
      .navigate(['/packages', packageId])
      .catch((err) => console.error('Navigation error:', err));
  }

  /**
   * Handle view all packages
   */
  onViewAllPackages(): void {
    this.router
      .navigate(['/packages'])
      .catch((err) => console.error('Navigation error:', err));
  }

  /**
   * Handle newsletter subscription
   */
  onNewsletterSubmit(): void {
    const email = this.newsletterEmail().trim();
    if (!email || !this.isValidEmail(email)) {
      // TODO: Show error message
      return;
    }

    this.isSubmittingNewsletter.set(true);
    // TODO: Implement newsletter subscription API call
    setTimeout(() => {
      this.isSubmittingNewsletter.set(false);
      this.newsletterEmail.set('');
      // TODO: Show success message
    }, 1000);
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate array of numbers for star rating display
   */
  getStarArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  /**
   * Set hero image by querying the static img element with the alt text used in template.
   * We keep this out of the template to avoid changing any HTML structure as requested.
   */
  private setHeroImage(src: string): void {
    try {
      const img = document.querySelector('img[alt="Kaaba in Makkah"]') as HTMLImageElement | null;
      if (img) {
        img.src = src;
      }
    } catch (err) {
      // ignore errors when DOM isn't available
    }
  }
}