import "./styles.css";

interface IHeaderButtonProps {
  title: string;
  handleFunction?: () => void;
}

export const HeaderButton = ({ title, handleFunction }: IHeaderButtonProps) => {
  const handleClick = () => {
    if (handleFunction) {
      handleFunction();
    }
  };

  return (
    <button className="header-button" onClick={handleClick}>
      {title}
    </button>
  );
};
