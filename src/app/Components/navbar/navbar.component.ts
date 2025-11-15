import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { I18nService } from 'src/app/core/services/i18n.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';

export interface NavLink {
  // use translation keys instead of hardcoded labels so text can be localized
  key: string;
  path: string;
  icon?: string;
}

export interface NavIcon {
  name: string;
  ariaLabel: string;
  action?: () => void;
  showBadge?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly router = inject(Router);

  // State management
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly cartCount = signal<number>(0);
  // Theme state: simple dark mode flag. Primary color values are fixed per theme
  readonly isDarkMode = signal<boolean>(localStorage.getItem('app_dark') === '1');
  // i18n service (centralized translation and dir handling) - exposed to template
  readonly i18n = inject(I18nService);
  readonly dashboardService = inject(DashboardService);

  // Computed properties
  readonly hasCartItems = computed(() => this.cartCount() > 0);

  // Desktop navigation links using i18n keys (labels resolved in template)
  readonly navLinks: NavLink[] = [
    { key: 'nav.home', path: '/', icon: 'home' },
    { key: 'nav.packages', path: '/packages', icon: 'package' },
    { key: 'nav.hotels', path: '/hotels', icon: 'building-2' },
    { key: 'nav.transport', path: '/transport', icon: 'bus' },
    { key: 'nav.about', path: '/about', icon: 'info' },
  ];

  // Action icons with handlers
  readonly navIcons: NavIcon[] = [
    {
      name: 'search',
      ariaLabel: 'Search',
      action: () => this.handleSearch(),
    },
    {
      name: 'globe',
      ariaLabel: 'Change Language',
      action: () => this.handleLanguageChange(),
    },
    {
      name: 'moon',
      ariaLabel: 'Toggle Dark Mode',
      action: () => this.handleThemeToggle(),
    },
    {
      name: 'shopping-cart',
      ariaLabel: 'View Shopping Cart',
      action: () => this.handleCartClick(),
      showBadge: true,
    },
    {
      name: 'user',
      ariaLabel: 'User Account',
      action: () => this.handleUserClick(),
    },
    {
      name: 'menu',
      ariaLabel: 'Toggle Mobile Menu',
      action: () => this.toggleMobileMenu(),
    },
  ];

  constructor() {
    // Apply persisted theme on startup. Language/dir is managed by I18nService.
      try {
        this.applyThemeState(this.isDarkMode());
    } catch (err) {
      // ignore
    }
  }

  /*
   * NOTE: Language / Direction handling
   * - We only modify the HTML document's `lang` and `dir` attributes here to toggle
   *   LTR/RTL globally for the application. This keeps component templates and
   *   logic unchanged while allowing the UI to flip direction when Arabic is selected.
   * - The navbar exposes a globe icon (see template) which calls `handleLanguageChange()`.
   * - We persist the selected language in localStorage so direction survives reloads.
   */

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  /**
   * Handle navigation link click (close mobile menu)
   */
  onNavLinkClick(): void {
    this.closeMobileMenu();
  }

  /**
   * Handle icon click actions
   */
  onIconClick(icon: NavIcon): void {
    if (icon.action) {
      icon.action();
    }
  }

  /**
   * Handle search icon click
   */
  private handleSearch(): void {
    // Navigate to search page (user can type query there)
    this.router.navigate(['/search']).catch((err) => console.error('Navigation error:', err));
  }

  /**
   * Handle language change
   */
  private handleLanguageChange(): void {
    // Use centralized i18n service which handles lang dir and persistence
    try {
      this.i18n.toggleLanguage();
    } catch (e) {
      // Fallback: flip dir manually
      const current = document.documentElement.getAttribute('dir') === 'ar' ? 'ar' : 'en';
      const next = current === 'en' ? 'ar' : 'en';
      this.applyLanguage(next as 'en' | 'ar');
    }
  }

  /**
   * Handle theme toggle
   */
  private handleThemeToggle(): void {
    const next = !this.isDarkMode();
    this.isDarkMode.set(next);
    try {
      localStorage.setItem('app_dark', next ? '1' : '0');
    } catch (e) {}
    // Apply theme and set fixed primary color for the selected theme
    this.applyThemeState(next);
  }

  private applyLanguage(lang: 'en' | 'ar') {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    } catch (e) {
      // ignore
    }
  }

  private applyThemeState(dark: boolean) {
    try {
      if (dark) {
        document.documentElement.classList.add('dark');
        // ensure dark primary color is consistent
        document.documentElement.style.setProperty('--primary', '#d4af37');
        document.documentElement.style.setProperty('--primary-rgb', '212,175,55');
      } else {
        document.documentElement.classList.remove('dark');
        // ensure light primary color is consistent
        document.documentElement.style.setProperty('--primary', '#0e7c3b');
        document.documentElement.style.setProperty('--primary-rgb', '14,124,59');
      }
    } catch (e) {
      // ignore
    }
  }


  /**
   * Handle cart icon click
   */
  private handleCartClick(): void {
    this.router.navigate(['/cart']).catch((err) => console.error('Navigation error:', err));
  }

  /**
   * Handle user icon click
   */
  private handleUserClick(): void {
    // Open the dashboard modal instead of navigating away. DashboardComponent
    // listens to DashboardService.open to show itself.
    try {
      this.dashboardService.openDashboard();
    } catch (err) {
      // fallback: navigate to profile route
      this.router.navigate(['/profile']).catch((e) => console.error('Navigation fallback error:', e));
    }
  }

  /**
   * Update cart count (can be called from a service)
   */
  updateCartCount(count: number): void {
    this.cartCount.set(count);
  }
}
