import AddIcon from "../../../assets/iconContainer.svg";

interface IFilterMessageProps {
  messageTitle: string;
  messageParagraph: string;
}

export const FilterMessage = ({
  messageTitle,
  messageParagraph,
}: IFilterMessageProps) => {
  return (
    <div className="modal-add-product-display">
      <img src={AddIcon} alt="search-icon" />
      <p className="add-product-title">{messageTitle}</p>
      <p className="add-product-paragraph">{messageParagraph}</p>
    </div>
  );
};
