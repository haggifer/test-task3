import { useNavigate } from "react-router-dom";
import React, { ReactElement } from "react";
import classes from './NotFound.module.scss'
import { Box, Button } from "@mui/material";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";

export default function NotFound(): ReactElement {
  const navigate = useNavigate()

  const goPrevPage = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate(defaultPublicPath)
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <h1 className={classes.code}>404</h1>
        <h2 className={classes.message}>Page not found!</h2>

        <Box className={classes.buttons}>
          <Button
            variant="outlined"
            onClick={goPrevPage}
          >Go Back</Button>
          <Button
            variant="outlined"
            onClick={goHome}
          >Go Home</Button>
        </Box>
      </Box>
    </Box>
  )
}