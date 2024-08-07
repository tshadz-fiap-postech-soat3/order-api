import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  constructor() {
    this.id = uuidv4();
    this.createdAtDate = new Date();
    this.updatedAtDate = new Date();
  }

  id: string;

  createdAtDate: Date;
  updatedAtDate: Date;

  setId(id: string){
    this.id = id;
    return this;
  }
  updateDate(){
    this.updatedAtDate = new Date();
  }
}
