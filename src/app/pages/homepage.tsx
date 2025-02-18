import HomeMainContent from "../_components/home/homemaincontent";
import HomeNavBar from "../_components/home/homenavbar";
import HomeSideBar from "../_components/home/homesidebar";

export default function HomePage() {
    return (
        <div>
            <HomeNavBar></HomeNavBar>
            <div className="flex flex-auto">
                <HomeSideBar></HomeSideBar>
                <HomeMainContent></HomeMainContent>
            </div>
        </div>
    );
}