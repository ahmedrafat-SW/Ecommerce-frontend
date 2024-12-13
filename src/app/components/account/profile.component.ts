import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Dummy Account Data
  account = {firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password:'password123'};
  loading: boolean = false;  // Set to false as no service call is needed
  successMessage: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Simulating loading state for the first time the page loads
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);  // Simulate a delay
  }

  updateAccount(form: NgForm): void {
    if (form.valid) {
      this.successMessage = 'Account updated successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Error updating account!';
      this.successMessage = '';
    }
  }
}
