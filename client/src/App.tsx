import { useRef } from "react";
import { observer } from "mobx-react";
import store from "./store/socket.store";
import styled from "styled-components";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (inputRef?.current?.value) {
      store.sendCommand(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleClickConsoleWindow = (event: any) => {
    inputRef.current?.focus();
  }

  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;

  const ConsoleWindow = styled.div`
    background-color: black;
    width: 70%;
    height: 30em;
    overflow: auto;
    margin-top: 4em;
    padding: 2em 0;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;

    /* hide scrollbar */
    &::-webkit-scrollbar { 
      display: none;           /* Safari and Chrome */
    }
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;     /* Firefox */
  `;

  const Line = styled.p`
    color: white;
    margin-left: 1em;
  `;

  const Input = styled.input`
    height: 1.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    outline: none;
  `;

  const InputForm = styled.form`
    margin-left: 1em;
  ` 

  return (
    <Container>
      <ConsoleWindow onClick={handleClickConsoleWindow}>
        {store.logOutputs.map((value, index) => (
          <Line key={index}>{value}</Line>
        ))}
        <InputForm onSubmit={handleSubmit}>
          <Input ref={inputRef} autoComplete="off" autoFocus />
        </InputForm>
      </ConsoleWindow>
    </Container>
  );
}

export default observer(App);
