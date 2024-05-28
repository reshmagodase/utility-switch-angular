import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Home1Component } from './home1/home1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FooterComponent } from '../shared/footer/footer.component';


@NgModule({
    declarations: [
        HomeComponent,
        Home1Component,
        // FooterComponent
    ],
    exports: [],
    providers: [],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
