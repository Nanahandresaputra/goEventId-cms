import { Button, ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import { themeProvider } from "./helpers/themeProvider";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { interceptorsUtils } from "./helpers/interceptors";

function App() {
  useEffect(() => {
    interceptorsUtils();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ConfigProvider theme={themeProvider}>
          <ToastContainer />
          <AppRouter />
        </ConfigProvider>
      </Router>
    </Provider>
  );
}

export default App;
