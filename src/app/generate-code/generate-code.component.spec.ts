import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ObliqueTestingModule} from '@oblique/oblique';
import {of} from 'rxjs';
import {GenerateCodeComponent} from './generate-code.component';
import {GenerateCodeService} from './generate-code.service';
import * as moment from 'moment';

describe('GenerateCodeComponent', () => {
	let component: GenerateCodeComponent;
	let fixture: ComponentFixture<GenerateCodeComponent>;

	beforeEach(async(() => {
		const mockDialog = {open: jest.fn()};
		const mock = {sendData: jest.fn()};
		mock.sendData.mockImplementation(() => of({}));
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, ObliqueTestingModule],
			declarations: [GenerateCodeComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: MatDialog, useValue: mockDialog},
				{provide: GenerateCodeService, useValue: mock}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GenerateCodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a FormGroup', () => {
		expect(component.test instanceof FormGroup).toBeTruthy();
	});

	describe('save with valid data', () => {
		let service: GenerateCodeService;
		let dialog: MatDialog;
		let spy;
		const data = {onsetDate: moment()};
		beforeEach(() => {
			service = TestBed.inject(GenerateCodeService);
			dialog = TestBed.inject(MatDialog);
			spy = jest.spyOn(component.form, 'resetForm');
		});

		describe('with invalid data', () => {
			it('should not call the back-end', () => {
				component.save(false, data);
				expect(service.sendData).not.toHaveBeenCalled();
			});
			it('should not open a dialog', () => {
				component.save(false, data);
				expect(dialog.open).not.toHaveBeenCalled();
			});
			it('should not reset the form', () => {
				component.save(false, data);
				expect(spy).not.toHaveBeenCalled();
			});
		});
		describe('with valid data', () => {
			it('should call the back-end', () => {
				component.save(true, data);
				expect(service.sendData).toHaveBeenCalled();
			});
			it('should open a dialog', () => {
				component.save(true, data);
				expect(dialog.open).toHaveBeenCalled();
			});
			it('should reset the form', () => {
				component.save(true, data);
				expect(spy).toHaveBeenCalled();
			});
		});
	});
});
