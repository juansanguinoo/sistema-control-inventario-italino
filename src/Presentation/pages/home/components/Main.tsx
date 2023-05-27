import { PageTitle } from "../../../components/titles/PageTitle";
import { HeaderButton } from "../../../components/buttons/HeaderButton";
import { CardInformation } from "../../../components/cards/CardInformation";
import { TableInformation } from "../../../components/tables/TableInformation";

interface IMainProps {
  expanded: boolean;
}

export const MainHome = ({ expanded }: IMainProps) => {
  const navbarClass = expanded ? "expanded" : "collapsed";

  return (
    <div className={`main ${navbarClass}`}>
      <div className="main-header">
        <PageTitle />
        <HeaderButton />
      </div>
      <div className="main-container">
        <CardInformation />
        <CardInformation />
        <TableInformation />
      </div>
    </div>
  );
};
