import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.scss']
})
export class SetupPasswordComponent {
  setupPaswordForm:FormGroup;
  submitted=false;
  emailPattern :any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(private fb : FormBuilder){
    this.setupPaswordForm = this.fb.group({
      email : new FormControl ('',[Validators.required,Validators.pattern(this.emailPattern)]),
  })
  }
  ngOnInit(){
   
  }get f() { return this.setupPaswordForm.controls}

  sendemail(){
    // console.log("form value", this.setupPaswordForm.value);
    // this.submitted = true;
    // if (this.forgotPaswordForm.invalid) {
    //   return;
    // } else {
      
    // }
  }
}
