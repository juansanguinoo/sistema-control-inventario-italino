interface IMainProps {
  expanded: boolean;
}

export const MainHome = ({ expanded }: IMainProps) => {
  return (
    <div className={`main ${expanded ? "expanded" : "collapsed"}`}>
      {/* Contenido del Main */}
    </div>
  );
};
