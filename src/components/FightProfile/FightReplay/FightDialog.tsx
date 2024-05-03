import dialogBox from "@/resources/persona-dialog-box.png";
import { Typewriter } from "react-simple-typewriter";

interface FightDialogProps {
  className: string;
  fighterName: string;
  dialog: string;
}

export default function FightDialog({
  className,
  fighterName,
  dialog,
}: FightDialogProps) {
  return (
    <div
      className={`${className} flex flex-col justify-between w-[448px] h-36 pb-12`}
      style={{
        backgroundImage: `url('${dialogBox.src}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        position: "relative",
      }}
    >
      <div className="pl-[68px] pt-[18px]">
        <div className="text-black w-fit -rotate-[16deg]">{fighterName}</div>
      </div>
      <div className="flex items-center px-20 h-12 text-white">
        <Typewriter
          words={[dialog]}
          loop={0} // Infinite loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          delaySpeed={1000}
        />
      </div>
    </div>
  );
}
