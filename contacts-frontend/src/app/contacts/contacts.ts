import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../services/contacts.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html'
})
export class ContactsComponent implements OnInit {

  contacts: any[] = [];
  loading = false;
  error = '';

  page = 1;
  limit = 3;
  totalPages = 0;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
  this.loading = true;
  this.error = '';

  this.contactsService.getContacts(this.page, this.limit)
    .pipe(
      finalize(() => {
        // 🔥 ALWAYS stop loading (even on 304 or cache)
        this.loading = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        console.log('Contacts received:', res.contacts);
        this.contacts = res?.contacts || [];
        this.totalPages = res?.totalPages || 0;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Failed to load contacts';
      }
    });
}


  nextPage(): void {
    if (this.page < this.totalPages && !this.loading) {
      this.page++;
      this.fetchContacts();
    }
  }

  prevPage(): void {
    if (this.page > 1 && !this.loading) {
      this.page--;
      this.fetchContacts();
    }
  }
}
