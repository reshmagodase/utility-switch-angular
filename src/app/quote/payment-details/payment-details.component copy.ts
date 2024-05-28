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
}
