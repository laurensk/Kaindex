import { Department } from "./Department.model";
import { Teacher } from "./Teacher.model";

export class Classroom {
  uuid: string;
  startYear: number;
  fullName: string;
  mail: string;
  teacher: Teacher;
  department: Department;

  constructor(
    uuid: string,
    startYear: number,
    fullName: string,
    mail: string,
    teacher: Teacher,
    department: Department
  ) {
    this.uuid = uuid;
    this.startYear = startYear;
    this.fullName = fullName;
    this.mail = mail;
    this.teacher = teacher;
    this.department = department;
  }
}
