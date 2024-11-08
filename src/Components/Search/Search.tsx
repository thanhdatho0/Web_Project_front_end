import { ChangeEvent } from "react";
import SearchIcon from "./SearchIcon.tsx";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string | undefined;
}

const Search = ({ handleChange, search }: Props) => {
  return (
    <div className="relative border-2 border-solid rounded-lg py-2">
      <div className="absolute pl-2 top-1/2 transform -translate-y-1/2">
        <SearchIcon />
      </div>
      <input
        value={search}
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Tìm kiếm"
        className="pl-9 border-none outline-none rounded-lg w-full text-base"
      />
    </div>
  );
};

export default Search;
