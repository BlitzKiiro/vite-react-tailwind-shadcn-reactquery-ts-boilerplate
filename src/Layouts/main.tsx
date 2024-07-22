import { Outlet } from "react-router-dom";

import useScroll from "@/hooks/useScroll";

const MainLayout = () => {
  useScroll();
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default MainLayout;
