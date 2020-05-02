import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventPage } from './event';
import { EventFilterPage } from '../event-filter/event-filter';
import { EventPageRoutingModule } from './event-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [
    EventPage,
    EventFilterPage
  ],
  entryComponents: [
    EventFilterPage
  ]
})
export class EventModule { }
