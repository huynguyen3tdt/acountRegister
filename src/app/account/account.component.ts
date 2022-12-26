import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  rfRegister: FormGroup = new FormGroup({});
  isSubmit = false;

  ngOnInit() {
    this.rfRegister = new FormGroup({ //inputSurName thuộc vào rfRegister
      inputSurname: new FormControl('', [Validators.required]),
      inputName: new FormControl('', Validators.required),
      inputEmail: new FormControl('', Validators.required),
      inputPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
      inputConfirm: new FormControl('',Validators.required)
    })

    console.log(this.rfRegister)
    console.log(this.rfRegister.statusChanges)
    console.log(this.rfRegister.value)

    this.rfRegister.get('inputSurname')?.valueChanges.subscribe(a=>{
      console.log(a);
    })
  }

  onSubmit(rf: object) {
    this.isSubmit = true;
    console.log(rf)
    console.log(this.isSubmit);

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
    displayName: "Mật Khẩu"
  }
  contextConfirm = {
    controlName: "inputConfirm",
    displayName: "Xác Nhận"
  }
}

// form control có các tham số (value, validate, validator)
