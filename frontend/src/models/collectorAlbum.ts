import { Album } from "./album";

export class CollectorAlbum {
  id: number;
  price: number;
  status: string;
  album: Album;

  public constructor(id: number, price: number, status: string, album: Album) {

    this.id = id;
    this.price = price;
    this.status = status;
    this.album = album;
  }
}
