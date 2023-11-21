import React, { useMemo } from "react";
import Select, { CSSObjectWithLabel, Props as SelectProps } from "react-select";
import { ISelectOption } from "../../../typescript/common";
import { StylesProps } from "react-select/dist/declarations/src/styles";
import { CSSObject, useTheme } from "@mui/material";

export const defaultNumberSelectOption: ISelectOption<number> = {
  label: 'Select...',
  value: 0,
}

export const defaultStringSelectOption: ISelectOption<string> = {
  label: 'Select...',
  value: '',
}

interface IProps<Option, IsMulti extends boolean> extends Partial<Omit<SelectProps<Option, IsMulti>, 'value' | 'onChange' | 'options' | 'styles'>> {
  value: SelectProps<Option, IsMulti>['value'],
  onChange: SelectProps<Option, IsMulti>['onChange'],
  options: SelectProps<Option, IsMulti>['options'],
  styles?: Partial<Record<keyof StylesProps<Option, IsMulti, never>, CSSObject>>,
}

const stylesComponents: (keyof StylesProps<ISelectOption<unknown>, boolean, never>)[] = [
  'clearIndicator',
  'control',
  'dropdownIndicator',
  'group',
  'groupHeading',
  'indicatorsContainer',
  'indicatorSeparator',
  'input',
  'loadingIndicator',
  'menu',
  'menuList',
  'menuPortal',
  'loadingMessage',
  'noOptionsMessage',
  'multiValue',
  'multiValueLabel',
  'multiValueRemove',
  'option',
  'placeholder',
  'singleValue',
  'valueContainer',
]

export const CommonSelect = <Option, IsMulti extends boolean>(props: IProps<ISelectOption<Option>, IsMulti>) => {
  const theme = useTheme()

  const defaultStyles: IProps<Option, IsMulti>['styles'] = useMemo(() => {
    return {
      menu: {
        marginTop: 0,
      }
    }
  }, [theme])

  return (
    <Select<Readonly<ISelectOption<Option>>, IsMulti>
      {...props}
      classNamePrefix={props.classNamePrefix || "react-select"}
      styles={
        Object.fromEntries(
          stylesComponents.map(item => [
            item,
            (baseStyles: CSSObjectWithLabel) => ({
              ...baseStyles,
              ...((defaultStyles[item]) || {}),
              ...((props.styles && props.styles[item]) || {}),
            })
          ])
        )
      }
    />
  )
}