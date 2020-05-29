import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  TABS_ROUTES
} from './tabs-page.routes'

@NgModule({
  imports: [RouterModule.forChild(TABS_ROUTES)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
