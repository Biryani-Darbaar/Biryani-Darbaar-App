export interface HoriScrollProps {
  items: {
    image: string;
    name: string;
    price?: string;
    oldPrice?: string;
    discount?: string;
    rating?: number;
    ratingCount?: string;
    distance?: string;
    description?: string;
    dishId?: string;
    addOns?: Addon[];
  }[];
}
export interface AddToCartParams {
  name: string;
  addons: Addon[];
  price: number;
  dishId: number;
  image: string;
  description: string;
}

export interface Addon {
  addonName: string;
  price: number;
}

export interface Dish {
  dishName: string;
  name: string; //TODO: Remove this field later
  dishId: string;
  addons: Addon[];
  price: number;
  image: string;
  description?: string;
  discount: number;
}

export interface Location {
  image: string;
  name: string;
  address: string;
}
