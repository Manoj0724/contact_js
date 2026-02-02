import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html'
})
export class ContactsComponent implements OnInit {

  contacts: any[] = [];
  loading = true;
  error = '';

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe({
      next: (res: any) => {
        this.contacts = res.contacts || [];
        this.loading = false;
      },
      error: (err: any) => {   // ✅ FIXED TS7006
        console.error(err);
        this.error = 'API failed';
        this.loading = false;
      }
    });
  }
}
