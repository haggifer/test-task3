import { IUserState } from "../../../typescript/states";
import { createSlice } from "@reduxjs/toolkit";
import { getUserAlbums, getUserList, getUserPosts } from "./usersThunks";
import { ISerializableError } from "../../../api/api";

const initialState: IUserState = {
  list: null,
  albums: null,
  posts: null,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.error = null
      })
      .addCase(getUserList.fulfilled, (state, { payload }) => {
        state.list = payload
      })
      .addCase(getUserList.rejected, (state, { payload }) => {
        state.error = payload as ISerializableError
      })

      .addCase(getUserAlbums.pending, (state) => {
        state.error = null
      })
      .addCase(getUserAlbums.fulfilled, (state, { payload }) => {
        state.albums = payload
      })
      .addCase(getUserAlbums.rejected, (state, { payload }) => {
        state.error = payload as ISerializableError
      })

      .addCase(getUserPosts.pending, (state) => {
        state.error = null
      })
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        state.posts = payload
      })
      .addCase(getUserPosts.rejected, (state, { payload }) => {
        state.error = payload as ISerializableError
      })
  }
})

export const {} = usersSlice.actions