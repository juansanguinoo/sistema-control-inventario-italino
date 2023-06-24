import { Link } from "react-router-dom";
import "./styles.css";

interface ILinkButtonProps {
  title: string;
  to?: string;
}

export const LinkButton = ({
  title,
  to = "/private/inventory/create-product",
}: ILinkButtonProps) => {
  return (
    <Link to={to}>
      <button className="header-button create">{title}</button>
    </Link>
  );
};
