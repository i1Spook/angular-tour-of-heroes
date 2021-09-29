import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Device } from './device';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const devices = [
      { device_type: "PC", mlfb: "12345", serial_number: "5678", inventory_number: "5987",
        prototype_id: "100", internal_id: 11},
      { device_type: "PLC", mlfb: "23456", serial_number: "5679", inventory_number: "1987",
        prototype_id: "200", internal_id: 12},
      { device_type: "HMI", mlfb: "65432", serial_number: "5670", inventory_number: "2987",
        prototype_id: "300", internal_id: 13},
      { device_type: "PC", mlfb: "74534", serial_number: "5671", inventory_number: "3987",
        prototype_id: "400", internal_id: 14},
      { device_type: "PLC", mlfb: "76532", serial_number: "5672", inventory_number: "4987",
        prototype_id: "500", internal_id: 15}
    ];
    return {devices};
  }

  // Overrides the genId method to ensure that a device always has an id.
  // If the devices array is empty,
  // the method below returns the initial number (11).
  // if the devices array is not empty, the method below returns the highest
  // device internal_id + 1.
  genId(Devices: Device[]): number {
    return Devices.length > 0 ? Math.max(...Devices.map(Device => Device.internal_id)) + 1 : 11;
  }
}