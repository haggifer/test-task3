import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserAlbum, IUserPost } from "../../../typescript/entities";
import { apiProvider } from "../../../api/api";
import { IUserListParams } from "../../../typescript/api";

export const defaultListLength = 12;

export const getUserList = createAsyncThunk<IUser[], IUserListParams>(
  'users/getList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiProvider.request<IUser[]>({
        method: 'get',
        url: `/users`,
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      })

      return response.data
    } catch
      (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUserAlbums = createAsyncThunk<IUserAlbum[], number>(
  'users/getAlbums',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiProvider.request<IUserAlbum[]>({
        method: 'get',
        url: `/users/${userId}/albums`,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch
      (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUserPosts = createAsyncThunk<IUserPost[], number>(
  'users/getPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiProvider.request<IUserPost[]>({
        method: 'get',
        url: `/users/${userId}/posts`,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch
      (err) {
      return rejectWithValue(err)
    }
  }
)