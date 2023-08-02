import { NavLink } from 'react-router-dom'
import Logo from './Logo'

export default function PageNav() {
    return(
        <nav className="h-20 flex justify-between items-center w-11/12 fixed left-2/4 translate-x-[-50%]">
           <Logo />
            <ul className="flex gap-8">
                <li><NavLink to="/todo" className={ ({isActive}) => isActive
                                                        ? "font-semibold text-on-surface pb-px border-b-2"
                                                        : "font-normal text-on-surface"}>To-Do List</NavLink></li>
                <li><NavLink to="/splitter" className={ ({isActive}) => isActive
                                                        ? "font-semibold text-on-surface pb-px border-b-2"
                                                        : "font-normal text-on-surface"}>Bill Splitter</NavLink></li>
                <li><NavLink to="/calc" className={ ({isActive}) => isActive
                                                        ? "font-semibold text-on-surface pb-px border-b-2"
                                                        : "font-normal text-on-surface"}>Calculator</NavLink></li>
                <li><NavLink to="/pomodoro" className={ ({isActive}) => isActive
                                                        ? "font-semibold text-on-surface pb-px border-b-2"
                                                        : "font-normal text-on-surface"}>Pomodoro Timer</NavLink></li>
                <li><NavLink to="/tracker" className={ ({isActive}) => isActive
                                                        ? "font-semibold text-on-surface pb-px border-b-2"
                                                        : "font-normal text-on-surface"}>Expenses Tracker</NavLink></li>
            </ul>
        </nav>
    )
}