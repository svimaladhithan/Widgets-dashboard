import Form from "react-bootstrap/Form";

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Form className={"d-flex align-items-center"}>
      <Form.Control
        type="text"
        placeholder="Search anything..."
        aria-label="Search"
        onChange={handleSearchChange}
      />
    </Form>
  );
};

export default SearchBar;
