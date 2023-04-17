
export class Performer {

  constructor( public id: number, public name: string, public creationDate: Date, public birthDate: Date) {

    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.birthDate = birthDate;
  }
}
