import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ContactsService, ContactsApiResponse } from '../services/contacts.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html'
})
export class ContactsComponent implements OnInit {
sortBy = 'firstName';
sortOrder: 'asc' | 'desc' = 'asc';

  // ===== STATE =====
  contacts: any[] = [];
  loading = false;
  error = '';
  isSearchActive = false;
  private skeletonStartTime = 0;


  page = 1;
  limit = 3;
  totalPages = 1;

  searchText = '';
  pageSizeOptions = [3, 5, 10, 20];

constructor(
  private contactsService: ContactsService,
  private cdr: ChangeDetectorRef
) {}

  // ===== INIT =====
  ngOnInit(): void {
    const savedLimit = localStorage.getItem('contacts_page_size');
    if (savedLimit) {
      this.limit = Number(savedLimit);
    }

    this.fetchContacts();
  }

  // ===== API =====
  fetchContacts(): void {
  this.loading = true;
  this.skeletonStartTime = Date.now();
  this.error = '';

  this.contactsService
    .getContacts(
      this.page,
      this.limit,
      this.searchText,
      this.sortBy,
      this.sortOrder
    )
    .subscribe({
      next: (res) => {
        this.contacts = res.contacts;
        this.totalPages = res.totalPages;

        const elapsed = Date.now() - this.skeletonStartTime;
        const minDelay = 700; // 👈 Google-style timing

        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }, Math.max(0, minDelay - elapsed));
      },
      error: () => {
        this.error = 'Failed to load contacts';
        this.contacts = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
}

  // ===== SEARCH =====
onSearchOrClear(): void {
  // IF search is active → CLEAR
  if (this.isSearchActive) {
    this.searchText = '';
    this.isSearchActive = false;
    this.page = 1;
    this.fetchContacts();
    return;
  }

  // IF search is NOT active → SEARCH
  if (!this.searchText.trim()) {
    return; // nothing to search
  }

  this.isSearchActive = true;
  this.page = 1;
  this.fetchContacts();
}



  // ===== PAGE SIZE =====
  onPageSizeChange(): void {
    localStorage.setItem('contacts_page_size', String(this.limit));
    this.page = 1;
    this.fetchContacts();
  }

  // ===== PAGINATION =====
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchContacts();
    }
  }

  toggleSort(): void {
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  this.page = 1;
  this.fetchContacts();
}


  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchContacts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, this.page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(p: number): void {
    if (p !== this.page) {
      this.page = p;
      this.fetchContacts();
    }
  }
}
