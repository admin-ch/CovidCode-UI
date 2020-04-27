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

	describe('bagURL$', () => {
		it('should be defined', () => {
			expect(component.bagURL$).toBeDefined();
		});

		it('should emit an url', done => {
			component.bagURL$.subscribe(url => {
				expect(url).toBe(
					`https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html`
				);
				done();
			});
		});

		it('should use emited language', done => {
			const translate = TestBed.inject(TranslateService);
			component.bagURL$.pipe(skip(1)).subscribe(url => {
				expect(url).toBe(
					`https://www.bag.admin.ch/bag/de/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html`
				);
				done();
			});
			translate.onLangChange.emit({
				lang: 'de',
				translations: {}
			});
		});
	});
});
