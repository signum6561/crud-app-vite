/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const usePage = () => {
  return useContext(PageContext);
};

// eslint-disable-next-line react/prop-types
export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const values = { page, perPage, setPage, setPerPage };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
};
