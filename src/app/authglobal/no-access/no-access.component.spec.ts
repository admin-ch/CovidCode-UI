import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoAccessComponent} from './no-access.component';
import {TranslateModule} from '@ngx-translate/core';
import {MockTranslatePipe} from '../../../../test_helpers/mock-translate.pipe';

describe('NoAccessComponent', () => {
	let component: NoAccessComponent;
	let fixture: ComponentFixture<NoAccessComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NoAccessComponent, MockTranslatePipe],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NoAccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
