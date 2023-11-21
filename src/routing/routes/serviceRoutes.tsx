import { RouteObject } from "react-router-dom";
import React from "react";
import NotFound from "../../pages/service/NotFound/NotFound";

export const serviceRoutes: RouteObject[] = [
  {
    path: '/*',
    element: (
      <NotFound/>
    )
  },
]