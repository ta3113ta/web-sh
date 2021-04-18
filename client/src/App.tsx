import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5001";
const socket = socketIOClient(ENDPOINT);


function App() {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
      socket.on('command', (msg) => {
        setMessage(msg);
      });
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (inputRef?.current?.value) {
      socket.emit('command', inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} autoComplete="off" />
        <button>send</button>
      </form>
      <p>{message}</p>
    </>
  )
}

export default App;
