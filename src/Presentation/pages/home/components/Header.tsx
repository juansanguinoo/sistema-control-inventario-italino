interface IHeaderProps {
  expanded: boolean;
}

export const HeaderHome = ({ expanded }: IHeaderProps) => {
  return (
    <div className={`header ${expanded ? "expanded" : "collapsed"}`}>
      <div className="title">Dashboard</div>
      <div className="circle green"></div>
      <div className="circle red"></div>
    </div>
  );
};
