import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.initTranslate();
  }

  private initTranslate(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
