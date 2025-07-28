import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="h-screen w-full font-display bg-gray-50 dark:bg-gray-950 text-black dark:text-gray-50 felx flex-col">
      <Header />
      <main className="flex justify-center p-4 grow">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
