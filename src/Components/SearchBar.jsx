import { TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";


const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <form>
        <TextInput
          type="text"
          placeholder="Search widgets...."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          onChange={handleSearchChange}
        />
      </form>
  );
};

export default SearchBar;
