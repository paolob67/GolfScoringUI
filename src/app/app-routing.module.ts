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
  RouterModule,
  Routes
} from '@angular/router';
import {
  CheckTutorial
} from './providers/check-tutorial.service';
import {
  APP_ROUTES
} from './app.routes';

/**
 * App Routing module 
 * Application cromponent defines routes for 
 * tutorial, acocunt, support, login, signup
 * and app.
 * App routes are handled by the tabs page routing module and 
 * appear in the upper part of the menu
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
