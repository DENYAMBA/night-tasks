import React, { ReactNode } from 'react';
import { AppContext, useInitGlobalState } from './context';

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const globalState = useInitGlobalState();
  return (
    <AppContext.Provider value={globalState}>
      {children}
    </AppContext.Provider>
  );
};