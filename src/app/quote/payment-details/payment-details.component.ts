import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {
  isMobile:boolean=false;
  paymentDetailsForm : FormGroup;
  dateArray :any=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th',
  '16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st']
  paymentDay: any;
  constructor(private fb: FormBuilder){
      this.paymentDetailsForm = this.fb.group({
        accountHolderName : new FormControl('',[Validators.required]),
        accountNumber : new FormControl('',[Validators.required]),
        sortCode : new FormControl('',[Validators.required]),
        termAndCondition : new FormControl('',[Validators.required]),
        date : new FormControl(''),
        // accountNumber : new FormControl('',[Validators.required]),
      })    
  }

  ngOnInit(){
    console.log("is not mobile",this.isMobile)
    if (window.screen.width < 600) { // 768px portrait
      this.isMobile = true;
      console.log("is mobile",this.isMobile)
    }
  }

  onSubmit(){
    console.log("form value",this.paymentDetailsForm.value)
  }

  onSelectionChange(event:any){
      this.paymentDay = event.target.value;
     console.log("payment day",this.paymentDay);
     this.paymentDetailsForm.value.date = this.paymentDay;
  }

  get f () {
    return this.paymentDetailsForm.controls
  }
}
