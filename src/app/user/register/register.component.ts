import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterValidators } from './validators/registervalidators';
import {EmailTaken} from './validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
  ) {}

  name = new FormControl('', [Validators.required, Validators.minLength(4)]);


  email = new FormControl('', [Validators.required, Validators.email],[this.emailTaken.validate]);


  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  showAlert = false;
  alertMsg = 'Your account is being created.';
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Your account is being created.';
    this.alertColor = 'blue';
  }
}
