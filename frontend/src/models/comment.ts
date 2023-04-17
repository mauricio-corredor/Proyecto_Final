export class Comment {
  id: number;
  description: string;
  rating: number;

  constructor(id:number, description: string, rating: number) {
    this.id = id;
    this.description = description;
    this.rating = rating;
  }
}
