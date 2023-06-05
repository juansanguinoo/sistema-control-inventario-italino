import "./styles.css";

interface IHeaderButtonProps {
  title: string;
  handleFunction?: () => void;
  redirect?: boolean;
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
