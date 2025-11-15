import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';
import {
  LucideAngularModule,
  Globe,
  Home,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  User,
  X,
  Users,
  Building2,
  Headphones,
  Star,
  Clock,
  MapPin,
  Calendar,
  Check,
  CheckCircle,
  Mail,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
  Bus,
  Settings,
  CreditCard,
  TrendingUp,
} from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes'; // define your routes in a separate file


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Menu,
        Search,
        Globe,
        Moon,
        ShoppingCart,
        User,
        Home,
        X,
        Users,
        Building2,
        Headphones,
        Star,
        Clock,
        MapPin,
        Check,
        CheckCircle,
        Mail,
        Shield,
        ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Package,
        Bus,
        Settings,
        CreditCard,
        TrendingUp,
      }),
    ),
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ),
  ]
})
  .catch((err) => console.error(err));
