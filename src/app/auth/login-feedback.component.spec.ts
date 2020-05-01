import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginFeedbackComponent} from './login-feedback.component';

describe('LoginFeedbackComponent', () => {
	let component: LoginFeedbackComponent;
	let fixture: ComponentFixture<LoginFeedbackComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginFeedbackComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginFeedbackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
