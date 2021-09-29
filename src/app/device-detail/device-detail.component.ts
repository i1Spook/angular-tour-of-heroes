import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: [ './device-detail.component.css' ]
})
export class DeviceDetailComponent implements OnInit {
  device: Device | undefined;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDevice();
  }

  getDevice(): void {
    const internal_id = parseInt(this.route.snapshot.paramMap.get('internal_id')!, 10);
    this.deviceService.getDevice(internal_id)
      .subscribe(device => this.device = device);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.device) {
      this.deviceService.updateDevice(this.device)
        .subscribe(() => this.goBack());
    }
  }
}