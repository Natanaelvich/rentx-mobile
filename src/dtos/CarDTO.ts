export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;

  period: string;
  price: number;

  fuel_type: string;
  thumbnail: string;
  accessories: {
    type: string;
    name: string;
  }[];
  photos: Photo[];
}

export type Photo = {
  id: string;
  car_id: string;
  photo: string;
};

export type CarByUser = {
  car: CarDTO;
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
};
