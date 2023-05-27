import Dashboard from "../../../assets/DashboardSVG.svg";
import Bag from "../../../assets/Bag.svg";
import User from "../../../assets/User.svg";
import Folder from "../../../assets/Folder.svg";
import { NavItemHome } from "./NavItem";

interface INavbarProps {
  expanded: boolean;
  toggleNavbar: () => void;
}

export const NavbarHome = ({ expanded, toggleNavbar }: INavbarProps) => {
  const navbarClass = expanded ? "expanded" : "collapsed";

  return (
    <div className={`navbar ${navbarClass}`}>
      <div className="logo" onClick={toggleNavbar}>
        LOGO
      </div>
      <ul className="navigation">
        <NavItemHome expanded={expanded} icon={Dashboard} label="Dashboard" />
        <NavItemHome expanded={expanded} icon={Bag} label="Ordenes" />
        <NavItemHome expanded={expanded} icon={User} label="Clientes" />
        <NavItemHome expanded={expanded} icon={Folder} label="Productos" />
      </ul>
      <div className="logout">Logout</div>
    </div>
  );
};
