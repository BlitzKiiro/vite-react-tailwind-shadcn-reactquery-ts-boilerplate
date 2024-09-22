import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./router";
import { Toaster } from "@/components/ui/toaster";
import { MillionLintProvider } from "@million/lint/runtime";
import { useTranslation } from "react-i18next";
import useScroll from "@/hooks/useScroll";

function App() {
  // i18n
  const {
    i18n: { language, dir },
  } = useTranslation();

  // react-query query client default options
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      queryKeyHashFn: (queryKey) => {
        const lang = language;
        return JSON.stringify([lang, ...queryKey]);
      },
    },
  });

  // set page direction
  useEffect(() => {
    document.body.dir = dir();
  }, [language]);

  // useScroll hook
  useScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <MillionLintProvider>
        <AppRouter />
      </MillionLintProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
