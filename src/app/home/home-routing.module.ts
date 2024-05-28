import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Home1Component } from './home1/home1.component';

const routes: Routes = [
  {
    path: '',
    component: Home1Component,
    data: {
      title: 'home1'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
