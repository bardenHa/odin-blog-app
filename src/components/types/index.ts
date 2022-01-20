export interface user {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  token: string;
}

export interface profile {
  username: string;
  image: string;
  bio?: string;
  following: boolean;
}

export interface article {
  comments: string[];
  _id: string;
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
  tagList: string[];
  author: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
