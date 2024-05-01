import dialogBox from "@/resources/persona-dialog-box.png";

interface FightDialogProps {
  fighterName: string;
  dialog: string;
}
export default function FightDialog({ fighterName, dialog }: FightDialogProps) {
  return (
    <div
      className="flex flex-col justify-between w-auto max-w-md h-36 pb-12"
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
      <p className="flex items-center px-20 h-12 text-white">{dialog}</p>
    </div>
  );
}
