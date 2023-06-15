import "./styles.css";
import Bag from "../../assets/Bag.svg";

interface ICardInformationProps {
  icon?: string;
  titles?: string[];
  data?: any[];
}

export const CardInformation = ({
  icon,
  titles,
  data,
}: ICardInformationProps) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={icon ? icon : Bag} alt="logo" />
      </div>
      <div className="card-columns">
        {titles &&
          data &&
          titles
            .filter((title) => title !== undefined)
            .map((title, index) => (
              <div className="card-column" key={index}>
                <div className="card-title">
                  <h6>{title}</h6>
                </div>
                <div className="card-data">
                  <h6>{data[index]}</h6>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
