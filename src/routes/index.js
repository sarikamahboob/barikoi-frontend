import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// project imports
import Loadable from "../ui-component/Loadable";

// route imports
const LandingPage = Loadable(
  lazy(() => import("../pages/index"))
);

// ===========================|| ROUTING RENDER ||=========================== //

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
  ]);
};

export default Routes;