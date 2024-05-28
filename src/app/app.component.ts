import { Component } from '@angular/core';
import { HttpserviceService } from './services/httpservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sss:any;
  email:any;
  password:any;
  title = 'void-replica-frontend';
  constructor(private serviceobj:HttpserviceService){}
  
  ngOnInit(){
    // this.email = sessionStorage.getItem('email');
    // this.password = sessionStorage.getItem('password');
    // console.log("emaillll" ,this.email);
    // this.serviceobj.sendData(this.email,this.password);
  }
}
