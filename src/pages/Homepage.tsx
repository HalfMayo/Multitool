import HomeNavbar from "../components/HomeNavbar";
import Logo from '../components/Logo';

export default function Homepage() {
    return(
        <>
            <nav className="h-20 flex justify-between items-center w-11/12 fixed left-2/4 translate-x-[-50%]">
                <Logo/>
                <ul className="flex gap-4"></ul>
            </nav>
            <div className="flex flex-col gap-12 items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center gap-6">
                    <h1 className="text-6xl font-bold">Multitool</h1>
                    <p className="text-lg">A small multitool app to help you in your daily tasks!</p>
                </div>
                <HomeNavbar />
            </div>
        </>
    )
}