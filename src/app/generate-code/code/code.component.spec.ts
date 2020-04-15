import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ObliqueTestingModule} from '@oblique/oblique';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CodeComponent} from './code.component';

describe('CodeComponent', () => {
	let component: CodeComponent;
	let fixture: ComponentFixture<CodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ObliqueTestingModule],
			declarations: [CodeComponent],
			providers: [{provide: MAT_DIALOG_DATA, useValue: {}}]
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
});
