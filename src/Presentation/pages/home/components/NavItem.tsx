interface NavItemProps {
  expanded: boolean;
  icon: string;
  label: string;
}

export const NavItemHome = ({ expanded, icon, label }: NavItemProps) => {
  return (
    <li className={`nav-item ${expanded ? "expanded" : "collapsed"}`}>
      <img src={icon} alt="My SVG" />
      {expanded ? label : ""}
    </li>
  );
};
