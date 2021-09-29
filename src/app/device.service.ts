import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Device } from './device';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class DeviceService {

  private DevicesUrl = 'api/devices';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Devices from the server */
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.DevicesUrl)
      .pipe(
        tap(_ => this.log('fetched Devices')),
        catchError(this.handleError<Device[]>('getDevices', []))
      );
  }

  /** GET Device by internal_id. Return `undefined` when internal_id not found */
  getDeviceNo404<Data>(internal_id: number): Observable<Device> {
    const url = `${this.DevicesUrl}/?id=${internal_id}`;
    return this.http.get<Device[]>(url)
      .pipe(
        map(Devices => Devices[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Device internal_id=${internal_id}`);
        }),
        catchError(this.handleError<Device>(`getDevice internal_id=${internal_id}`))
      );
  }

  /** GET Device by internal_id. Will 404 if internal_id not found */
  getDevice(internal_id: number): Observable<Device> {
    const url = `${this.DevicesUrl}/${internal_id}`;
    return this.http.get<Device>(url).pipe(
      tap(_ => this.log(`fetched Device internal_id=${internal_id}`)),
      catchError(this.handleError<Device>(`getDevice internal_id=${internal_id}`))
    );
  }

  /* GET Devices whose name contains search term */
  searchDevices(term: string): Observable<Device[]> {
    if (!term.trim()) {
      // if not search term, return empty Device array.
      return of([]);
    }
    return this.http.get<Device[]>(`${this.DevicesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Devices matching "${term}"`) :
         this.log(`no Devices matching "${term}"`)),
      catchError(this.handleError<Device[]>('searchDevices', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Device to the server */
  addDevice(Device: Device): Observable<Device> {
    return this.http.post<Device>(this.DevicesUrl, Device, this.httpOptions).pipe(
      tap((newDevice: Device) => this.log(`added Device w/ internal_id=${newDevice.internal_id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  /** DELETE: delete the Device from the server */
  deleteDevice(internal_id: number): Observable<Device> {
    const url = `${this.DevicesUrl}/${internal_id}`;

    return this.http.delete<Device>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Device internal_id=${internal_id}`)),
      catchError(this.handleError<Device>('deleteDevice'))
    );
  }

  /** PUT: update the Device on the server */
  updateDevice(Device: Device): Observable<any> {
    return this.http.put(this.DevicesUrl, Device, this.httpOptions).pipe(
      tap(_ => this.log(`updated Device internal_id=${Device.internal_id}`)),
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DeviceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DeviceService: ${message}`);
  }
}