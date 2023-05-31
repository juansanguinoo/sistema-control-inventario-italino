import { PageTitle } from "../../../components/titles/PageTitle";
import { HeaderButton } from "../../../components/buttons/HeaderButton";
import { CardInformation } from "../../../components/cards/CardInformation";
import { TableInformation } from "../../../components/tables/TableInformation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// import { Inventory } from "../../inventory/Inventory";
// import { Category } from "../../category/Category";

interface IMainProps {
  title: string;
}

export const MainHome = ({ title }: IMainProps) => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  return (
    <div className={`main ${navbarClass}`}>
      <div className="main-header">
        <PageTitle title={title} />
        <HeaderButton />
      </div>
      <div className="main-container">
        <CardInformation />
        <CardInformation />
        <TableInformation />
      </div>
      {/* <Inventory /> */}
      {/* <Category /> */}
    </div>
  );
};
