import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout(){
    return <div className="h-screen w-full font-display bg-gray-50 dark:bg-gray-950 text-black dark:text-gray-50">
    <Header/>
    <Outlet/>
    </div>
}

export default Layout;