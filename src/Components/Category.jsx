import { Button, Row, Col, Card } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const Category = ({
  category,
  widgets,
  onAddWidget,
  onDeleteCategory,
  onDeleteWidget,
}) => {
    console.log('Widgets:', widgets);
  const numberOfEmptyCards = 3 - Math.min(3, widgets.length);
  const combinedItems = [
    ...widgets,
    ...Array.from({ length: numberOfEmptyCards }).map(() => ({ empty: true })),
  ];

  const sliceArray = (array, arraySize) => {
    const result = [];
    for (let i = 0; i < array.length; i += arraySize) {
      result.push(array.slice(i, i + arraySize));
    }
    return result;
  };

  return (
    <div className={"mb-4"}>
      <div className="d-flex justify-content-between align-items-center px-5">
        <h4>{category.name}</h4>
        <Button variant="outline-danger" onClick={onDeleteCategory}>
          <IoClose />
        </Button>
      </div>

      {sliceArray(combinedItems, 3).map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-3 px-3">
          {row.map((item, itemIndex) => (
            <Col key={itemIndex} md={4} className="mb-2">
              {item.empty ? (
                <Card className="empty">
                  <Card.Body>
                    <Button
                      className="button"
                      variant="outline-secondary"
                      style={{ color: "black" }}
                      onClick={onAddWidget}
                    >
                      + Add Widget
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Title>{item.title}</Card.Title>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                        console.log('Widget ID:', item.id);
                        onDeleteWidget(item.id)
                    }}
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
};

export default Category;
