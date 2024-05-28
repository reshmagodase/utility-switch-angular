import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  emailquoteform:any=FormGroup;
  submitted=false;

  constructor(private router: Router, private fb:FormBuilder){}
 
  ngOnInit(): void {
    this.emailquoteform=this.fb.group({
      email: ['', [Validators.required ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],    
    },
    );
  }
  get f() { return this.emailquoteform.controls; }

  addemailaddress(){
    this.submitted = true;
    if (this.emailquoteform.invalid) 
    {
      return;
    }else{
      
    } 
    this.router.navigate(['/email']);
  }
  }

