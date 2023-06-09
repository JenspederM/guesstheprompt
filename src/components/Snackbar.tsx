import { CustomNotification } from "../providers/AppProvider";

export function Snackbar({
  notifications,
}: {
  notifications: CustomNotification[];
}) {
  return (
    <div className="toast toast-center">
      {[...notifications].reverse().map((notification) => (
        <div
          key={notification.text}
          className={`alert alert-${notification.type}`}
        >
          {notification.text}
        </div>
      ))}
    </div>
  );
}
