import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.scss']
})
export class PersonaldetailsComponent {
  personaldetailsform: any = FormGroup;
  submitted = false;
  questmarkdiv: boolean = false;
  addressdetailsdiv:boolean=false;
  supportcustomerdiv:boolean=false;
  addressmismatchstatus:boolean=false;
  selectvalue:any;
  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.personaldetailsform = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      mobilenumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
    },
    );
  }
  get f() { return this.personaldetailsform.controls; }
  addpersonaldetails() {
    // alert("jfhj")
    this.submitted = true;
    if (this.personaldetailsform.invalid) {
      return;
    } else {
      console.log("personal details: ", this.personaldetailsform.firstname);
      this.router.navigate(['quote/paymentdetails']);
    }
  }
  displaydiv() {
    this.questmarkdiv = !this.questmarkdiv;
  }
  addressdetails() {
    this.addressdetailsdiv = !this.addressdetailsdiv;
  }
  displaycustomersupportdiv() {
    this.supportcustomerdiv = !this.supportcustomerdiv;
  }
  onchange($event:any){
    console.log($event.target.value)
    this.selectvalue=$event.target.value;
    if(this.selectvalue==1){
      this.addressmismatchstatus=true;
    }
    else{
      this.addressmismatchstatus=false;
    }
  }
}
