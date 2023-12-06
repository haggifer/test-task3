import React, { ReactElement, useEffect } from 'react';
import { Outlet } from "react-router";
import classes from "./PageLayout.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";

export default function PageLayout(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(defaultPublicPath)
    }
  }, [location.pathname]);

  return (
    <div className={classes.container}>
      <Outlet/>
    </div>
  );
}
