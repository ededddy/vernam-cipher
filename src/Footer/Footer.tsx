import React from "react";
import { Wrapper } from "./Footer.styles";
import { IconButton } from "@material-ui/core";
import { GitHub, Email } from "@material-ui/icons";

const Footer: React.FC<{}> = () => {
  return (
    <Wrapper>
      <p>
        Made By{" "}
        <a
          href="https://www.github.com/ededddy"
          rel="noreferrer"
          target="_blank"
        >
          Eddy
        </a>
      </p>
      <IconButton
        href="https://www.github.com/ededddy"
        size="medium"
        aira-label="GitHub user ededddy"
        rel="noreferrer"
        target="_blank"
      >
        <GitHub />
      </IconButton>
      <IconButton
        href="mailto:eddylei070300@gmail.com"
        size="medium"
        aria-label="Email"
        rel="noreferrer"
        target="_blank"
      >
        <Email />
      </IconButton>
    </Wrapper>
  );
};

export default Footer;
