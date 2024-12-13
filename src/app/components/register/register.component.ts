import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerError: string = '';

  registerUser(form: NgForm) {
    if (form.valid) {
      // Simulate registration API call here
      console.log('Registration Successful');
    } else {
      this.registerError = 'Please fill out all fields';
    }
  }
}
