import { HeaderButtonEnum } from "../../enums/HeaderButtonEmun";
import "./styles.css";

interface IHeaderButtonProps {
  title: string;
  handleFunction?: () => void;
  typeButton?: HeaderButtonEnum;
}

export const HeaderButton = ({
  title,
  handleFunction,
  typeButton = HeaderButtonEnum.create,
}: IHeaderButtonProps) => {
  const handleClick = () => {
    if (handleFunction) {
      handleFunction();
    }
  };

  return (
    <button className={`header-button ${typeButton}`} onClick={handleClick}>
      {title}
    </button>
  );
};
