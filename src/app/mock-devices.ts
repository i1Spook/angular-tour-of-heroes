import { Device } from './device';

export const DEVICES: Device[] = [
  { device_type: "PC", mlfb: "12345", serial_number: "5678", inventory_number: "0987",
   prototype_id: "100", internal_id: 1},
  { device_type: "PLC", mlfb: "23456", serial_number: "5679", inventory_number: "1987",
   prototype_id: "200", internal_id: 2},
  { device_type: "HMI", mlfb: "65432", serial_number: "5670", inventory_number: "2987",
   prototype_id: "300", internal_id: 3},
  { device_type: "PC", mlfb: "74534", serial_number: "5671", inventory_number: "3987",
   prototype_id: "400", internal_id: 4},
  { device_type: "PLC", mlfb: "76532", serial_number: "5672", inventory_number: "4987",
   prototype_id: "500", internal_id: 5}
];