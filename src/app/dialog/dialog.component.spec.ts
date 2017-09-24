import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DialogComponent } from './dialog.component';
import { LocationForecast } from '../LocationForecast';
import { WeatherService } from '../services/weather.service';


describe('DialogComponent (inline template)', () => {

    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogComponent],
            imports: [
                HttpModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [WeatherService]
        }).compileComponents();

        // create component and test fixture
        fixture = TestBed.createComponent(DialogComponent);

        // get test component from the fixture
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('weather form is invalid when input fields are empty', () => {
        expect(component.weatherForm.valid).toBe(false);
    });

    it('latitude = -20 and longitude = 12 are valid coordinates', () => {
        expect(component.weatherForm.valid).toBe(false);
        component.weatherForm.controls['latitude'].setValue(-20);
        component.weatherForm.controls['longitude'].setValue(12);
        expect(component.weatherForm.valid).toBe(true);
    });

    it('latitude = -91 is not valid coordinate', () => {
        expect(component.weatherForm.valid).toBe(false);
        component.weatherForm.controls['latitude'].setValue(-91);
        component.weatherForm.controls['longitude'].setValue(12);
        expect(component.weatherForm.valid).toBe(false);
    });

    it('longitude = -181 is not valid coordinate', () => {
        expect(component.weatherForm.valid).toBe(false);
        component.weatherForm.controls['latitude'].setValue(11);
        component.weatherForm.controls['longitude'].setValue(-181);
        expect(component.weatherForm.valid).toBe(false);
    });

});
