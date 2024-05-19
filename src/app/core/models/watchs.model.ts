export type Watch = {
  id: string;
  brand: string;
  author: string;
  authorId: string;
  model: string;
  cristal: string;
  waterResist: string;
  size: string;
  price: string;
  machine: string;
  image: string;
};
export type WatchCreateDto = {
  id?: string;
  brand: string;
  author: string;
  authorId: string;
  model: string;
  size: string;
  machine: string;
  cristal: string;
  waterResist: string;
  price: string;
  image: string;
};

export type WatchUpdateDto = {
  brand?: string;
  author?: string;
  authorId?: string;
  model?: string;
  cristal?: string;
  waterResist?: string;
  size?: string;
  price?: string;
  machine?: string;
  image?: string;
};
