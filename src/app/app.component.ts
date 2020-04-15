import {Component} from '@angular/core';
import {ObINavigationLink} from '@oblique/oblique';

@Component({
	selector: 'ha-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	navigation: ObINavigationLink[] = [];
}
