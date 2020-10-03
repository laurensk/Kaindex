import { Teacher } from "./Teacher.model";

export class Car {
  uuid: string;
  numberPlate: string;
  brand: string;
  model: string;
  teacher: Teacher;

  constructor(uuid: string, numberPlate: string, brand: string, model: string, teacher: Teacher) {
    this.uuid = uuid;
    this.numberPlate = numberPlate;
    this.brand = brand;
    this.model = model;
    this.teacher = teacher;
  }
}
