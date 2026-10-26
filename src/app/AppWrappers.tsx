'use client';

import { ReactNode, useState, useEffect } from 'react';
import 'styles/App.css';
import 'styles/MiniCalendar.css';

import { ChakraProvider, cookieStorageManager, useColorMode } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { AuthProvider } from 'contexts/AuthContext';
import { SidebarProvider } from 'contexts/SidebarContext';
import { SakuraProvider } from 'contexts/SakuraContext';
import { FeaturesProvider } from 'contexts/FeaturesContext';
import theme from 'theme/theme';

import dynamic from 'next/dynamic';

const GlobalSakuraBackground = dynamic(() => import('components/common/GlobalSakuraBackground'), { ssr: false });
import PageTransition from 'components/common/PageTransition';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function ChakraThemeSync() {
  const { resolvedTheme } = useTheme();
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (resolvedTheme && (resolvedTheme === 'light' || resolvedTheme === 'dark')) {
      if (colorMode !== resolvedTheme) {
        setColorMode(resolvedTheme);
      }
    }
  }, [resolvedTheme, colorMode, setColorMode]);

  return null;
}

export default function AppWrappers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <FeaturesProvider>
          <SakuraProvider>
            <GlobalSakuraBackground />
            <AuthProvider>
              <SidebarProvider>
                <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
                  <ChakraThemeSync />
                  {children}
                </ChakraProvider>
              </SidebarProvider>
            </AuthProvider>
            <PageTransition />
          </SakuraProvider>
        </FeaturesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
