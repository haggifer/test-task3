import { RouteObject } from "react-router-dom";
import React from "react";
import UserList from "../../pages/public/Users/UserList";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import UserAlbums from "../../pages/public/Users/UserAlbums";
import UserPosts from "../../pages/public/Users/UserPosts";

export const defaultPublicPath = '/users';

export const publicRoutes: RouteObject[] = [
  {
    element: (
      <PageLayout/>
    ),
    path: '/',
    children: [
      {
        path: '/users',
        element: (
          <UserList/>
        ),
      },
      {
        path: '/users/:userId/albums',
        element: (
          <UserAlbums/>
        ),
      },
      {
        path: '/users/:userId/posts',
        element: (
          <UserPosts/>
        ),
      },
    ],
  },
]