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
  ScoreListModule
} from '../score-list/score-list.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    LeaderboardMobModule,
    LeaderboardListModule,
    ScoreListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule {}
