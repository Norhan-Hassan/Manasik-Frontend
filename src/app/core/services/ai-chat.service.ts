import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * AIChatService
 * Responsible for communicating with the backend AI endpoint.
 * - sendMessage(conversationId, message) sends the user's message and returns AI response.
 * - The backend contract is assumed to accept { conversationId?, message } and return { conversationId, reply }
 * - Keep this service small so it can be mocked in tests.
 */
@Injectable({ providedIn: 'root' })
export class AIChatService {
  private http = inject(HttpClient);
  private readonly base = environment.apiUrl; // e.g. http://localhost:5076/api

  sendMessage(conversationId: string | null, message: string): Observable<any> {
    const payload = { conversationId, message };
    // POST to a presumed AI backend endpoint. Adjust path if backend differs.
    return this.http.post<any>(`${this.base}/ai/chat`, payload);
  }
}
