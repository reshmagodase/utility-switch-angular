import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hide } from '@popperjs/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginform:any=FormGroup;
  submitted = false;
  showPassword: boolean =false;
  // show = false;
  show: boolean = false;
  password:any;
  errordiv:boolean=false;
  passType: string = 'password';
  public localStorage = localStorage;
  constructor(private router: Router, private fb: FormBuilder, private serviceobj:HttpserviceService) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]),
      password: ["",Validators.required],
    },
    );
  }
  get f() { return this.loginform.controls; }

  addlogindetails() {
    console.log("form value", this.loginform.value);
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    } else {
      // console.log("datatt" ,objdata);
      // console.log("email value",this.loginform.value.emailAddress);
      // localStorage.setItem('email',this.loginform.value.email);
      
     let objdata={
      emailAddress: this.loginform.value.email,
      "islogin": "true",
      }
      this.serviceobj.sendData(objdata);

      let body = {
        emailAddress:this.loginform.value.email,
        password: this.loginform.value.password
      }
      this.serviceobj.postdata(body).subscribe(
        (res:any) => {
          console.log("response11" ,res);
          this.errordiv=false;
          this.submitted = false;
          this.loginform.reset(); 
        },
        error => {
          console.log("error", error);
          this.errordiv=true;
        },
      ); 
    }
  }
  setuppassword(){
    this.router.navigate(['../login/setup-password']);
  }

  changePasswordType(){
    this.show = !this.show;
  }
}
