import { Component, OnInit, NgZone  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { signal } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,

  ],
  templateUrl: './contacts.html'
})
export class ContactsComponent implements OnInit {
private readonly MIN_SKELETON_TIME = 800; // ms
  /* =====================
     TABLE + API STATE
  ====================== */
  contacts = signal<any[]>([]);
loading = signal<boolean>(false);
  error = '';

  page = 1;
  limit = 3;
  totalPages = 1;

  sortBy = 'firstName';
  sortOrder: 'asc' | 'desc' = 'asc';

  pageSizeOptions = [3, 5, 10, 20];

  /* =====================
     SEARCH
  ====================== */
  searchText = '';
  isSearchActive = false;

  /* =====================
   ADVANCED SEARCH VISIBILITY
===================== */
showAdvancedSearch = false;

 // =====================
// ADVANCED SEARCH STATE
// =====================
advancedSearch = {
  firstName: '',
  lastName: '',
  mobile: '',
  city: ''
};

advancedErrors = {
  firstName: false,
  lastName: false,
  mobile: false,
  city: false
};
clearAdvancedSearchFields(): void {
  this.advancedSearch = {
    firstName: '',
    lastName: '',
    mobile: '',
    city: ''
  };

  this.advancedErrors = {
    firstName: false,
    lastName: false,
    mobile: false,
    city: false
  };
}

openAdvancedSearch(): void {
  this.showAdvancedSearch = true;
}

closeAdvancedSearch(): void {
  this.showAdvancedSearch = false;
}

// =====================
// ADVANCED SEARCH VALIDATION
// =====================
validateAdvancedSearch(): boolean {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const mobileRegex = /^[0-9]{10}$/;

  this.advancedErrors.firstName =
    !!this.advancedSearch.firstName &&
    !nameRegex.test(this.advancedSearch.firstName);

  this.advancedErrors.lastName =
    !!this.advancedSearch.lastName &&
    !nameRegex.test(this.advancedSearch.lastName);

  this.advancedErrors.city =
    !!this.advancedSearch.city &&
    !nameRegex.test(this.advancedSearch.city);

  this.advancedErrors.mobile =
    !!this.advancedSearch.mobile &&
    !mobileRegex.test(this.advancedSearch.mobile);

  return !(
    this.advancedErrors.firstName ||
    this.advancedErrors.lastName ||
    this.advancedErrors.mobile ||
    this.advancedErrors.city
  );
}

// =====================
// APPLY ADVANCED SEARCH
// =====================
applyAdvancedSearch(): void {
  if (!this.validateAdvancedSearch()) return;

  // 🔥 Priority-based search (same as classic contacts apps)
  if (this.advancedSearch.mobile) {
    this.searchText = this.advancedSearch.mobile;
  } else if (this.advancedSearch.firstName || this.advancedSearch.lastName) {
    this.searchText =
      `${this.advancedSearch.firstName} ${this.advancedSearch.lastName}`.trim();
  } else if (this.advancedSearch.city) {
    this.searchText = this.advancedSearch.city;
  } else {
    return;
  }

  this.isSearchActive = true;
  this.page = 1;
  this.showAdvancedSearch = false;

  this.fetchContacts();
  this.clearAdvancedSearchFields(); // ✅ see Fix 2
}

  /* =====================
     MODAL (ADD / EDIT)
  ====================== */
  showModal = false;
  isEditMode = false;
  selectedContactId: string | null = null;

  form: any = {
    firstName: '',
    lastName: '',
    mobile1: '',
    city: ''
  };

  formTouched = false;

  constructor(
  private contactsService: ContactsService,
  private snackBar: MatSnackBar,
  private zone: NgZone

) {}

  /* =====================
     INIT
  ====================== */
  ngOnInit(): void {
    const savedLimit = localStorage.getItem('contacts_page_size');
    if (savedLimit) {
      this.limit = Number(savedLimit);
    }

    this.fetchContacts();
  }

