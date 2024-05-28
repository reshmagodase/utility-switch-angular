import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from './quote.component';
import { QuoteformComponent } from './quoteform/quoteform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './email/email.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';


@NgModule({
  declarations: [
    QuoteComponent,
    QuoteformComponent,
    EmailComponent,
    TariffsComponent,
    PersonaldetailsComponent,
    PaymentDetailsComponent,
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class QuoteModule { }
