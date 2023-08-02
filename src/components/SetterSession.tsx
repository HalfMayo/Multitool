import {Dispatch, memo} from 'react'
import { ReactComponent as Minus } from '../assets/svgs/minus-svgrepo-com.svg'
import { ReactComponent as Plus } from '../assets/svgs/plus-svgrepo-com.svg'
import SvgButton from '../storybook_components/SvgButton'
import { Actions } from './PomodoroTimer'

interface SessionProps {
    sessionLength: number,
    dispatch: Dispatch<Actions>
}

export const SetterSession = memo(function SetterSession({sessionLength, dispatch}: SessionProps) {

    return(
        <div className="flex flex-col items-center justify-center bg-surface-container px-4 pt-4 pb-2 rounded-md">
            <h3>Session Length</h3>
            <div className="flex items-center justify-center gap-4">
              <SvgButton svg={Minus} label="decrease session length" onClick={() => dispatch({type:"session/decrement"})}/>
                <h3>{sessionLength}</h3>
                <SvgButton svg={Plus} label="increase session length" onClick={() => dispatch({type:"session/increment"})}/>
            </div>
        </div>
    )
})