import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPaswordForm:any= FormGroup;
  submitted = false;
  emailPattern :any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(private fb : FormBuilder, private router: Router){
  }
  ngOnInit(){
    this.forgotPaswordForm = this.fb.group({
      email : new FormControl ('',[Validators.required,Validators.pattern(this.emailPattern)]),
  })
  }get f() { return this.forgotPaswordForm.controls}
  

  sendemail(){
    console.log("form value", this.forgotPaswordForm.value);
    this.submitted = true;
    if (this.forgotPaswordForm.invalid) {
      return;
    } else {
      
    }
  }

  signintoaccount(){
    this.router.navigate(['../login/']);
  }
}
