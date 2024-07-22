import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./router";
import AuthProvider from "./components/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { MillionLintProvider } from "@million/lint/runtime";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MillionLintProvider>
          <AppRouter />
        </MillionLintProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
