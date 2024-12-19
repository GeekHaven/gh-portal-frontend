'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'contexts/AuthContext';
import theme from 'theme/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}
