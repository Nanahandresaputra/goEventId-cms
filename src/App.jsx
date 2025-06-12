import { Button } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
