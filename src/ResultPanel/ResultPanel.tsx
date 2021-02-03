import React from "react";
import { Wrapper } from "./ResultPanel.styles";

type Props = {
  resultType: string;
  result: string;
};

const ResultPanel: React.FC<Props> = ({ resultType, result }) => {
  return (
    <Wrapper>
      <h3>{resultType} Result:</h3>
      {result && <p>{result}</p>}
      {!result && <p className="no-result">Result will be shown here!</p>}
    </Wrapper>
  );
};

export default ResultPanel;
