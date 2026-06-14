type PageHeaderProps = {
  headText: string;
  subText: string;
};

export default function AuthPageHeader({ headText, subText }: PageHeaderProps) {
  return (
    <header className="w-full">
      <h2 className="text-3xl font-bold">{headText}</h2>
      <p>{subText}</p>
    </header>
  );
}
