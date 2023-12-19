import PageNav from "../components/PageNav";
import QuoteMachine from "../components/QuoteMachine";
import SvgButton from "../storybook_components/SvgButton";
import { ReactComponent as Down } from "../assets/svgs/down-arrow-5-svgrepo-com.svg";
import { ChildrenWProps } from "../interfaces/ChildrenProps";

export default function PageBase({ children, type }: ChildrenWProps) {
  return (
    <>
      <PageNav />
      <main className="h-screen w-screen sm:w-auto">
        <div
          className={`flex flex-col sm:gap-32 gap-8 items-center justify-center w-full sm:h-full sm:static sm:top-0 relative ${
            type === "center" ? "top-20" : "top-24"
          }`}
        >
          <div
            className={`h-[calc(100vh-6rem)] relative sm:h-auto ${
              type === "center"
                ? "flex flex-col items-center justify-center pb-14"
                : ""
            }`}
          >
            {children}
            {window.innerWidth < 640 && (
              <div className="w-full flex items-center justify-center absolute bottom-[5vh]">
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
