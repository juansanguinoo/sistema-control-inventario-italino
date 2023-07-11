import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Menu from "../../../assets/menu.svg";
import { useIsMobile } from "../../../hooks/useIsMobile";
import User from "../../../assets/HeaderUser.svg";
import { useNavigate } from "react-router-dom";

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
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

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
          <div className="user-icon">
            <img src={User} alt="user-icon" onClick={handleUserIconCLick} />
          </div>
        </>
      )}
    </div>
  );
};
