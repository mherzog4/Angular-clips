import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string) : ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get('password');
      const matchingControl = group.get('confirm_Password');

      if (!control || !matchingControl) {
        console.error('Form controls can not be found in the form group')
        return { controlNotFound: false };
      }
      const error =
        control.value === matchingControl.value ? null : { mismatch: true };

        matchingControl.setErrors(error)

      return error;
    };
  }
}

// new RegisterValidators.match <- without static
// RegisterValidators.match() <- with static
