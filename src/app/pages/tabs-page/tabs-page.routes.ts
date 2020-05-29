/**
 * Tabs Routes
 * JSON object defining routes for tabs page
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  Routes
} from '@angular/router';
import {
  TabsPage
} from './tabs-page';

export const TABS_ROUTES: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'leaderboard-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../leaderboard-list/leaderboard-list.module').then(m => m.LeaderboardListModule)
          },
          {
            path: 'leaderboard-mob/:eventId/:showRound',
            loadChildren: () => import('../leaderboard-mob/leaderboard-mob.module').then(m => m.LeaderboardMobModule)
          },
          {
            path: 'leaderboard-mob/player-detail/:eventId/:playerId',
            loadChildren: () => import('../player-detail/player-detail.module').then(m => m.PlayerDetailModule)
          }
        ]
      },
      {
        path: 'scores',
        children: [
          {
            path: '',
            loadChildren: () => import('../score-list/score-list.module').then(m => m.ScoreListModule)
          },
          {
            path: 'event/:eventId/:roundNum',
            loadChildren: () => import('../event/event.module').then(m => m.EventModule)
          },
          {
            // path: 'sign/:which/:what/:scoreId',
            path: 'sign/:which',
            loadChildren: () => import('../score-sign/score-sign.module').then(m => m.ScoreSignModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: '/app/tabs/leaderboard-list',
        pathMatch: 'full'
      }
    ]
  }
];
