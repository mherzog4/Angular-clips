import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export default class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {}

  validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
    this.auth
      .fetchSignInMethodsForEmail(control.value)
      .then((response: string | any[]) =>
        response.length ? { emailTaken: true } : null
      );
  };
}
