import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private readonly dashboard = inject(DashboardService);
  readonly open = this.dashboard.open;
  readonly i18n = inject(I18nService);

  close() {
    this.dashboard.closeDashboard();
  }
}

