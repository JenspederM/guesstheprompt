import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { Login } from "../pages";

type User = {
  id: string;
  name: string;
};

type CustomNotification = {
  text: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
};

type AppContextProps = {
  user: User | null;
  notifications: CustomNotification[];
  addNotification: (notification: CustomNotification) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuthChange = async (authUser: FirebaseUser | null) => {
    if (!authUser) {
      return;
    }

    let userDoc = await getDoc(doc(db, "users", authUser.uid)).catch(
      () => null,
    );

    let user: User;

    if (userDoc && userDoc.exists()) {
      user = userDoc.data() as User;
    } else {
      user = {
        id: authUser.uid,
        name: "",
      };
      await setDoc(doc(db, "users", user.id), user).catch(() => null);
    }

    setUser(user);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, handleAuthChange);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubUser = onSnapshot(doc(db, "users", user.id), (doc) => {
      setUser(doc.data() as User);
    });

    return unsubUser;
  }, [user]);

  const addNotification = (notification: CustomNotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n !== notification),
      );
    }, notification.duration || 3000);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notifications,
        addNotification,
        isLoading,
        setIsLoading,
      }}
    >
      <div className="flex flex-col absolute inset-0 items-center overscroll-contain max-h-screen min-h-0 overflow-hidden">
        <div className="flex flex-col grow w-full sm:max-w-md xl:max-w-2xl max-w-4xl items-center max-h-screen pt-8 pb-12 px-4">
          {!user ? <Login /> : isLoading ? <Loading /> : children}
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
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
