import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
loginstatus: any;
emailid:any;

constructor(private router:Router, private serviceobj:HttpserviceService){}

ngOnInit(){
  this.emailid = localStorage.getItem('email');
  this.serviceobj.loggedInType$.subscribe(res => {
    this.loginstatus = res?.islogin;
    this.emailid=res?.emailAddress;
    console.log("loginstatus" , this.loginstatus);
    console.log("emailid" ,this.emailid)
  })
  // this.serviceobj.emailid$.subscribe(res => {
  //   this.emailid=res.email;
  //   console.log("loginnn" ,this.emailid)
  // })
}
ngOnChanges(){
}
  signin(){
    // alert("reshmmm");
    this.router.navigate(['/login']);
  }
}
