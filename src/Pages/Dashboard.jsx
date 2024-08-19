import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { LuRefreshCcw } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import { MdAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { deleteCategory, deleteWidget } from "../Redux/dashboardSlice";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { widgets, categories } = useSelector((state) => state.dashboard);

  const handleClick = () => {
    navigate("/manage");
  };

  // Group widgets by category index
  const groupedWidgets = categories.map((_, index) =>
    widgets.filter((widget) => widget.categoryIndex === index)
  );

  // Function to split items into rows of up to 3 items
  const sliceArray = (array, arraySize) => {
    const result = [];
    for (let i = 0; i < array.length; i += arraySize) {
      result.push(array.slice(i, i + arraySize));
    }
    return result;
  };

  const handleDelete = (index) => {
    dispatch(deleteWidget(index));
  };

  const handleDeleteCategory = (index) => {
    dispatch(deleteCategory(index));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2 main">
        <h3 className="mb-0">CNAPP Dashboard</h3>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            style={{ color: "black" }}
            onClick={handleClick}
          >
            Add Widget +
          </Button>
          <Button variant="outline-secondary">
            <LuRefreshCcw style={{ color: "black" }} />
          </Button>
          <Button variant="outline-secondary">
            <CiMenuKebab style={{ color: "black" }} />
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "white",
                color: "black",
                borderColor: "black",
              }}
              id="dropdown-basic"
            >
              <MdAccessTimeFilled
                className="align-items-center me-2"
                size={20}
              />
              Last 2 days
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Last week</Dropdown.Item>
              <Dropdown.Item href="#">Last 30 days</Dropdown.Item>
              <Dropdown.Item href="#">Last month</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {categories.map((category, index) => {
        const widgetsInCategory = groupedWidgets[index];
        const numberOfEmptyCards = 3 - Math.min(3, widgetsInCategory.length);

        // Combine widgets with empty cards
        const combinedItems = [
          ...widgetsInCategory,
          ...Array.from({ length: numberOfEmptyCards }).map((_, i) => ({
            empty: true,
          })),
        ];

        return (
          <div key={index} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4>{category}</h4>
              <Button
                onClick={() => handleDeleteCategory(index)}
                variant="outline-danger"
                className="delete-category"
              >
                <IoClose />
              </Button>
            </div>

            {sliceArray(combinedItems, 3).map((row, rowIndex) => (
              <Row key={rowIndex} className="mb-3">
                {row.map((item, itemIndex) => (
                  <Col key={itemIndex} md={4} className="mb-2">
                    {item.empty ? (
                      <Card className="empty">
                        <Card.Body>
                          <Button
                            className="button"
                            variant="outline-secondary"
                            style={{ color: "black" }}
                            onClick={handleClick}
                          >
                            + Add Widget
                          </Button>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card>
                        <Card.Header>{item.title}</Card.Header>
                        <Button
                          onClick={() => handleDelete(itemIndex)}
                          variant="outline-secondary"
                          className="delete"
                        >
                          <IoClose />
                        </Button>
                        <Card.Body>
                          <Card.Text>{item.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
