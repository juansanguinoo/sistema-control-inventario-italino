import "./styles.css";

interface IPageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: IPageTitleProps) => {
  return <h2 className="page-title">{title}</h2>;
};
