import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResult from "./components/search";
export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiletred] = useState(null);

  const filetredData = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue);
    if (searchValue === "") {
      setFiletred(data);
      return;
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue)
    );
    setFiletred(filter);
  };

  function handlerClick(category) {
    const result = data.filter(
      (item) => item.type?.toLowerCase() === category.toLowerCase()
    );
    setFiletred(result);
  }

  useEffect(() => {
    const foodItemsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log("JSON:", json);
        setData(json);
        setFiletred(json);
        setLoading(false);
      } catch (error) {
        setError("unable to fetch data");
      }
    };
    foodItemsData();
  }, []);
  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/Foody Zone.svg" alt="" />
        </div>

        <div className="search">
          <input
            onChange={filetredData}
            type="search"
            placeholder="Search Food..."
          />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button onClick={() => setFiletred(data)}>All</Button>
        <Button onClick={() => handlerClick("breakfast")}>Breakfast</Button>
        <Button onClick={() => handlerClick("lunch")}>Lunch</Button>
        <Button onClick={() => handlerClick("dinner")}>Dinner</Button>
      </FilterContainer>

      <SearchResult data={filtered} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  min-height: 100vh;
    overflow-y: auto;

`;
const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;

  .search input {
    border: none;
    outline: 1px solid red;
    height: 40px;
    width: 350px;
    border-radius: 10px;
    background-color: transparent;
    padding: 10px;
    color: white;
  }

  input::placeholder {
    color: white;
  }

  @media (max-width: 566px) {
        display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    
    .search input {
      border: none;
      outline: 1px solid red;
      height: 40px;
      width: 320px;
      border-radius: 10px;
      background-color: transparent;
      padding: 10px;
      color: white;
    }
  }

  @media (min-width: 567px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    .search input {
      border: none;
      outline: 1px solid red;
      height: 40px;
      width: 500px;
      border-radius: 10px;
      background-color: transparent;
      padding: 10px;
      color: white;
    }
  }

  @media (min-width: 769px) and (max-width: 991px) {
    .search input {
      border: none;
      outline: 1px solid red;
      height: 40px;
      width: 350px;
      border-radius: 10px;
      background-color: transparent;
      padding: 10px;
      color: white;
    }
  }
            @media (min-width: 992px) and (max-width: 1199px) {
              .search input {
                      width: 350px;

              }
            }

`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  color: #ffffff;
  width: fit-content; /* 👈 MAGIC LINE */
`;
