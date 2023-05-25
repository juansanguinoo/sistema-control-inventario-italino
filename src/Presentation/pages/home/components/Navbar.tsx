interface INavbarProps {
  expanded: boolean;
  toggleNavbar: () => void;
}

export const NavbarHome = ({ expanded, toggleNavbar }: INavbarProps) => {
  return (
    <div className={`navbar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="logo" onClick={toggleNavbar}>
        LOGO
      </div>
      {expanded && (
        <>
          <ul className="navigation">
            <li className="nav-item">Item 1</li>
            <li className="nav-item">Item 2</li>
            <li className="nav-item">Item 3</li>
            <li className="nav-item">Item 4</li>
          </ul>
          <div className="logout">Logout</div>
        </>
      )}
    </div>
  );
};
