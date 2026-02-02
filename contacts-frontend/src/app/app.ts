import { Component, signal } from '@angular/core';
import { ContactsComponent } from './contacts/contacts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  readonly title = signal('contacts-frontend');
}
