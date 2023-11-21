import React, { ReactElement } from "react";
import { Box, CircularProgress, SxProps } from "@mui/material";
import classes from "./CustomProgress.module.scss"
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress";
import classNames from "classnames";

interface IProps extends CircularProgressProps {
  sx?: SxProps;
}

export default function CustomProgress({ sx, ...progressProps }: IProps): ReactElement {
  return (
    <Box
      className={classNames(
        classes.container,
        progressProps.className,
      )}
      sx={{
        ...(sx || {})
      }}
      data-testid="custom-progress"
    >
      <CircularProgress
        {...progressProps}
      />
    </Box>
  )
}