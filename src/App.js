import "./App.css";
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { readData, writeData } from "./firebase/firebase";

function App() {

  return (
    <div>
      <button onClick={writeData}>Write</button>
      <button onClick={readData}>Read</button>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/blitzsend" state={handleSubmit}>
          Blitzsend
        </Link>{" "}
        |{" "}
        <Link to="/blitzcatch" state={messageList}>
          Blitzcatch
        </Link>
      </nav>
      <Outlet />
    </div>
  );
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav>
				<Link to='/blitzsend'>Blitzsend</Link> |{' '}
				<Link to='/blitzcatch'>Blitzcatch</Link>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
