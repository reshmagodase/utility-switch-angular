import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  password:any;
  quoteform:any=FormGroup;
  submitted = false;
  show = false;
  selectedEnergy:any = "gasandelectricity";
  selectedmetertype= "standaredmetertype";
  energyconsume="energymedium";
  showsmartbtndiv=false;
  postcode: string= '';
  addressdata: any
  addresses: any=[];
  switchType: string = 'electricity';
  MPANDiv: boolean = true; //hidden
  @ViewChild('existsPopup', { static: false }) private existsPopup: any;
  MPANBottomLineNo: any;
  MPANTopLineNo: any;
  MPRNNo: any;
  addressValue: any;
  // annualkwhfromelectricity: string='';
  // annualkwhfromgas: string='';

  constructor(private router: Router, private fb:FormBuilder,private activeRoute: ActivatedRoute, private service: HttpserviceService){
    this.activeRoute.queryParams.subscribe(res => {
      this.postcode = res.postcode;
    });

    this.quoteform=this.fb.group({
      postCode: new FormControl('',[Validators.required]), 
      supplyAddress: new FormControl(''), 
      typeOfEnergy: new FormControl(''), 
      typeOfMeter: new FormControl(''), 
      energyConsumption : new FormControl(''), 
      annualkwhfromelectricity: new FormControl(''),
      annualkwhfromgas: new FormControl(''),
      MPRNNo : new FormControl(''), 
      MPANBottomLineNo: new FormControl(''),
      MPANTopLineNo: new FormControl(''),
    },
    );

     this.quoteform.patchValue({"postCode" : this.postcode})
  }
  ngOnInit(): void {
      this.getSupplyAddress();
  }
  get f() { return this.quoteform.controls; }

  energyTypeChanged(type:any) {
    this.switchType = type;
    console.log("Energy type",this.switchType);
    this.MPRNNo ='';
    this.MPANBottomLineNo='';
    this.MPANTopLineNo='';
    this.getSupplyAddress();
    this.showsmartbtndiv=false;

  }
  meterTypeChanged(metertype:any){
    this.selectedmetertype=metertype;
    this.showsmartbtndiv=false;
    console.log("Meter type",this.selectedmetertype)
  }
  smartmeterTypeChanged(metertype:any){
    this.selectedmetertype=metertype;
    this.showsmartbtndiv = !this.showsmartbtndiv;  
  }  
  energyConsumeTypeChanged(energyconsumeType:any){
    this.energyconsume=energyconsumeType;

    if(this.energyconsume == 'energyactual'){

      this.quoteform.controls["annualkwhfromelectricity"].addValidators([Validators.required])
      this.quoteform.controls["annualkwhfromgas"].addValidators([Validators.required])
    }else{

      this.quoteform.get('annualkwhfromelectricity')?.clearValidators();
      this.quoteform.get('annualkwhfromgas')?.clearValidators();
      this.quoteform.get('annualkwhfromelectricity')?.setErrors(null)
      this.quoteform.get('annualkwhfromgas')?.setErrors(null)
    }
  } 

  getSupplyAddress(){
    let postcode = {
      "postCode" : this.postcode
    }
    // this.service.getPostcodeData(postcode).subscribe((Response:any)=>{

    //     this.addressdata = Response.GetAddressesResult.Addresses
    //     console.log("Response data",this.addressdata);
    // })
    // if (this.quoteform.controls['postCode'].valid) {
      // this.showHideSupplyAddress = true;
      // var request = {
      //   postCode: this.quoteform.controls['postCode'].value
      // }
      this.service.getPostcodeData(postcode).subscribe(
        (data:any) => {
          var addressList = data.GetAddressesResult.Addresses;
          if (addressList.length > 0) {
            var jsonAddress : any = {};
            var addressArr :any = [];

            var switchType = this.switchType;
            for (var i = 0; i < addressList.length; i++) {
              jsonAddress = {};
              var address = addressList[i].map(function (obj:any) {
                jsonAddress[obj.Key] = obj.Value
                if (obj.Key == "MPANCore") {
                  jsonAddress["supplyType"] = "electricity";
                }
                else if (obj.Key == "MPRN") {
                  jsonAddress["supplyType"] = "gas";
                }
                return jsonAddress;
              })
              if (address[0].supplyType == "electricity" && switchType == "electricity") {
                addressArr.push(address[0]);
              }
              else if (address[0].supplyType == "gas" && switchType == "gas") {
                addressArr.push(address[0]);
              }
            }
            this.addresses = addressArr;
            // this.service.step1Obj.addresses = addressArr;
            // this.showHideSupplyAddress = false;

            // this.showHidePostCode = true;
          }
          else {
            // this.showHidePostCode = false;
            // this.spinner.hide();
          }

        },
        // err => this.spinner.hide(),
        // () => this.spinner.hide()
      );
    // }
  }

  onChange(event:any){
  let value = event.target.value
  this.addressValue = value.split("AAA");
  var code = value.split("AAA");
  if (this.switchType == "electricity") {
    // this.switchService.step1Obj.MPANBottomLineNo = code[1];
    // this.switchService.step1Obj.MPANTopLineNo = code[2];
     this.MPANBottomLineNo = code[1];
     this.MPANTopLineNo = code[1];
    var profileClass = code[2].substring(0, 2);
    // if (profileClass == "02" || profileClass == "04") {
    //   this.switchService.step1Obj.meterType = "day-night";
    // }
    // else {
    //   this.switchService.step1Obj.meterType = "day";
    // }

    // if (profileClass == "00" || profileClass == "05" || profileClass == "06" || profileClass == "07" || profileClass == "08") {
    //   this.isHalfhourly = true;
    // }

  }
  else {
    // this.switchService.step1Obj.MPRNNo = code[1];
    this.MPRNNo = code[1];
  }
  this.MPANDiv = false; //unhide
  }

  addquotedetails(){

    this.submitted = true;
    console.log(this.quoteform.invalid)
    if (this.quoteform.invalid) 
    {
      return;
    }else{
      this.router.navigate(['../quote/email']);
    } 

    if(this.energyconsume != 'energyactual'){
       let annualkwhfromelectricity = '1800 kwh';
       let annualkwhfromgas =  this.energyconsume == 'energylow' ? '9000 kwh' : '8000 kwh'
       this.quoteform.value.annualkwhfromelectricity = annualkwhfromelectricity
       this.quoteform.value.annualkwhfromgas = annualkwhfromgas
    }

    this.quoteform.value.supplyAddress = this.addressValue[0];
    this.quoteform.value.typeOfEnergy =  this.switchType;
    this.quoteform.value.typeOfMeter = this.selectedmetertype;
    this.quoteform.value.energyConsumption =  this.energyconsume;
    this.quoteform.value.MPRNNo =  this.MPRNNo;
    this.quoteform.value.MPANBottomLineNo = this.MPANBottomLineNo;
    this.quoteform.value.MPANTopLineNo =  this.MPANTopLineNo;
    console.log("Form value",this.quoteform.value)
  }
 
}
