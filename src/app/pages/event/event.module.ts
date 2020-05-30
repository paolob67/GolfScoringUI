/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  IonicModule
} from '@ionic/angular';
import {
  EventPage
} from './event';
import {
  EventPageRoutingModule
} from './event-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [
    EventPage,
  ]
})
export class EventModule {}
