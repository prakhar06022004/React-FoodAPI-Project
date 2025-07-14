import styled from "styled-components";
import { BASE_URL, Button } from "../App";
const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <FoodCards>
        {data?.map(({ name, image, text, price }) => {
          return (
            <FoodCard key={name}>
              <div className="foodImg">
                <img src={BASE_URL + image} alt="img" />
              </div>
              <div className="foodInfo">
                <h3>{name}</h3>
                <p>{text}</p>
                <Button className="priceBtn">${price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          );
        })}
      </FoodCards>
    </FoodCardContainer>
  );
};

export default SearchResult;

const FoodCardContainer = styled.div`
  height: calc(100vh - 190px);
  background-image: url("/bgImage.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  height: 336px;
  max-width: 1060px;
`;

const FoodCard = styled.div`
  /* width: 340px;  same baat hai flex mai bhi width di h pr container m flex wrap hona jruri ha tbhi kaam krega flex*/
  flex: 0 0 340px;
  height: 167px;
  background: transparent;
  border-radius: 20px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(255, 255, 255, 0.1); /* semi-transparent */
  backdrop-filter: blur(10px); /* actual blur */
  -webkit-backdrop-filter: blur(10px); /* for Safari */

  .foodInfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .priceBtn {
    align-self: flex-end;
    margin-right: 20px;
  }
`;
