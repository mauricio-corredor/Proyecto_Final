import { Comment } from "./comment";
import { Performer } from "./performer";
import { CollectorAlbum } from "./collectorAlbum";

export class Collector {
  id: number;
  name: string;
  telephone: number;
  email: string;
  comments: Comment[];
  favoritePerformers: Performer[];
  collectorAlbums: CollectorAlbum[];


  public constructor(id: number, name: string, telephone: number, email: string,
    comments: Comment[], favoritePerformers: Performer[], collectorAlbums: CollectorAlbum[]) {

    this.id = id;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
    this.comments = comments;
    this.favoritePerformers = favoritePerformers;
    this.collectorAlbums = collectorAlbums;
  }
}
