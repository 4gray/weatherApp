import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherService } from './services/weather.service';

@NgModule({
    declarations: [
        AppComponent,
        ForecastComponent,
        DialogComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        ReactiveFormsModule
    ],
    providers: [WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule { }
