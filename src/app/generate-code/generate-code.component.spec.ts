import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ObliqueTestingModule} from '@oblique/oblique';
import {GenerateCodeComponent} from './generate-code.component';
import {GenerateCodeModel} from './generate-code.model';
import {GenerateCodeService} from './generate-code.service';

describe('GenerateCodeComponent', () => {
	let component: GenerateCodeComponent;
	let fixture: ComponentFixture<GenerateCodeComponent>;

	beforeEach(async(() => {
		const mockDialog = {open: jest.fn()};
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, ObliqueTestingModule],
			declarations: [GenerateCodeComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [{provide: MatDialog, useValue: mockDialog}]
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
		const data: GenerateCodeModel = {} as GenerateCodeModel;
		beforeEach(() => {
			service = TestBed.inject(GenerateCodeService);
			dialog = TestBed.inject(MatDialog);
		});

		describe('with invalid data', () => {
			it('should not call the back-end', () => {
				const spy = jest.spyOn(service, 'sendData');
				component.save(false, data);
				expect(spy).not.toHaveBeenCalled();
			});
			it('should not open a dialog', () => {
				const spy = jest.spyOn(dialog, 'open');
				component.save(false, data);
				expect(spy).not.toHaveBeenCalled();
			});
			it('should not reset the form', () => {
				const spy = jest.spyOn(component.form, 'resetForm');
				component.save(false, data);
				expect(spy).not.toHaveBeenCalled();
			});
		});
		describe('with valid data', () => {
			it('should call the back-end', () => {
				const spy = jest.spyOn(service, 'sendData');
				component.save(true, data);
				expect(spy).toHaveBeenCalledWith(data);
			});
			it('should open a dialog', () => {
				const spy = jest.spyOn(dialog, 'open');
				component.save(true, data);
				expect(spy).toHaveBeenCalled();
			});
			it('should reset the form', () => {
				const spy = jest.spyOn(component.form, 'resetForm');
				component.save(true, data);
				expect(spy).toHaveBeenCalled();
			});
		});
	});
});
