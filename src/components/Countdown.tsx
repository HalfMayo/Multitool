import { LegacyRef, memo } from "react";
import { ReactComponent as Play } from "../assets/svgs/play-svgrepo-com.svg";
import { ReactComponent as Pause } from "../assets/svgs/pause-svgrepo-com.svg";
import { ReactComponent as Refresh } from "../assets/svgs/bin-delete-recycle-svgrepo-com.svg";
import SvgButton from "../storybook_components/SvgButton";

interface CountdownProps {
  sessionTimer: boolean;
  handleReset: () => void;
  handlePlayPause: () => void;
  minutes: string | number;
  seconds: string | number;
  pause: boolean;
  audioRef: LegacyRef<HTMLAudioElement>;
}

export const Countdown = memo(function Countdown({
  sessionTimer,
  handleReset,
  handlePlayPause,
  minutes,
  seconds,
  pause,
  audioRef,
}: CountdownProps) {
  return (
    <div className="flex flex-col items-center justify-center text-lg font-semibold bg-surface-container w-full p-4 rounded-md">
      <h2>{sessionTimer ? "Current Session" : "Current Break"}</h2>
      <div className="flex items-center justify-center gap-4 text-xl font-bold">
        <SvgButton
          label="Reset Timer Settings"
          onClick={handleReset}
          svg={Refresh}
        />
        <h1>
          {minutes}:{seconds}
        </h1>
        <SvgButton
          label={pause ? "Start Timer" : "Pause Timer"}
          onClick={handlePlayPause}
          svg={pause ? Play : Pause}
        />
        <audio
          aria-hidden="true"
          src="https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg"
          ref={audioRef}
        ></audio>
      </div>
    </div>
  );
});
