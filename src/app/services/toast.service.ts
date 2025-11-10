import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$: Observable<ToastMessage[]> = this.toastSubject.asObservable();
  private toastIdCounter = 0;

  constructor() { }

  showSuccess(message: string, duration: number = 10000): void {
    const toast: ToastMessage = {
      id: this.toastIdCounter++,
      message,
      type: 'success',
      duration
    };
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration);
    }
  }

  showError(message: string, duration: number = 10000): void {
    const toast: ToastMessage = {
      id: this.toastIdCounter++,
      message,
      type: 'error',
      duration
    };
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration);
    }
  }

  removeToast(id: number): void {
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next(currentToasts.filter(toast => toast.id !== id));
  }
}
