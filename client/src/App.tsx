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

  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;

  const ConsoleWindow = styled.div`
    background-color: black;
    width: 70%;
    height: 30em;
    overflow: scroll;
    margin-top: 4em;
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
    width: 75%;
  `;

  return (
    <Container>
      <ConsoleWindow>
        {store.logOutputs.map((value, index) => (
          <Line key={index}>{value}</Line>
        ))}
        <form style={{ marginLeft: "1em" }} onSubmit={handleSubmit}>
          <Input ref={inputRef} autoComplete="off" autoFocus />
        </form>
      </ConsoleWindow>
    </Container>
  );
}

export default observer(App);
