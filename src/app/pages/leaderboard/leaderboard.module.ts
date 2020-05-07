import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LeaderboardPage } from './leaderboard';
import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardPageRoutingModule
  ],
  declarations: [LeaderboardPage],
})
export class LeaderboardModule {}
