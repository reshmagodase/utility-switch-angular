import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss']
})
export class Home1Component {
  route:any;
  postcodeform:FormGroup
  constructor(private router:Router,private fb : FormBuilder,private activeRoute: ActivatedRoute, private service: HttpserviceService){
    this.postcodeform = this.fb.group({
        postcode : new FormControl ('',[Validators.required])
    })

  }

  ngOnInit(){


  }

  onSubmit(){
    // alert("hjdsgjs");
    this.router.navigate(['/quote'], { queryParams: { postcode: this.postcodeform.value.postcode} });
  }

}
