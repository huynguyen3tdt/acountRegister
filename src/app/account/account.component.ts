import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";

export function checkEmail(c: AbstractControl) {
  const valueEmail = c.value.inputEmail;
  if (!valueEmail) {
    return {
      emailNoLength: true,
      messageEmail: 'Nhập email'
    }
  }
  return null
}

export function matchPassword(c: AbstractControl) {
  const v = c.value;
  return (v.inputPassword === v.inputConfirm) ? null : {
    passwordnotmatch: true,
    invalid: true,
    message: 'Các mật khẩu đã nhập không khớp. Hãy thử lại.'
  }
}

export function checkPassword(c: AbstractControl) {
  const valuePassword = c.value.inputPassword;
  console.log(valuePassword.length)
  if (!valuePassword) {
    return {
      passNoLength: true,
      invalid: true,
      message: 'Nhập mật khẩu'
    }
  }
  if (valuePassword.length < 8) {
    return {
      passLengthError: true,
      invalid: true,
      message: 'Mật khẩu phải nhiều hơn 8 ký tự'
    }
  }
  const hasUpperCase = /[A-Z]+/.test(valuePassword);

  const hasLowerCase = /[a-z]+/.test(valuePassword);

  const hasNumeric = /[0-9]+/.test(valuePassword);

  const hasSpecialCharacter = /[!@#$%^&*()_+`,./;'{}]+/.test(valuePassword);

  const passwordValid = (hasUpperCase && hasLowerCase) ||
    (hasUpperCase && hasNumeric) ||
    (hasUpperCase && hasSpecialCharacter) ||
    (hasLowerCase && hasNumeric) ||
    (hasNumeric && hasSpecialCharacter)||
    (hasLowerCase && hasSpecialCharacter)

  return !passwordValid ? {
    passwordStrength: true,
    invalid: true,
    message: 'Mật khẩu phải chứa ít nhất hai trong số các ký tự sau: chữ hoa, chữ thường, số hoặc ký hiệu.'
  } : null;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  rfRegister: FormGroup = new FormGroup({});
  isSubmit = false;
  isConfirm = true;

  ngOnInit() {
    this.rfRegister = new FormGroup({ //inputSurName thuộc vào rfRegister
        inputSurname: new FormControl('', {validators: [Validators.required],updateOn:"change"}),
        inputName: new FormControl('', Validators.required),
        inputEmail: new FormControl('', {
          validators: [Validators.required, Validators.email],
          updateOn: "blur"
        }),
        inputPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        inputConfirm: new FormControl('')
      },
      {
        validators: [matchPassword, checkEmail, checkPassword]
      })

    console.log(this.rfRegister)
    console.log(this.rfRegister.statusChanges)
    console.log(this.rfRegister.value)

    this.rfRegister.get('inputSurname')?.valueChanges.subscribe(a => {
      console.log(a);
    })
  }

  onSubmit(rf: object) {
    this.isSubmit = true;
    this.rfRegister.markAllAsTouched();
    console.log(rf)
  }

  showPass() {
    this.contextPassword.type = this.contextPassword.type === 'text' ? 'password' : 'text';
  }

  contextSurname = {
    controlName: "inputSurname",
    displayName: "Họ",
    placeholder: "họ"
  };
  contextName = {
    controlName: "inputName",
    displayName: "Tên",
    placeholder: "tên"

  }
  contextEmail = {
    controlName: "inputEmail",
    displayName: "Email",
  }
  contextPassword = {
    controlName: "inputPassword",
    displayName: "Mật Khẩu",
    type: "password"
  }
  contextConfirm = {
    controlName: "inputConfirm",
    displayName: "Xác Nhận",
    type: "password"

  }
}

// form control có các tham số (value, validate, validator)
