import { Component } from '@angular/core';
import { CONTACT } from '../../../contact.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contact = CONTACT;


  get mapsLink():string{
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.contact.address)}`;
  }
}
