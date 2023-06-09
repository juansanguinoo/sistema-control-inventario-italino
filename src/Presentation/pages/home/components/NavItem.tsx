import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { NavLink } from "react-router-dom";
import { selectedNavItem } from "../../../../store/actions/navbarActions";
import { Dispatch } from "redux";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface NavItemProps {
  icon: string;
  iconWhite: string;
  label: string;
  to: string;
}

export const NavItemHome = ({ icon, iconWhite, label, to }: NavItemProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarSelected = useSelector(
    (state: RootState) => state.navbarReducer.selectedNavItem
  );

  const handleNavItemClick = () => {
    dispatch(selectedNavItem(to));
  };
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const navbarSelectedClass = navbarSelected === to ? "active" : "";

  const { isMobile } = useIsMobile();

  return (
    <NavLink to={to}>
      <li
        className={`nav-item ${navbarClass} ${navbarSelectedClass}`}
        onClick={handleNavItemClick}
      >
        <img src={navbarSelected === to ? iconWhite : icon} alt="My SVG" />
        {navbarOpen || isMobile ? label : ""}
      </li>
    </NavLink>
  );
};
