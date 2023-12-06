import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUsersList } from "../../../redux/selectors/users";
import { getUserList } from "../../../redux/features/users/usersThunks";
import classes from './UserList.module.scss'
import globalClasses from 'assets/scss/globalClasses.module.scss'
import classNames from "classnames";
import CustomProgress from "../../../components/common/CustomProgress/CustomProgress";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getURLParamsObject } from "../../../utils/helpers/common";
import { CommonSelect, defaultStringSelectOption } from "../../../components/common/CommonSelect/CommonSelect";
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDebounce } from "usehooks-ts";
import { IUserListParams } from "../../../typescript/api";
import { ISelectOption } from "../../../typescript/common";
import { Helmet } from "react-helmet";

interface IFiltersValues {
  search: IUserListParams['username'],
  order: ISelectOption<string>,
}

export default function UserList(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const userList = useAppSelector(selectUsersList)

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const upLg = useMediaQuery(theme.breakpoints.up('lg'))

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [initFiltersValues] = useState<IFiltersValues>({
    search: undefined,
    order: defaultStringSelectOption,
  })

  const orderOptions = [
    defaultStringSelectOption,
    {
      label: 'Asc',
      value: 'asc',
    },
    {
      label: 'Desc',
      value: 'desc',
    },
  ]

  const handleURLParamsChange = async () => {
    const URLParamsObject = getURLParamsObject(location.search)

    setFieldValue('search', URLParamsObject.username)

    if (URLParamsObject._order) {
      if (!URLParamsObject._sort) {
        navigate({ pathname: location.pathname, search: `${location.search}?_sort=username` });
      } else {
        setFieldValue(
          'order',
          URLParamsObject._order === 'asc' || URLParamsObject._order === 'desc' ?
            orderOptions.find(option => option.value === URLParamsObject._order) as ISelectOption<string> :
            defaultStringSelectOption
        )
      }
    }

    setIsLoading(true)

    await dispatch(getUserList(URLParamsObject))

    setIsLoading(false)
  }

  useEffect(() => {
    handleURLParamsChange()
  }, [location.search])

  const [validationSchema] = useState(yup.object({}))

  const {
    values,
    handleChange,
    setFieldValue,
  } =
    useFormik({
      validationSchema: validationSchema,
      onSubmit: () => {
      },
      initialValues: initFiltersValues,
      enableReinitialize: true,
    });

  const debouncedSearchValue = useDebounce<string | undefined>(values.search, 400)

  useEffect(() => {
    const newParams: Record<string, string> = {}

    if (debouncedSearchValue) {
      newParams.username = debouncedSearchValue
    }

    if (values.order.value) {
      newParams._sort = 'username'
      newParams._order = values.order.value
    }

    const newSearchParams = new URLSearchParams(newParams);

    navigate({ pathname: location.pathname, search: newSearchParams.toString() });
  }, [debouncedSearchValue, values.order])

  return (
    <>
      <Helmet>
        <title>Users</title>
        <meta
          name="description"
          content="List of users from jsonplaceholder.com REST API with possibility to filter them by username"
        />
      </Helmet>

      <Typography variant="h2" component="h1" className={globalClasses.page_title}>Users</Typography>

      <Box className={classes.filters}>
        <TextField
          className={classes.search}
          type="text"
          name="search"
          value={values.search || ''}
          onChange={handleChange}
          autoFocus
          placeholder="Full username"
          label="Search by username"
        />
        <CommonSelect<string, false>
          name="order"
          value={values.order}
          onChange={newValue => setFieldValue('order', newValue)}
          options={orderOptions}
          styles={{
            control: {
              minHeight: '56px',
            },
            singleValue: {
              textTransform: 'capitalize',
            },
            option: {
              textTransform: 'capitalize',
            },
          }}
        />

        {
          userList && isLoading &&
          <CustomProgress
            className={classes.progress}
            size={30}
          />
        }
      </Box>

      {
        !userList ?
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
                !userList.length ?
                  <Typography variant="h6">Nothing found</Typography> :
                  userList.map(user => (
                    <Box
                      className={classes.list_item}
                      key={user.id}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          className={classes.list_item_name}
                        >Name: {user.name}</Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes.list_item_name}
                        >Username: {user.username}</Typography>
                      </Box>

                      <Box className={classes.list_item_buttons}>
                        <Link
                          to={`/users/${user.id}/albums`}
                        >
                          <Button
                            variant="outlined"
                          >Go to Albums</Button>
                        </Link>
                        <Link
                          to={`/users/${user.id}/posts`}
                        >
                          <Button
                            variant="outlined"
                          >Go to Posts</Button>
                        </Link>
                      </Box>
                    </Box>
                  ))
              }
            </Box>
          </>
      }
    </>
  );
}
