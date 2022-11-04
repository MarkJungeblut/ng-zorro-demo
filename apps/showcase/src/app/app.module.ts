import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NoopAnimationsModule, BrowserAnimationsModule, RouterOutlet, AppRoutingModule],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
