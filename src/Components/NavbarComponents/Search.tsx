import { ChangeEvent } from "react"
import SearchIcon from "./SearchIcon"

interface Props{
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string | undefined;
}

const Search = ({handleChange, search}: Props) => {
  
  return (
      <div className="relative border-2 border-solid rounded-lg">
        <div className="absolute top-0 bottom-0 left-0">
          <SearchIcon/>
        </div>
        <input value={search} onChange={(e) => handleChange(e)} type="text" placeholder="Tìm kiếm" className="pl-6 border-none outline-none rounded-lg w-full text-base"/>
      </div>
  )
}

export default Search