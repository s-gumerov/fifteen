import React from 'react';

export type AuthContextProps = {
  isAuthorized: boolean,
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>,
} | null;