import { Performer } from '../models/performer';
import { PerformerPrize } from '../models/performerPrize';
import { Album } from './album';
import { Prize } from './prize';


export class PerformerDetail extends Performer {
  constructor(public id: number, public name: string, public image: string, public description: string, public birthDate: Date, public creationDate: Date, public performerPrizes: PerformerPrize) {
    super(id, name, creationDate, birthDate);
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.birthDate = birthDate;
    this.creationDate = creationDate;
    this.performerPrizes = performerPrizes;
  }
 albums: Album[];
 prizes: Prize[];
}

