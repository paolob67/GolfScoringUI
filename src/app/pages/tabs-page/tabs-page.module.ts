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
  TabsPage
} from './tabs-page';
import {
  TabsPageRoutingModule
} from './tabs-page-routing.module';

import {
  AboutModule
} from '../about/about.module';
import {
  MapModule
} from '../map/map.module';
import {
  LeaderboardMobModule
} from '../leaderboard-mob/leaderboard-mob.module';
import {
  LeaderboardListModule
} from '../leaderboard-list/leaderboard-list.module';
import {
  PlayerDetailModule
} from '../player-detail/player-detail.module';
import {
  ScoreListModule
} from '../score-list/score-list.module';
import {
  ScoreSignModule
} from '../score-sign/score-sign.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    LeaderboardMobModule,
    LeaderboardListModule,
    ScoreListModule,
    ScoreSignModule,
    PlayerDetailModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule {}
