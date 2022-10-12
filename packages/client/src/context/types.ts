import React from 'react';

export type AuthContextProps = {
  isAuthorized: boolean | null,
  setAuthorization: React.Dispatch<React.SetStateAction<boolean | null>>,
} | null;