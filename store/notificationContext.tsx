import { NotificationContextType, notificationType } from "@/types/notificationType";
import { ReactNode, createContext, useState, useEffect } from "react";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: ({ title, message, status }: notificationType) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({ children }: { children: ReactNode }) {
  const [activeNotification, setActiveNotification] = useState<notificationType | null>(null);

  useEffect(() => {
    if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler({ title, message, status }: notificationType) {
    setActiveNotification({ title, message, status });
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = { notification: activeNotification, showNotification: showNotificationHandler, hideNotification: hideNotificationHandler };

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;
