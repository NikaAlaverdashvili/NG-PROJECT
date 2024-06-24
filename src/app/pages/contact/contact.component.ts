import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      console.log('Form Submitted!', contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
