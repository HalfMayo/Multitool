import HomeNavbar from "../components/HomeNavbar";
import Logo from "../components/Logo";
import Tip from "../components/Tip";

export default function Homepage() {
  return (
    <>
      <nav className="h-20 flex justify-between items-center w-11/12 fixed left-2/4 translate-x-[-50%]">
        <Logo />
        <ul className="flex gap-4"></ul>
      </nav>
      <main className="flex flex-col gap-12 justify-center h-screen w-[85vw] mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <h1 className="text-6xl font-bold">Multitool</h1>
          <Tip className="text-lg text-center w-fit">
            A small multitool app to help you in your daily tasks!
          </Tip>
        </div>
        <HomeNavbar />
      </main>
    </>
  );
}
