import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

interface HttpOptions {
	headers?:
		| HttpHeaders
		| {
				[header: string]: string | string[];
		  };
	observe?: 'body';
	params?:
		| HttpParams
		| {
				[param: string]: string | string[];
		  };
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(@Inject('HOST') private host: string, private http: HttpClient) {}

	get<T>(url: string, options?: HttpOptions): Observable<T> {
		return this.http.get<T>(`${this.host}/api/${url}`, options);
	}

	post<T>(url: string, data: any, options?: HttpOptions): Observable<T> {
		return this.http.post<T>(`${this.host}/api/${url}`, data, options);
	}

	delete<T>(url: string, options?: HttpOptions): Observable<T> {
		return this.http.delete<T>(`${this.host}/api/${url}`, options);
	}

	head<T>(url: string, options?: HttpOptions): Observable<T> {
		return this.http.head<T>(`${this.host}/api/${url}`, options);
	}

	options<T>(url: string, options?: HttpOptions): Observable<T> {
		return this.http.options<T>(`${this.host}/api/${url}`, options);
	}

	put<T>(url: string, data: any, options?: HttpOptions): Observable<T> {
		return this.http.put<T>(`${this.host}/api/${url}`, data, options);
	}

	patch<T>(url: string, data: any, options?: HttpOptions): Observable<T> {
		return this.http.patch<T>(`${this.host}/api/${url}`, data, options);
	}

	jsonp<T>(url: string, callbackParam: string): Observable<T> {
		return this.http.jsonp<T>(`${this.host}/api/${url}`, callbackParam);
	}

	request<T>(method: string, url: string, options?: HttpOptions): Observable<T> {
		return this.http.request<T>(method, `${this.host}/api/${url}`, options);
	}
}
