import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IHeaderProps {
  title: string;
}

export const HeaderHome = ({ title }: IHeaderProps) => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );

  return (
    <div className={`header ${navbarOpen ? "expanded" : "collapsed"}`}>
      <div className="title">{title}</div>
      <div className="circle green"></div>
      <div className="circle red"></div>
    </div>
  );
};
