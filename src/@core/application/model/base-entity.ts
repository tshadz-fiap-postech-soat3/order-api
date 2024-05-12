export class BaseEntity {
  constructor(id: string) {
    this.id = id;
    this.createdAtDate = new Date();
    this.updatedAtDate = new Date();
  }

  id: string;

  createdAtDate: Date;
  updatedAtDate: Date;
}
