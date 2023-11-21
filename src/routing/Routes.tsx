import React, { ReactElement } from 'react';
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./routes/publicRoutes";
import { serviceRoutes } from "./routes/serviceRoutes";

export default function Routes(): ReactElement {
  const routes = useRoutes([
    ...publicRoutes,
    ...serviceRoutes,
  ])

  return (
    routes || <></>
  )
}