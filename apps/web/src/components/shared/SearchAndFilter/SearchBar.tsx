import Input from "@/components/ui/Input";

function SearchBar({ placeholderText }: { placeholderText: string }) {
  return (
    <Input
      className="w-70 h-9 rounded"
      placeholder={`&#128269; Search ${placeholderText}`}
    />
  );
}

export default SearchBar;
