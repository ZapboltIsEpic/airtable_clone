import HomeMainContent from "../_components/homemaincontent";
import HomeNavBar from "../_components/homenavbar";
import HomeSideBar from "../_components/homesidebar";

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