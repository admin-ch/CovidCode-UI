import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ObliqueTestingModule} from '@oblique/oblique';
import {CodeComponent} from './code.component';

describe('CodeComponent', () => {
	let component: CodeComponent;
	let fixture: ComponentFixture<CodeComponent>;

	beforeEach(async(() => {
		const mock = {close: jest.fn()};
		TestBed.configureTestingModule({
			imports: [ObliqueTestingModule],
			declarations: [CodeComponent],
			providers: [
				{provide: MAT_DIALOG_DATA, useValue: {}},
				{provide: MatDialogRef, useValue: mock}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('close', () => {
		it('should call close on dialog ref', () => {
			const dialog = TestBed.inject(MatDialogRef);
			component.close();
			expect(dialog.close).toHaveBeenCalled();
		});
	});
});
