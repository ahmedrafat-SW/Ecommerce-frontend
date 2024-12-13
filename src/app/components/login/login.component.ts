import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: string = '';

  loginUser(form: NgForm) {
    if (form.valid) {
      // Simulate login API call here
      console.log('Login Successful');
    } else {
      this.loginError = 'Please fill out all fields';
    }
  }
}
