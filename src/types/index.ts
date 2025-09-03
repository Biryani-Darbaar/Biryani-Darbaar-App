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

export type Dish = {
  dishName: string;
  price: number;
  image: string;
  dishId: string;
  addons: object[];
  description: string;
};
