import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { LeaderboardMobModule } from '../leaderboard-mob/leaderboard-mob.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { ScoreDetailModule } from '../score-detail/score-detail.module';
import { ScoreListModule } from '../score-list/score-list.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    LeaderboardMobModule,
    LeaderboardModule,
    SessionDetailModule,
    ScoreDetailModule,
    ScoreListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
