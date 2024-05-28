import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { QuoteComponent } from './quote.component';
import { QuoteformComponent } from './quoteform/quoteform.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
{
  path:'', 
  component:QuoteformComponent
},
{
  path:'email', 
  component:EmailComponent
},
{
  path:'tariffs', 
  component:TariffsComponent
},
{
  path:'personaldetails',
  component:PersonaldetailsComponent
},
{
  path:'payment-details',
  component:PaymentDetailsComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
