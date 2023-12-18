import PageNav from "../components/PageNav";
import PomodoroTimer from "../components/PomodoroTimer";
import QuoteMachine from "../components/QuoteMachine";
import SvgButton from "../storybook_components/SvgButton";
import { ReactComponent as Down } from "../assets/svgs/down-arrow-5-svgrepo-com.svg";

export default function Pomodoro() {
  return (
    <>
      <PageNav />
      <main className="h-screen w-screen sm:w-auto">
        <div className="flex flex-col sm:gap-32 gap-8 items-center justify-center w-full sm:h-full sm:static sm:top-0 relative top-20">
          <div className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center sm:h-auto">
            <PomodoroTimer />
            {window.innerWidth < 640 && (
              <div
                className={`w-full flex items-center justify-center relative ${
                  window.innerHeight < 700 ? "bottom-[-10vh]" : "bottom-[-20vh]"
                }`}
              >
                <SvgButton
                  label="Go to quote"
                  svg={Down}
                  width="32"
                  height="32"
                />
              </div>
            )}
          </div>
          <div className="p-8 sm:p-0">
            <QuoteMachine />
          </div>
        </div>
      </main>
    </>
  );
}
