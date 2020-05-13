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
  PlayerDetailPage
} from './player-detail';
import {
  PlayerDetailPageRoutingModule
} from './player-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerDetailPageRoutingModule
  ],
  declarations: [PlayerDetailPage],
})
export class PlayerDetailModule {}
