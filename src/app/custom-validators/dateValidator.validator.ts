import { FormGroup } from '@angular/forms';

export function dateRangeValidator(from: any, to: any) {
  return (formGroup: FormGroup) => {
    const fromdate = formGroup.controls[from];
    const todate = formGroup.controls[to];

    if (todate.errors && !todate.errors['err']) {
      // return if another validator has already found an error on the matchingControl
      return;
  }
    // set error on if todate greater than from date
    if (fromdate.value > todate.value) {
        todate.setErrors({ err: true });
    } else {
      todate.setErrors(null);
    }
}
}
