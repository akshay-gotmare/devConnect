import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      {
        path: "/requests",
        element: <Requests />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
