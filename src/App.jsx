import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import FullPageLoader from "./ui/FullPageLoader";
import { DarkModeProvider } from "./context/DarkModeContext";
import { SidebarProvider } from "./context/SidebarContext";

// Lazy-loaded routes for code-splitting and ultra-fast initial page loads
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Checkin = lazy(() => import("./pages/Checkin"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const NewBooking = lazy(() => import("./pages/NewBooking"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes cache validity for smooth instant navigation
      gcTime: 10 * 60 * 1000,    // 10 minutes garbage collection
      refetchOnWindowFocus: false, // Prevent jarring flashes on window switch
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AnimatePresence mode="wait">
              <Suspense fallback={<FullPageLoader />}>
                <Routes>
                  <Route path="/welcome" element={<LandingPage />} />
                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/:bookingId" element={<Booking />} />
                    <Route path="checkin/:bookingId" element={<Checkin />} />
                    <Route path="cabins" element={<Cabins />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="account" element={<Account />} />
                    <Route path="new-booking" element={<NewBooking />} />
                    <Route path="help" element={<HelpCenter />} />
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </BrowserRouter>

          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "1.4rem",
                maxWidth: "500px",
                padding: "1.2rem 1.6rem",
                backgroundColor: "#18181b",
                color: "#fafafa",
                border: "1px solid #27272a",
                borderRadius: "14px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
              },
            }}
          />
        </QueryClientProvider>
      </SidebarProvider>
    </DarkModeProvider>
  );
}

export default App;