  /* =====================
     API
  ====================== */
 fetchContacts(): void {
  const startTime = Date.now();
  this.loading.set(true);
  this.error = '';

  this.contactsService
    .getContacts(this.page, this.limit, this.searchText, this.sortBy, this.sortOrder)
    .subscribe({
      next: (res) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, this.MIN_SKELETON_TIME - elapsed);

        setTimeout(() => {
          this.contacts.set(res.contacts);
          this.totalPages = res.totalPages;
          this.loading.set(false);
        }, remaining);
      },
      error: () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, this.MIN_SKELETON_TIME - elapsed);

        setTimeout(() => {
          this.error = 'Failed to load contacts';
          this.contacts.set([]);
          this.loading.set(false);
        }, remaining);
      }
    });
}


  /* =====================
     SEARCH
  ====================== */
 onSearchOrClear(): void {
  if (this.isSearchActive) {
    this.searchText = '';
    this.isSearchActive = false;
    this.page = 1;
    this.clearAdvancedSearchFields();
    this.fetchContacts();
    return;
  }

  if (!this.searchText.trim()) return;

  this.isSearchActive = true;
  this.page = 1;
  this.fetchContacts();
}



  /* =====================
     CSV EXPORT
  ====================== */
 exportCSV(): void {
  const data = this.contacts(); // ✅ read signal value

  if (!data.length) return;

  const headers = ['First Name', 'Last Name', 'Mobile', 'City'];

  const rows = data.map(c => [
    c.firstName,
    c.lastName,
    c.mobile1,
    c.address?.city || ''
  ]);

  const csv =
    headers.join(',') + '\n' +
    rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.csv';
  a.click();

  URL.revokeObjectURL(url);
}


  /* =====================
     PAGE SIZE + PAGINATION
  ====================== */
  onPageSizeChange(): void {
    localStorage.setItem('contacts_page_size', String(this.limit));
    this.page = 1;
    this.fetchContacts();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchContacts();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchContacts();
    }
  }

  goToPage(p: number): void {
    if (p !== this.page) {
      this.page = p;
      this.fetchContacts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, this.page + 2);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.page = 1;
    this.fetchContacts();
  }

  /* =====================
     ADD / EDIT MODAL
  ====================== */
 openAdd(): void {
  this.isEditMode = false;
  this.form = { firstName: '', lastName: '', mobile1: '', city: '' };
  this.showModal = true;
}


 onEdit(contact: any): void {
  this.isEditMode = true;
  this.selectedContactId = contact._id;
  this.form = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    mobile1: contact.mobile1,
    city: contact.address?.city || ''
  };
  this.showModal = true;
}


  isFormValid(): boolean {
    return (
      this.form.firstName.trim() &&
      this.form.lastName.trim() &&
      this.form.mobile1.trim() &&
      this.form.city.trim()
    );
  }

 onSave(): void {
  this.formTouched = true;
  if (!this.isFormValid()) return;

  const payload = {
    firstName: this.form.firstName,
    lastName: this.form.lastName,
    mobile1: this.form.mobile1,
    address: { city: this.form.city }
  };

  const req = this.isEditMode
    ? this.contactsService.updateContact(this.selectedContactId!, payload)
    : this.contactsService.createContact(payload);

  req.subscribe({
    next: () => {
      this.showModal = false;
      this.formTouched = false;
      this.fetchContacts();

      this.showToast(
        this.isEditMode
          ? 'Contact updated successfully'
          : 'Contact added successfully'
      );
    },
    error: () => {
      this.showToast('Failed to save contact', 'error');
    }
  });
}


  /* =====================
     DELETE
  ====================== */
  onDelete(id: string): void {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    this.contactsService.deleteContact(id).subscribe({
      next: () => {
        this.fetchContacts();
        this.showToast('Contact deleted successfully');
      },
      error: () => {
        this.showToast('Failed to delete contact', 'error');
      }
    });
  }

  /* =====================
     TOAST
  ====================== */
 showToast(message: string, type: 'success' | 'error' = 'success'): void {
  this.zone.run(() => {
    this.snackBar.open(message, '✕', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success'
        ? ['toast-success']
        : ['toast-error']
    });
  });
}


}
