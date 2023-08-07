"use client";
import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

type DataType = {
  firstName: string;
};

interface ContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  picURL: string;
  setPicURL: Dispatch<SetStateAction<string>>;
  pageSectionNameForHeader: string;
  setPageSectionNameForHeader: Dispatch<SetStateAction<string>>;
  pageNameForHeader: string;
  setPageNameForHeader: Dispatch<SetStateAction<string>>;
  pageURLForHeader: string;
  setPageURLForHeader: Dispatch<SetStateAction<string>>;
  iconForHeader: string;
  setIconForHeader: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  username: '',
  setUsername: (): string => '',
  email: '',
  setEmail: (): string => '',
  picURL: '',
  setPicURL: (): string => '',
  pageSectionNameForHeader: '',
  setPageSectionNameForHeader: (): string => '',
  pageNameForHeader: '',
  setPageNameForHeader: (): string => '',
  pageURLForHeader: '',
  setPageURLForHeader: (): string => '',
  iconForHeader: '',
  setIconForHeader: (): string => '',

});

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [picURL, setPicURL] = useState('');
  const [pageSectionNameForHeader, setPageSectionNameForHeader] = useState('');
  const [pageNameForHeader, setPageNameForHeader] = useState('');
  const [pageURLForHeader, setPageURLForHeader] = useState('');
  const [iconForHeader, setIconForHeader] = useState('');




  return (
    <GlobalContext.Provider
      value={{ username, setUsername, email, setEmail, picURL, setPicURL, pageNameForHeader, setPageNameForHeader, pageURLForHeader, setPageURLForHeader, pageSectionNameForHeader, setPageSectionNameForHeader, iconForHeader, setIconForHeader }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);