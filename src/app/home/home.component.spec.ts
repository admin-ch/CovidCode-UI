import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {EventEmitter, NO_ERRORS_SCHEMA} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ObliqueTestingModule} from '@oblique/oblique';
import {HomeComponent} from './home.component';
import {skip} from 'rxjs/operators';
import {OauthService} from '../auth/oauth.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	describe('normal access', () => {
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
					},
					{provide: OauthService, useValue: {logout: jest.fn(), isAuthenticated$: of(false)}}
				],
				schemas: [NO_ERRORS_SCHEMA],
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

		it('should not logout', () => {
			const oauth = TestBed.inject(OauthService);
			expect(oauth.logout).not.toHaveBeenCalled();
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

			it('should use emitted language', done => {
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

	describe('logout access while authenticated', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [ObliqueTestingModule],
				providers: [
					{
						provide: TranslateService,
						useValue: {
							onLangChange: new EventEmitter<LangChangeEvent>(),
							currentLang: 'en'
						}
					},
					{provide: OauthService, useValue: {logout: jest.fn(), isAuthenticated$: of(true)}},
					{provide: ActivatedRoute, useValue: {data: of({logout: true})}}
				],
				schemas: [NO_ERRORS_SCHEMA],
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

		it('should not logout', () => {
			const oauth = TestBed.inject(OauthService);
			expect(oauth.logout).toHaveBeenCalled();
		});
	});

	describe('logout access while not authenticated', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [ObliqueTestingModule],
				providers: [
					{
						provide: TranslateService,
						useValue: {
							onLangChange: new EventEmitter<LangChangeEvent>(),
							currentLang: 'en'
						}
					},
					{provide: OauthService, useValue: {logout: jest.fn(), isAuthenticated$: of(false)}},
					{provide: ActivatedRoute, useValue: {data: of({logout: true})}}
				],
				schemas: [NO_ERRORS_SCHEMA],
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

		it('should logout', () => {
			const oauth = TestBed.inject(OauthService);
			expect(oauth.logout).not.toHaveBeenCalled();
		});
	});
});
