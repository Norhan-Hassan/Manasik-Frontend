import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LucideAngularModule } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(LucideAngularModule),
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
