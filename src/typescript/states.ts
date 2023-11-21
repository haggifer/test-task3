import { IUser, IUserAlbum, IUserPost } from "./entities";
import { ISerializableError } from "../api/api";

export interface IUserState {
  list: IUser[] | null,
  albums: IUserAlbum[] | null,
  posts: IUserPost[] | null,
  error: ISerializableError | null,
}

/*---------------------------------------*/