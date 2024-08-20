import { TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";


const Search = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <form>
        <TextInput
          type="text"
          placeholder="Search widgets...."
          rightIcon={AiOutlineSearch}
          onChange={handleSearchChange}
          style={{ width: '400px' }}
        />
      </form>
  );
};

export default Search;
