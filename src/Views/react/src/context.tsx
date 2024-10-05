export const MainContext = import(pathname('/jsx/imports')).then(({ React }) => {
  // @ts-ignore
  return React.createContext<{
    authenticated?: boolean;
    authData?: any[];
    [key: string]: any;
  }>({})
});