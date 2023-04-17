import { Genre } from "./genre.enum";
import { RecordLabel } from "./recordLabel.enum";
import { Track } from "./track";
import { Performer } from "./performer";
import { Comment } from "./comment";

export class Album {
    id: number;
    name:string;
    cover:string;
    releaseDate: Date;
    description: string;
    genre: Genre;
    recordLabel: RecordLabel;
    tracks: Track[];
    performers: Performer[];
    comments: Comment[];

  constructor(id: number, name:string, cover:string, releaseDate: Date,
    description: string, genre: Genre, recordLabel: RecordLabel,
    tracks?: Track[], performers?: Performer[], comments?: Comment[]) {

    this.id = id;
    this.name = name;
    this.cover = cover;
    this.releaseDate = releaseDate;
    this.description = description;
    this.genre = genre;
    this.recordLabel = recordLabel;
    this.tracks = tracks;
    this.performers = performers;
    this.comments = comments;
  }
}
