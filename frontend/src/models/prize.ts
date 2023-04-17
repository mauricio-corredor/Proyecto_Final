import { PerformerPrize } from "./performerPrize";
import { Performer } from './performer';


export class Prize {
  constructor(public id: number, public organization: string, public name: string, public description: string) {

    this.id = id;
    this.organization = organization;
    this.name = name;
    this.description = description;
  }

}
