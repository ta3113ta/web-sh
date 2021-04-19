import { useRef } from "react";
import { observer } from "mobx-react";
import store from "./store/socket.store";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (inputRef?.current?.value) {
      store.sendCommand(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <>
      {store.logOutputs.map((value, index) => (
        <p key={index}>{value}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} autoComplete="off" autoFocus/>
      </form>
    </>
  );
}

export default observer(App);
