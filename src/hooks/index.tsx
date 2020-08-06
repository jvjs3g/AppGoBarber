import React from 'react';

import { AuthProvider } from './Auth';

const appProvider: React.FC = ({ children }) => (
  <AuthProvider>
      {children}
  </AuthProvider>
);

export default appProvider;
