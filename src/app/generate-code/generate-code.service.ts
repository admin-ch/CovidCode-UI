import {Injectable} from '@angular/core';
import {GenerateCodeDTO, GenerateCodeModel} from './generate-code.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class GenerateCodeService {
	sendData(data: GenerateCodeModel): Observable<number> {
		return GenerateCodeService.mockHttp().pipe(map(result => result.authorizationCode));
	}

	private static mockHttp(): Observable<GenerateCodeDTO> {
		return of({authorizationCode: 123456});
	}
}
