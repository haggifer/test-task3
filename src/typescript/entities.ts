type UserGeoLocation = {
  lat: string;
  lng: string;
}

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeoLocation;
}

type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface IUserAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IUserPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}