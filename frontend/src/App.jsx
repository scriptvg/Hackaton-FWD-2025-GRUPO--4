import React from "react";
import "./App.css";
import "./styles/admin.css";
import AppRouting from "./routes/AppRouting.jsx";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { ToastProvider, useToastContext } from "./context/ToastContext.jsx";
import { LayoutTransitionProvider } from "./context/LayoutTransitionContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastContainer } from "./components/ui/Toast";


function ToastContainerWrapper() {
  const { toasts, removeToast } = useToastContext();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

function App() {
  return (
    <ThemeProvider>
      <Theme
        accentColor="jade"
        grayColor="gray"
        panelBackground="solid"
        radius="small"
        scaling="90%"
      >
        <AuthProvider>
          <NotificationProvider>
            <LayoutTransitionProvider>
              <ToastProvider>
                {/* Aquí creas la "cabecera" más sencilla */}
                <header className="flex justify-end p-4">
                    
                  {/* podrías meter aquí tu logo o links de navegación */}
                </header>

                <AppRouting />

                <ToastContainerWrapper />
              </ToastProvider>
            </LayoutTransitionProvider>
          </NotificationProvider>
        </AuthProvider>

        {/* Opcional: Panel de Radix para temas preconfigurados */}
      </Theme>
    </ThemeProvider>
  );
}

export default App;
