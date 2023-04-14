export type notificationType = {
    title: string, message: string, status: string
}

export type NotificationContextType = {
    notification: notificationType | null;
    showNotification: ({title, message, status}: notificationType) => void;
    hideNotification: () => void;
  };