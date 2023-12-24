import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { store } from "./store.jsx"
import { Provider } from "react-redux"
import { MaterialUIControllerProvider } from "./pages/Admin/Components/context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}>
    
    </Provider> */}
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </React.StrictMode>
)
