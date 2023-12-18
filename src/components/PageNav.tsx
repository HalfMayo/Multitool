import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { ReactComponent as Menu } from "../assets/svgs/hamburger-menu-svgrepo-com.svg";
import { ReactComponent as Close } from "../assets/svgs/close-circle-svgrepo-com (1).svg";
import SvgButton from "../storybook_components/SvgButton";

export default function PageNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (window.innerWidth < 640)
    return (
      <>
        {!isOpen ? (
          <div className="bg-white w-screen py-4 flex items-center justify-center fixed z-10">
            <SvgButton
              svg={Menu}
              label="Menu"
              onClick={() => setIsOpen((prev) => !prev)}
              width="32"
              height="32"
            />
          </div>
        ) : (
          <div className="bg-white w-screen h-screen absolute z-10">
            <ul className="list-none w-full h-screen flex flex-col items-center justify-center gap-4">
              <li>
                <NavLink
                  to="/todo"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-on-surface pb-px border-b-2"
                      : "font-normal text-on-surface"
                  }
                >
                  To-Do List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/splitter"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-on-surface pb-px border-b-2"
                      : "font-normal text-on-surface"
                  }
                >
                  Bill Splitter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calc"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-on-surface pb-px border-b-2"
                      : "font-normal text-on-surface"
                  }
                >
                  Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pomodoro"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-on-surface pb-px border-b-2"
                      : "font-normal text-on-surface"
                  }
                >
                  Pomodoro Timer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tracker"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-on-surface pb-px border-b-2"
                      : "font-normal text-on-surface"
                  }
                >
                  Expenses Tracker
                </NavLink>
              </li>
              <li>
                <SvgButton
                  svg={Close}
                  label="Close Menu"
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              </li>
            </ul>
          </div>
        )}
      </>
    );
  return (
    <nav className="h-20 flex justify-between items-center w-11/12 fixed left-2/4 translate-x-[-50%]">
      <Logo />
      <ul className="flex gap-8">
        <li>
          <NavLink
            to="/todo"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-on-surface pb-px border-b-2"
                : "font-normal text-on-surface"
            }
          >
            To-Do List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/splitter"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-on-surface pb-px border-b-2"
                : "font-normal text-on-surface"
            }
          >
            Bill Splitter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calc"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-on-surface pb-px border-b-2"
                : "font-normal text-on-surface"
            }
          >
            Calculator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-on-surface pb-px border-b-2"
                : "font-normal text-on-surface"
            }
          >
            Pomodoro Timer
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracker"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-on-surface pb-px border-b-2"
                : "font-normal text-on-surface"
            }
          >
            Expenses Tracker
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
