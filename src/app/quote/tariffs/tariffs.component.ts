import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent {
  visible = false;

  Rates: any = [
    {
      AnnualPrice: "£6,304.25",
      AnnualPriceInclusive: "£7,751.10",
      BaseAnnualPrice: "£6,304.25",
      CapacityCharge: "0",
      ChequeSurcharge: null,
      Commission: "£80.00",
      ContractEndDate: "2024-05-23",
      DayUnitrate: "30.70",
      DirectDebitDiscount: "0",
      ExcessCapacityCharge: "0",
      ExtraInfo: "103STD.1TST.T2 Credit Application form is required to be completed for all Non-Ltd Entities",
      Fits: null,
      FixedFee: null,
      FixedFeeSCUplift: null,
      FixedFeeUplift: null,
      FlatDirectDebitDiscount: 0,
      FooterMessage: null,
      HalfHourlyNumberOfRates: null,
      Id: null,
      IncludeMOPCharges:null,
      IsRenewable:null,
      NightUnitrate:"0.00000",
      NoQuoteReason:null,
      OutsidePricingWindow:false,
      PaymentMethod:{ Amount: "Unspecified", DisplayName: "Direct Debit", Frequency: "Unspecified", Type: "Direct Debit" },
      Period: null,
      PlanType:null,
      Pricebook : null,
      PricebookVersion:null,
      QuoteRateReference:"70c4db46-8ab1-4fc7-b025-056d79c093d6",
      RawAnnualPrice:6304.25,
      RawAnnualPriceInclusive:7751.1,
      RawBaseAnnualPrice:6304.25,
      RawCommission : 80,
      ReactiveRate:"0",
      Ref:"103STD.1TST.T2",
      Renewal:false,
      SC:null,
      StandingCharge:"45.00",
      StandingChargeType:null,
      StandingChargeUplift:"0",
      Stod1 : null,
      Stod2 : null,
      Stod3:null,
      Stod4:null,
      Stod5:null,
      Stod6:null,
      Supplier:"Opus",
      SupplierData:null,
      TariffCode:"103STD.1TST.T2",
      Term:"1",
      TransportationCharge:null,
      Uplift:"0.4",
      WendUnitrate:"0.00000",
    }
  ]

  energyarray:any=[
    {
      title:"utilityaid",
      price:456
    },{
      title:"abc",
      price:123
    },{
      title:"utility",
      price:"1rty4erg"
    },{
      title:"abcd",
      price:"wdfghgfdsadf"
    },{
      title:"njds",
      price:"gvuiopjbhji"
    },{
      title:"asdvb",
      price:"hgcguioghioghjhiuo"
    },{
      title:"asdvb",
      price:"hgcguioghioghjhiuo"
    },
    // {
    //   title:"asdvb",
    //   price:"hgcguioghioghjhiuo"
    // },
    // {
    //   title:"asdvb",
    //   price:"hgcguioghioghjhiuo"
    // },
  ]
  quoteFormData: any;
  prices: any;
  supplierList:any;

  step1obj : any ={}
  step2obj :any ={}
  step3obj:any={}
  constructor(private router:Router,private service : HttpserviceService) { 

  }

  ngOnInit(){

    this.supplierList = JSON.parse(localStorage.getItem("suppliers") || '{}');
    console.log("supplierList",this.supplierList);
    let getQuoteFormData = this.service.decryptData(sessionStorage.getItem('quoteFormData'));
    this.quoteFormData = JSON.parse(getQuoteFormData)
    console.log("Quote form data",this.quoteFormData)
    this.getPriceList();
  }

  getPriceList() {

    //  let getQuoteFormData = this.service.decryptData(sessionStorage.getItem('quoteFormData'));
    //  this.quoteFormData = JSON.parse(getQuoteFormData)
     console.log("Quote form data",this.quoteFormData)
    var request = {};
    console.log("Quote form data",this.quoteFormData.contractEndDate)
    let day:any = new Date(this.quoteFormData.contractEndDate).getDate();
    console.log(day)
    if (day < 10) {
       day = `0${day}`;
    }
    let month:any = new Date(this.quoteFormData.contractEndDate).getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let contractEndDate:any =  new Date(this.quoteFormData.contractEndDate).getFullYear() + "-" + month + "-" + day;
    if (this.quoteFormData.typeOfEnergy == 'electricity') {
      if (this.quoteFormData.meterType == "day-night") {
        var dayConsumption = (70 * (this.quoteFormData.annualkwhfromelectricity)) / 100;
        var nightConsumption = (30 * (this.quoteFormData.annualkwhfromelectricity)) / 100;
        console.log(dayConsumption, nightConsumption, "day-night")
        request = {
          ElectricSupply: {
            DayConsumption: { Amount: dayConsumption, Type: "Day" },
            NightConsumption: { Amount: nightConsumption, Type: "Night" },
            MPANTop: this.quoteFormData.MPANTopLineNo,
            MPANBottom: this.quoteFormData.MPANBottomLineNo,
            ContractEndDate: contractEndDate
          },
          PaymentMethod: this.quoteFormData.PaymentMethod
          
        }
      }
      else {
        request = {
          ElectricSupply: {
            DayConsumption: { Amount: this.quoteFormData.annualkwhfromelectricity, Type: "Day" },
            MPANTop: this.quoteFormData.MPANTopLineNo,
            MPANBottom: this.quoteFormData.MPANBottomLineNo,
            ContractEndDate: contractEndDate
          },
          PaymentMethod: this.quoteFormData.PaymentMethod
        }
      }

      this.service.getElectricPricesList(request).subscribe(
        (data: any) => {
          if (data.GetElectricRatesResult.Rates?.length > 1) {
            this.prices = data.GetElectricRatesResult?.Rates;
            console.log("Prices",this.prices)
            // this.switchService.step3Obj.prices = this.prices;
          }
          // else {
          //   Swal("No rates found for this meter. Please check that you have entered the correct details.");
          //   this.spinner.hide()
          // }
        },
        // err => this.spinner.hide(),
        // () => this.spinner.hide()
      );
    }
    else {
      request = {
        GasSupply: {
          Consumption: { Amount: this.quoteFormData.annualkwhfromgas, Type: "Day" },
          MPR: this.quoteFormData.MPRNNo,
          ContractEndDate: contractEndDate
        },
        PaymentMethod: this.quoteFormData.PaymentMethod,
        PostCode: this.quoteFormData.postCode
      }
      this.service.getGasPricesList(request).subscribe(
        (data: any) => {
          if (data.GetGasRatesResult.Rates.length > 1) {
            this.prices = data.GetGasRatesResult?.Rates;
            // this.switchService.step3Obj.prices = this.prices;
          }
          // else {
          //   Swal("No rates found for this meter. Please check that you have entered the correct details.");
          //   this.spinner.hide()
          // }
        },
        // err => this.spinner.hide(),
        // () => this.spinner.hide()
      );
    }


  }


  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  signmeup(price:any,supplierDetails:any){
    // this.router.navigate(['../quote/personaldetails']);

    console.log("price", price);
    console.log("supplierDetails", supplierDetails);
    // this.switchService.step3Obj.supplier = supplier;
    // this.switchService.step3Obj.newSupplierId = this.switchService.salesforceEnvironment == "test" ? supplierDetails.salesforceSupplierId : supplierDetails.salesforceLiveSupplierId;
    // this.switchService.step3Obj.supplierLogo = supplierDetails.supplierLogo;
    // this.switchService.step3Obj.contractEndDateFromUD = supplier.ContractEndDate;
    // var request = {
    //   step1Obj: this.switchService.step1Obj,
    //   step2Obj: this.switchService.step2Obj,
    //   step3Obj: this.switchService.step3Obj,
    //   switchType: this.switchType,
    // }
    // console.log("request", request);
    // if (this.switchType == "electricity") {
    //   if (this.switchService.step1Obj.meterType == "day-night") {
    //     this.switchService.step3Obj.dayConsumption = (70 * (this.switchService.step2Obj.consumption)) / 100;
    //     this.switchService.step3Obj.nightConsumption = (30 * (this.switchService.step2Obj.consumption)) / 100;
    //   }
    //   else {
    //     this.switchService.step3Obj.dayConsumption = this.switchService.step2Obj.consumption;
    //     this.switchService.step3Obj.nightConsumption = 0;
    //   }
    // }
    // else {
    //   this.switchService.step3Obj.dayConsumption = this.switchService.step2Obj.consumption;
    //   this.switchService.step3Obj.nightConsumption = 0;
    // }

    // if (localStorage.getItem("userId") !== null) {
    //   request["userId"] = localStorage.getItem("userId")
    // }
    // this.switchService.saveSteps(request).subscribe(
    //   (data: any) => {
    //     localStorage.removeItem("stepsId");
    //     localStorage.setItem('stepsId', data._id);
    //     this.spinner.hide();
    //     this.router.navigate([this.switchType + '/personal-details']);
    //   },
      // err => {
      //   this.spinner.hide()
      // },
      // () => this.spinner.hide()
    // )

  }
  backmethod(){
    this.router.navigate(['../quote']);
  }

 
}
