import { React } from "/jsx/imports";

export const MainContext = React.createContext<{
  authenticated?: boolean;
  authData?: any[];
  [key: string]: any;
}>({})