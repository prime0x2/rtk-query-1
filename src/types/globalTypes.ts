export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
  comments: string[];
  quantity?: number;
}
