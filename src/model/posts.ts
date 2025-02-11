interface BasePost {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'Недвижимость' | 'Авто' | 'Услуги';
  image?: string;
}

interface RealEstatePost extends BasePost {
  type: 'Недвижимость';
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

interface AutoPost extends BasePost {
  type: 'Авто';
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

interface ServicePost extends BasePost {
  type: 'Услуги';
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type Post = ServicePost | AutoPost | RealEstatePost;
