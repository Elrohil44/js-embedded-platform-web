import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DeviceLocationsListComponent } from './device-locations-list/device-locations-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { ObjectContainerComponent } from './object-container/object-container.component';
import { InstanceContainerComponent } from './instance-container/instance-container.component';
import { ConnectDeviceModalComponent } from './connect-device-modal/connect-device-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DeviceLocationsListComponent,
    DashboardComponent,
    DeviceDetailsComponent,
    DeviceListComponent,
    ObjectContainerComponent,
    InstanceContainerComponent,
    ConnectDeviceModalComponent
  ],
  entryComponents: [
    ConnectDeviceModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SuiModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
