export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: string;
  creator: any;
  activities: any[];
  location: any;
  tags: string[];
}

export interface CreateEventInterface {
  title: string;
  description: string;
  date: string;
  image?: File;
  location?: any;
}
