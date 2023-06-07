import { Link } from "react-router-dom";
import "./styles.css";

interface ILinkButtonProps {
  title: string;
}

export const LinkButton = ({ title }: ILinkButtonProps) => {
  return (
    <Link to="/private/inventory/create-product">
      <button className="header-button">{title}</button>
    </Link>
  );
};
