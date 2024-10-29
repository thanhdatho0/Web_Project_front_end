

const ColorCard = () => {
  const color: string[] = [
    "bg-yellow-300",
    "bg-rose-700",
    "bg-sky-400",
    "bg-zinc-800  ",
    "bg-orange-50",
  ];
  return (
    <div className="flex items-center gap-2 pt-2">
      {color.map((c) => (
        <div
          className={`${c} inline-block cursor-pointer rounded-full border-2 hover:border-black sm:h-2 sm:w-4 md:h-4 md:w-4 lg:h-6 lg:w-6`}
        ></div>
      ))}
    </div>
  );
};

export default ColorCard;
