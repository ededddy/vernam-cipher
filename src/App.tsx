import React, { useState, useEffect } from "react";
import { Wrapper, FlexWrapper, AppTitle } from "./App.styles";
import { AppBar, Tab, Tabs, Button, Divider } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import TabPanel from "./TabPanel/TabPanel";
import ResultPanel from "./ResultPanel/ResultPanel";
import CustomForm from "./CustomForm/CustomForm";
import { charMap, getKeyByValue } from "./utils/";

const MAP = charMap();

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const resultProps = (index: number) => (index ? "Decryption" : "Encryption");
const App = () => {
  // 0 - encrypt, 1 - decrypt
  const [value, setValue] = useState(0);
  const [cipherKeyValues, setCipherKeyValues] = useState("");
  const [plainText, setPlainText] = useState("");
  const [result, setResult] = useState("");
  const [canClear, setCanClear] = useState(false);
  useEffect(() => {
    plainText.length === 0 &&
    cipherKeyValues.length === 0 &&
    result.length === 0
      ? setCanClear(false)
      : setCanClear(true);
  }, [plainText, cipherKeyValues, result]);

  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    if (/\s/g.test(plainText) || /[^\w\s]|_+/g.test(plainText))
      return setErrorFlag(true);
    return cipherKeyValues.length === 0 ||
      plainText.length === cipherKeyValues.trim().split(" ").length
      ? setErrorFlag(false)
      : setErrorFlag(true);
  }, [plainText, cipherKeyValues]);

  const genCipher = (text: string) =>
    Array.from({ length: text.length }, () => Math.floor(Math.random() * 2000));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setPlainText(result);
    setResult("");
  };

  const plainTextOnChange = (value: string) => {
    setPlainText(value);
  };

  const cipherKeyOnChange = (value: string) => {
    if (/[a-zA-Z]+/g.test(value)) return;
    setCipherKeyValues(value);
  };

  const goCipher = () => {
    let res: string = "";
    let cipherKeys: number[];
    if (cipherKeyValues.length === 0 || cipherKeyValues === "") {
      cipherKeys = genCipher(plainText);
      setCipherKeyValues(cipherKeys.join(" "));
    } else {
      cipherKeys = cipherKeyValues.split(" ").map((item) => {
        return parseInt(item, 10);
      });
    }
    const normPlainText = plainText.toUpperCase().split("");
    if (!value) {
      // logic for encryption
      normPlainText.forEach((item, index) => {
        const val = getKeyByValue(MAP, (MAP[item] + cipherKeys[index]) % 26);
        res += item !== plainText[index] ? val?.toLowerCase() : val;
      });
    } else {
      // logic for decryption
      normPlainText.forEach((item, index) => {
        const temp = (MAP[item] - cipherKeys[index]) % 26;
        const target = temp < 0 ? temp + 26 : temp;
        const val = getKeyByValue(MAP, target);
        res += item !== plainText[index] ? val?.toLowerCase() : val;
      });
    }
    setResult(res);
  };
  return (
    <Wrapper>
      <AppBar position="static" color="transparent">
        <FlexWrapper
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <AppTitle>Vernam Cipher</AppTitle>
          <a
            style={{ margin: "5px" }}
            href="https://github.com/ededddy/vernam-cipher"
            aria-label="GitHub Repository"
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon fontSize="large" style={{ color: "black" }} />
          </a>
        </FlexWrapper>
        <Divider />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Encryption" {...a11yProps(0)} />
          <Tab label="Decrpytion" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <FlexWrapper style={{ justifyContent: "space-between" }}>
        <TabPanel value={value} index={0}>
          <CustomForm
            formType="Encrypt"
            errorFlag={errorFlag}
            plainTextValue={plainText}
            cipherKeyValues={cipherKeyValues}
            plainTextOnChange={plainTextOnChange}
            cipherKeyOnChange={cipherKeyOnChange}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomForm
            formType="Decrypt"
            errorFlag={errorFlag}
            plainTextValue={plainText}
            cipherKeyValues={cipherKeyValues}
            plainTextOnChange={plainTextOnChange}
            cipherKeyOnChange={cipherKeyOnChange}
          />
        </TabPanel>
        <ResultPanel resultType={resultProps(value)} result={result} />
      </FlexWrapper>
      <FlexWrapper style={{ justifyContent: "center" }}>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={goCipher}
          disabled={errorFlag}
        >
          {" "}
          GO !
        </Button>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            setPlainText("");
            setCipherKeyValues("");
            setResult("");
          }}
          disabled={!canClear}
        >
          {" "}
          Clear ALL
        </Button>
      </FlexWrapper>
    </Wrapper>
  );
};

export default App;
