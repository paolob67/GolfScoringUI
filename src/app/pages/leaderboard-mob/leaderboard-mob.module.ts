import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LeaderboardMobPage } from './leaderboard-mob';
import { LeaderboardMobPageRoutingModule } from './leaderboard-mob-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardMobPageRoutingModule
  ],
  declarations: [LeaderboardMobPage],
})
export class LeaderboardMobModule {}
