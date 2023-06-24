import Dashboard from "../../../assets/DashboardSVG.svg";
import DashboardWhite from "../../../assets/DashboardWhite.svg";
import Bag from "../../../assets/Bag.svg";
import BagWhite from "../../../assets/BagWhite.svg";
import User from "../../../assets/User.svg";
import UserWhite from "../../../assets/UserWhite.svg";
import Folder from "../../../assets/Folder.svg";
import FolderWhite from "../../../assets/FolderWhite.svg";
import { NavItemHome } from "./NavItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useGetUser } from "../../../hooks/useGetUser";

interface INavbarProps {
  toggleNavbar: () => void;
}

export const NavbarHome = ({ toggleNavbar }: INavbarProps) => {
  const { getUser } = useGetUser();
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const isMobileClicked = useSelector(
    (state: RootState) => state.navbarReducer.isMobileClicked
  );

  const { isMobile } = useIsMobile();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  return (
    <div
      className={`navbar ${navbarClass} ${
        isMobile ? "navbar-responsive" : ""
      } ${isMobileClicked ? "navbar-mobile-clicked" : ""}`}
    >
      {isMobile ? null : (
        <div className="logo" onClick={toggleNavbar}>
          LOGO
        </div>
      )}
      <ul className={`navigation`}>
        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 1
        ) ? (
          <NavItemHome
            icon={Dashboard}
            iconWhite={DashboardWhite}
            label="Dashboard"
            to={"/private/dashboard"}
          />
        ) : null}
        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 2
        ) ? (
          <NavItemHome
            icon={Bag}
            iconWhite={BagWhite}
            label="Ordenes"
            to={"/private/orders"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 3
        ) ? (
          <NavItemHome
            icon={User}
            iconWhite={UserWhite}
            label="Clientes"
            to={"/private/customers"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 4
        ) ? (
          <NavItemHome
            icon={Folder}
            iconWhite={FolderWhite}
            label="Productos"
            to={"/private/inventory"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 5
        ) ? (
          <NavItemHome
            icon={Folder}
            iconWhite={FolderWhite}
            label="Categorías"
            to={"/private/category"}
          />
        ) : null}

        {getUser?.roleId.id_role === 1 ? (
          <NavItemHome
            icon={Folder}
            iconWhite={FolderWhite}
            label="Usuarios"
            to={"/private/users"}
          />
        ) : null}

        {getUser?.roleId.id_role === 1 ? (
          <NavItemHome
            icon={Folder}
            iconWhite={FolderWhite}
            label="Roles"
            to={"/private/role"}
          />
        ) : null}
      </ul>
      <div className="logout">Cerrar sesión</div>
    </div>
  );
};
