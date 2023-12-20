import Map from "../Components/Map";
import Sidebar from "../Components/SideBar";
import User from "../Components/User";
import { useAuth } from "../Contexts/FakeAuthContext";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
