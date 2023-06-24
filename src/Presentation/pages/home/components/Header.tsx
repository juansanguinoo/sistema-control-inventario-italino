import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Menu from "../../../assets/menu.svg";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface IHeaderProps {
  title: string;
  toggleMenu?: () => void;
}

export const HeaderHome = ({ title, toggleMenu }: IHeaderProps) => {
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

  return (
    <div className={`header ${navbarClass}`}>
      {isMobile ? (
        <div className="menu" onClick={handleMenuClick}>
          <img src={Menu} alt="Menu" />
        </div>
      ) : (
        <>
          <div className="title">{title}</div>
        </>
      )}
    </div>
  );
};
