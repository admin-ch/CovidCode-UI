import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ObOffCanvasService} from '@oblique/oblique';

@Component({
	selector: 'ha-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	opened$: Observable<string>;

	constructor(offCanvas: ObOffCanvasService) {
		this.opened$ = offCanvas.opened.pipe(
			startWith(false),
			map(opened => (opened ? 'help.tooltip.in' : 'help.tooltip.out'))
		);
	}
}
