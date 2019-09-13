import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, vi_VN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {HeaderComponent} from './layouts/header/header.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './modules/auth/login/login.component';
import {VoyagesModule} from './modules/voyages/voyages.module';

registerLocaleData(vi);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        VoyagesModule,
        AppRoutingModule
    ],
    providers: [{provide: NZ_I18N, useValue: vi_VN}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
