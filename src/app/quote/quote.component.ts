import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {

  constructor(private router:Router,private activeRoute: ActivatedRoute, private service: HttpserviceService){
  }

  ngOnInit(){
    
    this.activeRoute.paramMap.subscribe(paramMap => {
      console.log("query param",paramMap)
      // this.postcode = paramMap.get('programId');
    });
  }

}
