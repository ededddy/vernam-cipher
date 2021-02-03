import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0px 0px 30px 0px;
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 10px 50px 10px 50px;
    font-size: 1.1rem;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  button {
    margin: 5px;
  }
`;

export const AppTitle = styled.h2`
  margin: 10px;
  padding: 5px;
`;