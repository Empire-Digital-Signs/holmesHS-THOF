export type MenuItem = {
  title: string;
  link: string;
};

export type HistoryItem = {
  year: number;
  title: string;
  description: string;
}

export type Inductee = {
  firstName: string;
  lastName: string;
  year: number;
  bio: string;
  photoUrl: string;
}

export type Page = {
  name: string;
  destination: string;
}