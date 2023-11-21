import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUsersAlbums } from "../../../redux/selectors/users";
import { getUserAlbums } from "../../../redux/features/users/usersThunks";
import classes from './UserAlbums.module.scss'
import globalClasses from 'assets/scss/globalClasses.module.scss'
import classNames from "classnames";
import CustomProgress from "../../../components/common/CustomProgress/CustomProgress";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UserAlbums(): ReactElement {
  const dispatch = useAppDispatch()
  const params = useParams()

  const userAlbums = useAppSelector(selectUsersAlbums)

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const upLg = useMediaQuery(theme.breakpoints.up('lg'))

  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    handleUserIdChange()
  }, [params.userId])

  const handleUserIdChange = async () => {
    if (Number(params.userId)) {
      setApiError(null)

      setLoading(true)

      await dispatch(getUserAlbums(Number(params.userId)))

      setLoading(false)
    } else {
      setApiError('Cannot get albums from user with this ID')
    }
  }

  return (
    <>
      <Helmet>
        <title>User Albums</title>
        <meta
          name="description"
          content="List of albums of the user with provided ID from jsonplaceholder.com REST API"
        />
      </Helmet>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" className={globalClasses.page_title}>User albums</Typography>

        <Link
          to="/users"
        >
          <Button variant="outlined">Back to users</Button>
        </Link>
      </Box>

      {
        apiError ?
          <Typography variant="h6">{apiError}</Typography> :
          loading || !userAlbums ?
            <CustomProgress/> :
            <>
              <Box className={classNames(
                classes.list,
                {
                  [classes.list_xs]: isXs,
                  [classes.list_sm]: isSm,
                  [classes.list_md]: isMd,
                  [classes.list_lg]: upLg,
                }
              )}>
                {
                  !userAlbums.length ?
                    <Typography variant="h6">Nothing found</Typography> :
                    userAlbums.map(album => (
                      <Box
                        className={classes.list_item}
                        key={album.id}
                      >
                        <Typography
                          variant="subtitle1"
                          className={classes.list_item_title}
                        >{album.title}</Typography>
                      </Box>
                    ))
                }
              </Box>
            </>
      }
    </>
  );
}
