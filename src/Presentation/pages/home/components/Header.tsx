import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Menu from "../../../assets/menu.svg";
import { useIsMobile } from "../../../hooks/useIsMobile";
import User from "../../../assets/HeaderUser.svg";
import Notification from "../../../assets/Notification.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetUser } from "../../../hooks/useGetUser";

interface IHeaderProps {
  title: string;
  toggleMenu?: () => void;
}

export const HeaderHome = ({ title, toggleMenu }: IHeaderProps) => {
  const navigate = useNavigate();
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { isMobile } = useIsMobile();
  const { getUser } = useGetUser();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const [socket, setSocket] = useState<any>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    const newSocket = io(`http://localhost:3000/`, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (
      getUser?.roleId.activities?.some(
        (activity: any) => activity.id_activity === 2
      )
    ) {
      socket?.on("nuevaOrden", (data: any) => {
        setShowNotification(true);
        setNotifications(data.mensaje);
      });
    }

    if (
      getUser?.roleId.activities?.some(
        (activity: any) => activity.id_activity === 5
      )
    ) {
      socket?.on("nuevaProducción", (data: any) => {
        setShowNotification(true);
        setNotifications(data.mensaje);
      });
    }

    return () => {
      socket?.off("nuevaOrden");
      socket?.off("nuevaProducción");
    };
  }, [socket]);

  const handleMenuClick = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  const handleUserIconCLick = () => {
    navigate("user-information");
  };

  return (
    <div className={`header ${navbarClass}`}>
      {isMobile ? (
        <div className="menu" onClick={handleMenuClick}>
          <img src={Menu} alt="Menu" />
        </div>
      ) : (
        <>
          {showMessage ? (
            <div
              className="togle-notifications"
              onClick={() => {
                setShowMessage(false);
                setShowNotification(false);
              }}
            >
              <p>{notifications}</p>
            </div>
          ) : null}
          <div className="user-icon">
            {showNotification ? <div className="badge"></div> : null}
            <img
              src={Notification}
              alt="user-icon"
              onClick={() => setShowMessage(true)}
            />
          </div>
          <div className="user-icon">
            <img src={User} alt="user-icon" onClick={handleUserIconCLick} />
          </div>
        </>
      )}
    </div>
  );
};
