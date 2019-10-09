import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
      fb: FormBuilder
  ) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
    }
  title = 'movies';
  options: FormGroup;
  panelOpenState = false;
  changePanelOpenState() {
    this.panelOpenState = !this.panelOpenState;
  }

}
