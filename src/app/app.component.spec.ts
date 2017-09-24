import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WeatherService } from './services/weather.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForecastComponent } from './forecast/forecast.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChartsModule } from 'ng2-charts';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        ForecastComponent,
        DialogComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        ReactiveFormsModule
      ],
      providers: [WeatherService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'WeatherApp'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('WeatherApp');
  }));

  it('should render title in a <a> tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('WeatherApp');
  }));
});
