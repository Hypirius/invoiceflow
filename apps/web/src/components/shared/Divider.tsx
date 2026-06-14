export default function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-around text-center w-full">
      <div className="border-[#C7C4D8] w-[45%] h-0.5 border"></div>
      <span className="mx-1.5 w-[10%] text-[#464555]">{text}</span>
      <div className="border-[#C7C4D8] w-[45%] h-0.5 border"></div>
    </div>
  );
}
