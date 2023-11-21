import { RootState } from "../store";

export const selectUsers = (state: RootState) => state.users;
export const selectUsersList = (state: RootState) => state.users.list;
export const selectUsersAlbums = (state: RootState) => state.users.albums;
export const selectUsersPosts = (state: RootState) => state.users.posts;
export const selectUsersError = (state: RootState) => state.users.error;