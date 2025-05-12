import { createBrowserRouter } from "react-router";

import Layout from "../layouts/Layout";
import Intro from "../views/Intro/Intro";
import Places from "../views/Places/Places";
import Explore from "../views/Explore/Explore";

let router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: Intro },
      { path: "/intro", Component: Intro },
      { path: "/places", Component: Places },
      { path: "/explore", Component: Explore },
    ],
  },
]);

export default router;
