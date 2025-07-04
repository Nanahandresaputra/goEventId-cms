import { Button, ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import { themeProvider } from "./helpers/themeProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ConfigProvider theme={themeProvider}>
        <ToastContainer />
        <AppRouter />
      </ConfigProvider>
    </Router>
  );
}

export default App;
