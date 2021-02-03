import React from "react";
// import { Box, Typography } from "@material-ui/core";
import { Wrapper } from "./TabPanel.styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <Wrapper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <span>{children}</span>}
    </Wrapper>
  );
};

export default TabPanel;
