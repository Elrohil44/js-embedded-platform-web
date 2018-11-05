import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { CollapsableComponent } from './collapsable/collapsable.component';

@NgModule({
  declarations: [
    AppComponent,
    CollapsableComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
