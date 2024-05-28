import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ChatBotComponent } from './chat-bot/chat-bot.component';


@NgModule({
  declarations: [
    ChatBotComponent
  ],
  imports: [
    CommonModule,
    ChatBotRoutingModule
  ]
})
export class ChatBotModule { }
