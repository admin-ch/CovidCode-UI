import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ObliqueTestingModule} from '@oblique/oblique';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {HelpComponent} from './help.component';

describe('HelpComponent', () => {
	let component: HelpComponent;
	let fixture: ComponentFixture<HelpComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ObliqueTestingModule],
			providers: [
				{
					provide: TranslateService,
					useValue: {
						onLangChange: of({}),
						getTranslation: () =>
							of({a: 0, b: 0, help: 0, 'generate-code.help.info.1': 0, 'generate-code.help.info.2': 0})
					}
				}
			],
			declarations: [HelpComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HelpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('bullets$', () => {
		it('should be defined', () => {
			expect(component.bullets$).toBeTruthy();
		});

		it('should', done => {
			component.bullets$.subscribe(data => {
				expect(data).toEqual(['generate-code.help.info.1', 'generate-code.help.info.2']);
				done();
			});
		});
	});
});
