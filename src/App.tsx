import React from "react";
import { FinalFormContextProvider } from "./form";
import { ThemeProvider } from "./ThemeContext";
import { ReduxForm } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>this is app</header>
      <React.StrictMode>
        <ThemeProvider theme="dark">
          <FinalFormContextProvider>
            <div className="container">
              <ReduxForm />
            </div>
          </FinalFormContextProvider>
        </ThemeProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
