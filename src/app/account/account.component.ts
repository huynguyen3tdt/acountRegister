import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  rfRegister: FormGroup= new FormGroup({});

  ngOnInit() {
    this.rfRegister = new FormGroup({ //inputSurName thuộc vào rfRegister
      inputSurname: new FormControl('', [Validators.required]),
      inputName: new FormControl('',Validators.required),
      inputEmail: new FormControl('',Validators.required)
    })

    console.log(this.rfRegister)
  }
  onSubmit(rf: object){
    console.log(rf)
  }

}
// form control có các tham số (value, validate, validator)
