import { useState, useRef } from "react";

import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

import Chat from "./components/chat";
import { Auth } from "./components/auth";

import "./App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const render = () => {
    if (!isAuth) {
      return <Auth isAuth={isAuth} setIsAuth={setIsAuth} />;
    } else {
      if (room != null) {
        return (
          <>
            <Chat room={room} />
            <div className="sign-out">
              <button onClick={signUserOut}>Sign Out</button>
            </div>
          </>
        );
      }

      return (
        <>
          <div className="room">
            <label>Enter room number</label>
            <input ref={roomInputRef} />
            <button
              onClick={() => {
                setRoom(roomInputRef.current.value);
              }}
            >
              Enter Chat
            </button>
          </div>
          <div className="sign-out">
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        </>
      );
    }
  };

  return <div className="App">{render()}</div>;
}

export default App;
