import { FormInventory } from "./components/Form";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";

export const Inventory = () => {
  return (
    <div>
      <div className="inventory-header">
        <PageTitle />
        <HeaderButton />
      </div>
      <FormInventory />
    </div>
  );
};
