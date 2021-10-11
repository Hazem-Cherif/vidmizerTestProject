import { Component , OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vidmizeTestFrontend';

  langue='';

  supportLanguages = ['en', 'fr'];
   
  constructor(private translateService: TranslateService){
    this.translateService.addLangs(this.supportLanguages);


    if(localStorage.getItem('lang') === 'en'){
      this.translateService.setDefaultLang('en')
      this.translateService.use('en')
      this.langue = 'en'
    }
    else if(localStorage.getItem('lang') === 'fr'){
      this.translateService.setDefaultLang('fr')
      this.translateService.use('fr')
      this.langue='fr'
    }
    else if(localStorage.getItem('lang') === null){
      this.translateService.setDefaultLang('en')
      this.langue = 'en'
    }

  }

  

  useLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('lang', lang);

  }
}
