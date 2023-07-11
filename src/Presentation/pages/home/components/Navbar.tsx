import Dashboard from "../../../assets/DashboardSVG.svg";
import DashboardWhite from "../../../assets/DashboardWhite.svg";
import Bag from "../../../assets/Bag.svg";
import BagWhite from "../../../assets/BagWhite.svg";
import User from "../../../assets/User.svg";
import UserWhite from "../../../assets/UserWhite.svg";
import Folder from "../../../assets/Folder.svg";
import FolderWhite from "../../../assets/FolderWhite.svg";
import Bookmark from "../../../assets/Bookmark.svg";
import BookmarkWhite from "../../../assets/BookmarkWhite.svg";
import Profile from "../../../assets/Profile.svg";
import ProfileWhite from "../../../assets/ProfileWhite.svg";
import Edit from "../../../assets/Edit.svg";
import EditWhite from "../../../assets/EditWhite.svg";
import { NavItemHome } from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useGetUser } from "../../../hooks/useGetUser";
import { Dispatch } from "redux";
import { logoutUser } from "../../../../store/actions/userAction";

interface INavbarProps {
  toggleNavbar: () => void;
}

export const NavbarHome = ({ toggleNavbar }: INavbarProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const { getUser } = useGetUser();
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const isMobileClicked = useSelector(
    (state: RootState) => state.navbarReducer.isMobileClicked
  );

  const { isMobile } = useIsMobile();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className={`navbar ${navbarClass} ${
        isMobile ? "navbar-responsive" : ""
      } ${isMobileClicked ? "navbar-mobile-clicked" : ""}`}
    >
      {isMobile ? null : (
        <div className="logo" onClick={toggleNavbar}>
          ITALINO
        </div>
      )}
      <ul className={`navigation`}>
        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 2
        ) ? (
          <NavItemHome
            icon={Dashboard}
            iconWhite={DashboardWhite}
            label="Dashboard"
            to={"/private/dashboard"}
          />
        ) : null}
        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 3
        ) ? (
          <NavItemHome
            icon={Bag}
            iconWhite={BagWhite}
            label="Ordenes"
            to={"/private/orders"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 4
        ) ? (
          <NavItemHome
            icon={User}
            iconWhite={UserWhite}
            label="Clientes"
            to={"/private/customers"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 5
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
            label="Gama de Colores"
            to={"/private/ranges"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 6
        ) ? (
          <NavItemHome
            icon={Bookmark}
            iconWhite={BookmarkWhite}
            label="Categorías"
            to={"/private/category"}
          />
        ) : null}

        {getUser?.roleId.activities?.some(
          (activity: any) => activity.id_activity === 5
        ) ? (
          <NavItemHome
            icon={Bookmark}
            iconWhite={BookmarkWhite}
            label="Producción"
            to={"/private/production"}
          />
        ) : null}

        {getUser?.roleId.id_role === 1 ? (
          <NavItemHome
            icon={Profile}
            iconWhite={ProfileWhite}
            label="Usuarios"
            to={"/private/users"}
          />
        ) : null}

        {getUser?.roleId.id_role === 1 ? (
          <NavItemHome
            icon={Edit}
            iconWhite={EditWhite}
            label="Roles"
            to={"/private/role"}
          />
        ) : null}
      </ul>
      <div className="logout" onClick={handleLogOut}>
        Cerrar sesión
      </div>
    </div>
  );
};
