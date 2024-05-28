import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { TestComponent } from './test/test.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'quote', loadChildren: () => import('./quote/quote.module').then(m => m.QuoteModule) },
  { path: 'chat-bot', loadChildren: () => import('./chat-bot/chat-bot.module').then(m => m.ChatBotModule) },
  { path: '**', redirectTo: 'page-not-found'},
  {path:'test', component:TestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
