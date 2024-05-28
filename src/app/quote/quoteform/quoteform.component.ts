import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-quoteform',
  templateUrl: './quoteform.component.html',
  styleUrls: ['./quoteform.component.scss']
})
export class QuoteformComponent {
  quoteform:FormGroup;
  submitted = false;
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
  quoteFormData: any;
  annualkwhfromelectricity: any;
  annualkwhfromgas: any;
  getDecryptedFormData: any;
  decryptedFormData: any;
  meterType: any;
  isHalfhourly:boolean = false;
  getFullAddress: any;
  isAddressFetch:boolean=false;
  pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"
  supplierData: any;

  constructor(private router: Router, private fb:FormBuilder,private activeRoute: ActivatedRoute, private service: HttpserviceService){
    this.activeRoute.queryParams.subscribe(res => {
      this.postcode = res.postcode;
    });

    this.quoteform=this.fb.group({
      postCode: new FormControl('',[Validators.required,Validators.pattern(this.pattern)]), 
      supplyAddress: new FormControl('',[Validators.required]), 
      typeOfEnergy: new FormControl(''), 
      typeOfMeter: new FormControl(''), 
      energyConsumption : new FormControl(''), 
      annualkwhfromelectricity: new FormControl(''),
      annualkwhfromgas: new FormControl(''),
      MPRNNo : new FormControl(''), 
      MPANBottomLineNo: new FormControl(''),
      MPANTopLineNo: new FormControl(''),
      contractEndDate: new FormControl('',[Validators.required]),
      meterType : new FormControl(''),
      PaymentMethod : new FormControl('DD'),
      getFullAddress : new FormControl(''),
      supplierName : new FormControl(''),

    },
    );

     this.quoteform.patchValue({"postCode" : this.postcode})
  }
  ngOnInit(): void {

         this.getSupplyAddress();
         this.getSupplier();

         this.getDecryptedFormData = this.service.decryptData(sessionStorage.getItem('quoteFormData'));
         this.decryptedFormData = JSON.parse( this.getDecryptedFormData)
         console.log("decrypted data",this.decryptedFormData);

         if(this.decryptedFormData){
          //  this.quoteform.patchValue({'supplyAddress' : this.decryptedFormData.getFullAddress})
          this.quoteform.get('supplyAddress')?.setValue(this.decryptedFormData.getFullAddress);
          this.switchType = this.decryptedFormData.typeOfEnergy;
          this.selectedmetertype = this.decryptedFormData.typeOfMeter;
          this.energyconsume = this.decryptedFormData.energyConsumption;
          this.MPANBottomLineNo = this.decryptedFormData.MPANBottomLineNo;
          this.MPANTopLineNo = this.decryptedFormData.energyConsumption;
          this.quoteform.patchValue({'contractEndDate' : this.decryptedFormData.contractEndDate})
          this.quoteform.patchValue({'supplierName' : this.decryptedFormData.supplierName})
              if(this.energyconsume == 'energyactual'){
                  this.quoteform.patchValue({'annualkwhfromelectricity' : this.decryptedFormData.annualkwhfromelectricity})
                  this.quoteform.patchValue({'annualkwhfromgas' : this.decryptedFormData.annualkwhfromgas})
                }
            else{
                  this.annualkwhfromelectricity = this.decryptedFormData.annualkwhfromelectricity
                  this.annualkwhfromgas = this.decryptedFormData.annualkwhfromgas
                }
         }
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

      this.service.getPostcodeData(postcode).subscribe(
        (data:any) => {
          var addressList = data.GetAddressesResult.Addresses;
          if (addressList.length > 0) {
            this.isAddressFetch = true;
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
  let value = event.target.value;
  this.getFullAddress = event.target.value;
  this.addressValue = value.split("AAA");
  var code = value.split("AAA");
  if (this.switchType == "electricity") {
     this.MPANBottomLineNo = code[1];
     this.MPANTopLineNo = code[2];
    var profileClass = code[2].substring(0, 2);
    if (profileClass == "02" || profileClass == "04") {
      this.meterType = "day-night";
    }
    else {
      this.meterType = "day";
    }

    if (profileClass == "00" || profileClass == "05" || profileClass == "06" || profileClass == "07" || profileClass == "08") {
      this.isHalfhourly = true;
    }

  }
  else {
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

      if(!this.addressValue){
      this.getFullAddress = this.quoteform.value.supplyAddress;  
      this.addressValue = this.decryptedFormData.getFullAddress.split("AAA");
      var code = this.addressValue
      if (this.switchType == "electricity") {
         this.MPANBottomLineNo = code[1];
         this.MPANTopLineNo = code[2];
        var profileClass = code[2]?.substring(0, 2);
        if (profileClass == "02" || profileClass == "04") {
          this.meterType = "day-night";
        }
        else {
          this.meterType = "day";
        }
    
        if (profileClass == "00" || profileClass == "05" || profileClass == "06" || profileClass == "07" || profileClass == "08") {
          this.isHalfhourly = true;
        }
    
      }
      else {
        this.MPRNNo = code[1];
      }
      this.MPANDiv = false; 
    }

      if(this.energyconsume != 'energyactual'){
         this.annualkwhfromelectricity = '1800';
        this.annualkwhfromgas =  this.energyconsume == 'energylow' ? '9000' : '8000'
        this.quoteform.value.annualkwhfromelectricity = this.annualkwhfromelectricity
        this.quoteform.value.annualkwhfromgas = this.annualkwhfromgas
     }

     this.quoteform.value.supplyAddress = this.addressValue[0];
     this.quoteform.value.typeOfEnergy =  this.switchType;
     this.quoteform.value.typeOfMeter = this.selectedmetertype;
     this.quoteform.value.energyConsumption =  this.energyconsume;
     this.quoteform.value.MPRNNo =  this.MPRNNo;
     this.quoteform.value.MPANBottomLineNo = this.MPANBottomLineNo;
     this.quoteform.value.MPANTopLineNo =  this.MPANTopLineNo;
     this.quoteform.value.meterType =  this.meterType;
     this.quoteform.value.getFullAddress =  this.getFullAddress;
    //  this.service.quoteFormData(this.quoteform.value)
    
    if(this.isAddressFetch){
      let encryptedQuoteFormData = this.service.encryptData(JSON.stringify(this.quoteform.value));
      console.log("encrypt data",encryptedQuoteFormData)
 
      sessionStorage.setItem("quoteFormData",encryptedQuoteFormData)
      console.log("get item",sessionStorage.getItem('quoteFormData'))
     
      console.log("Form value",this.quoteform.value)
    }

   }
  
   } 

   getSupplier(){

    this.service.getSuppliers().subscribe(
      (data: any) => {
         console.log("supplier data",data);
         localStorage.setItem('suppliers', JSON.stringify(data));
         this.supplierData = data;
      },

    )
   }

}
