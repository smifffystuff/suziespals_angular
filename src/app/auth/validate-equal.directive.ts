import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector:
    '[appValidateEqual][formControlName],[appValidateEqual][formControl],[appValidateEqual][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateEqualDirective),
      multi: true
    }
  ]
})
export class ValidateEqualDirective implements Validator {
  constructor(
    @Attribute('appValidateEqual') public appValidateEqual: string,
    @Attribute('reverse') public reverse: string
  ) {}

  private get isReverse(): boolean {
    if (!this.reverse) {
      return false;
    }

    return this.reverse === 'true' ? true : false;
  }
  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    const v = c.value;

    // control value (e.g. password)
    const e = c.root.get(this.appValidateEqual);

    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      console.log('fail');
      return {
        validateEqual: false
      };
    }

    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ validateEqual: false });
    }

    return null;
  }
}
