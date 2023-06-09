import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { Login } from "../pages";
import { Welcome } from "../components/Welcome";
import { Snackbar } from "../components/Snackbar";

type User = {
  id: string;
  name: string;
  theme: string;
  lastLogin: number;
  createdAt: number;
};

export type CustomNotification = {
  text: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
};

type AppContextProps = {
  user?: User;
  notifications: CustomNotification[];
  addNotification: (notification: CustomNotification) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWelcoming, setIsWelcoming] = useState<boolean>(true);

  async function handleAuthChange(authUser: FirebaseUser | null) {
    if (!authUser) {
      return;
    }

    let userDoc = await getDoc(doc(db, "users", authUser.uid)).catch((e) =>
      console.error("Error getting user", e),
    );

    let user: User;

    if (userDoc && userDoc.exists()) {
      user = userDoc.data() as User;
      user.lastLogin = Date.now();
      setUser(user);
      await updateDoc(doc(db, "users", user.id), {
        lastLogin: user.lastLogin,
      }).catch((e) => console.error("Error updating user", e));
    } else {
      user = {
        id: authUser.uid,
        name: "",
        theme: "dark",
        lastLogin: Date.now(),
        createdAt: Date.now(),
      };
      setUser(user);
      await setDoc(doc(db, "users", user.id), user).catch((e) =>
        console.error("Error creating user", e),
      );
    }

    setUser(user);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, handleAuthChange);
    return subscriber;
  }, []);

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

  if (isWelcoming) {
    setTimeout(() => {
      setIsWelcoming(false);
    }, 1000);

    return <Welcome />;
  }

  if (isLoading) {
    return <Loading />;
  }

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
          {!user ? <Login /> : children}
          <Snackbar notifications={notifications} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
