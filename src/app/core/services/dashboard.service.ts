import { Injectable, signal } from '@angular/core';

/**
 * DashboardService
 * - Small global service that exposes an `open` signal used to show/hide the
 *   Dashboard overlay. The Navbar will call `open()` and the Dashboard component
 *   will call `close()` when the user dismisses it.
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private _open = signal<boolean>(false);
  readonly open = this._open.asReadonly();

  openDashboard() {
    this._open.set(true);
  }

  closeDashboard() {
    this._open.set(false);
  }
}
