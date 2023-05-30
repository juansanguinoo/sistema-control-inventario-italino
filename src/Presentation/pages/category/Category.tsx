import "./styles.css";
import { ModalCategory } from "./components/Modal";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";

export const Category = () => {
  return (
    <>
      <div className="category-header">
        <PageTitle />
        <HeaderButton />
      </div>
      <div className="category-container">
        <CardInformation />
        <CardInformation />
        <TableInformation />
        <ModalCategory />
      </div>
    </>
  );
};
