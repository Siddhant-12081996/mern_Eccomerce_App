import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import route from "./routes/route"
import { store } from './redux/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter(route);

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
   
  <RouterProvider router={router}>
  

    <App />
  </RouterProvider>
 
  </Provider>
 
);
