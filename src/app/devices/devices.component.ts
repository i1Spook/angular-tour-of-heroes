import { Component, OnInit } from '@angular/core';

import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices()
    .subscribe(devices => this.devices = devices);
  }

  add(device_type: string, 
      mlfb: string, 
      serial_number: string, 
      inventory_number: string, 
      prototype_id: string): void {

    device_type = device_type.trim();
    mlfb = mlfb.trim();
    serial_number = serial_number.trim();
    inventory_number = inventory_number.trim();
    prototype_id = prototype_id.trim();

    if (!device_type ||
        !mlfb ||
        !serial_number) { return; }

    this.deviceService.addDevice({ 
      device_type,
      mlfb,
      serial_number,
      inventory_number,
      prototype_id} as Device)
      .subscribe(device => {
        this.devices.push(device);
      });
  }

  delete(device: Device): void {
    this.devices = this.devices.filter(h => h !== device);
    this.deviceService.deleteDevice(device.internal_id).subscribe();
  }
}