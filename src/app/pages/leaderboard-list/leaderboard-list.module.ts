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
  IonicModule
} from '@ionic/angular';
import {
  LeaderboardListPage
} from './leaderboard-list';
import {
  LeaderboardListPageRoutingModule
} from './leaderboard-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LeaderboardListPageRoutingModule
  ],
  declarations: [LeaderboardListPage],
})
export class LeaderboardListModule {}
