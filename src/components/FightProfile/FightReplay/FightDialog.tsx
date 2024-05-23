import dialogBox from "@/resources/persona-dialog-box.png";
import { Typewriter } from "react-simple-typewriter";
import { useEffect } from "react";
import { useScrollToEnd, useScrollToBottom } from "react-scroll-to-bottom";
import ScrollToBottom from "react-scroll-to-bottom";

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
  function ScrollToEnd() {
    const scrollToEnd = useScrollToEnd();
    const scrollToBottom = useScrollToBottom();

    useEffect(() => {
      const interval = setInterval(() => {
        scrollToEnd();
        scrollToBottom();
      }, 100);

      return () => clearInterval(interval);
    }, [scrollToEnd, scrollToBottom]);

    return null;
  }

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
      <ScrollToBottom className="flex items-center px-20 h-12 text-white  overflow-auto">
        <Typewriter
          key={dialog}
          words={[dialog]}
          loop={0} // Infinite loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          delaySpeed={1000}
        />

        <ScrollToEnd />
      </ScrollToBottom>
    </div>
  );
}
