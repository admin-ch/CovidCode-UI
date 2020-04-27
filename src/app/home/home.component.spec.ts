import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {EventEmitter} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ObliqueTestingModule} from '@oblique/oblique';
import {HomeComponent} from './home.component';
import {skip} from 'rxjs/operators';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, ObliqueTestingModule],
			providers: [
				{
					provide: TranslateService,
					useValue: {
						onLangChange: new EventEmitter<LangChangeEvent>(),
						currentLang: 'en'
					}
				}
			],
			declarations: [HomeComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('lang$', () => {
		it('should be defined', () => {
			expect(component.lang$).toBeDefined();
		});

		it('should emit an url', done => {
			component.lang$.subscribe(url => {
				expect(url).toBe('en');
				done();
			});
		});

		it('should use emited language', done => {
			const translate = TestBed.inject(TranslateService);
			component.lang$.pipe(skip(1)).subscribe(url => {
				expect(url).toBe('de');
				done();
			});
			translate.onLangChange.emit({
				lang: 'de',
				translations: {}
			});
		});
	});
});
