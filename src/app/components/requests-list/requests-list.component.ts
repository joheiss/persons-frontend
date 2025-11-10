import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { ToastService } from '../../services/toast.service';
import { Request, RequestStatus, RequestCommand } from '../../models/request.model';

@Component({
  selector: 'app-requests-list',
  imports: [CommonModule],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent implements OnInit {
  requests: Request[] = [];
  loading = false;
  RequestStatus = RequestStatus;
  RequestCommand = RequestCommand;

  constructor(
    private requestService: RequestService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getAllRequests().subscribe({
      next: (requests) => {
        // Sort by changedAt descending
        this.requests = requests.sort((a, b) => {
          const dateA = new Date(a.changedAt).getTime();
          const dateB = new Date(b.changedAt).getTime();
          return dateB - dateA;
        });
        this.loading = false;
      },
      error: (error) => {
        this.toastService.showError(`Error loading requests: ${error.message}`);
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.COMPLETED:
        return 'bg-success';
      case RequestStatus.FAILED:
        return 'bg-danger';
      case RequestStatus.IN_PROGRESS:
        return 'bg-warning';
      case RequestStatus.OPEN:
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }
}
