import React from "react";
import { ApolloProvider } from "@apollo/client";
import "./App.css";
// import EmployeeDirectory from "./components/EmployeeDirectory";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/Homepage";
import Body from "./components/Body";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeDirectory from "./components/EmployeeDirectory";
import EmployeeUpdate from "./components/EmployeeUpdate";
import EmployeeDetails from "./components/EmployeeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },

      {
        path: "/employeeslist/create",
        element: <EmployeeCreate />,
      },
      {
        path: "/employeeslist",
        element: <EmployeeDirectory />,
      },
      {
        path: "/employeeslist/:employeeid",
        element: <EmployeeDetails />,
      },
      {
        path: "/employeeslist/update/:empid",
        element: <EmployeeUpdate />,
      },
    ],
  },
]);
// Create Apollo Client with GraphQL server URI
function App() {
  return (
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
