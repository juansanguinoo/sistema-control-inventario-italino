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
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface INavbarProps {
  toggleNavbar: () => void;
}

export const NavbarHome = ({ toggleNavbar }: INavbarProps) => {
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
          ITALINO
        </div>
      )}
      <ul className={`navigation`}>
        <NavItemHome
          icon={Dashboard}
          iconWhite={DashboardWhite}
          label="Dashboard"
          to={"/private/dashboard"}
        />
        <NavItemHome
          icon={Bag}
          iconWhite={BagWhite}
          label="Ordenes"
          to={"/private/orders"}
        />
        <NavItemHome
          icon={User}
          iconWhite={UserWhite}
          label="Clientes"
          to={"/private/customers"}
        />
        <NavItemHome
          icon={Folder}
          iconWhite={FolderWhite}
          label="Productos"
          to={"/private/inventory"}
        />
        <NavItemHome
          icon={Bookmark}
          iconWhite={BookmarkWhite}
          label="Categorías"
          to={"/private/category"}
        />
        <NavItemHome
          icon={Profile}
          iconWhite={ProfileWhite}
          label="Usuarios"
          to={"/private/users"}
        />
        <NavItemHome
          icon={Edit}
          iconWhite={EditWhite}
          label="Roles"
          to={"/private/role"}
        />
      </ul>
      <div className="logout">Logout</div>
    </div>
  );
};
