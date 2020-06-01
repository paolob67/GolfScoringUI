/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  Component
} from '@angular/core';
import {
  PopoverController
} from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close('https://www.pb67fx.com/golf_scoring')">
        <ion-label>Visit our Web Site</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.pb67fx.com/golf_scoring/manual')">
        <ion-label>Documentation</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.pb67fx.com/contact_us')">
        <ion-label>Get in touch</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.pb67fx.com/suggest')">
        <ion-label>Feature request</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.pb67fx.com/privacy')">
        <ion-label>Privacy</ion-label>
      </ion-item>
    </ion-list>`
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  /**
   * Open a browser to the passed url and close the popover about menu
   * @param url the url passed from the html choice menu
   */
  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
