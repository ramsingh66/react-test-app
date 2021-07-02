import React, { FC } from "react";

export type Theme = "dark" | "light";
export const ThemeContext = React.createContext<Theme>("dark");

type Props = { readonly theme: Theme };
export const ThemeProvider: FC<Props> = (props) => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
