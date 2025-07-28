import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="h-screen w-full font-display bg-gray-50 dark:bg-gray-950 text-black dark:text-gray-50 flex flex-col">
      <Header />

      <main className="p-4 w-full grow flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
