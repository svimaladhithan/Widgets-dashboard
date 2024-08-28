import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Button, Drawer } from "flowbite-react";
import Dropdown from 'react-bootstrap/Dropdown';
import { LuRefreshCcw } from 'react-icons/lu';
import { CiMenuKebab } from 'react-icons/ci';
import { MdAccessTimeFilled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deleteCategory, deleteWidget } from '../Redux/dashboardSlice';
import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';

// Dashboard component with props for searchTerm
const Dashboard = ({ searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { widgets, categories } = useSelector((state) => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedWidgets, setCheckedWidgets] = useState({});

  // Initialize checkedWidgets when categories change
  useEffect(() => {
    const initialCheckedWidgets = {};
    categories.forEach((_, index) => {
      initialCheckedWidgets[index] = {};
    });
    setCheckedWidgets(initialCheckedWidgets);
  }, [categories]);

  const handleClose = () => setIsOpen(false);
  const handleAddWidget = () => navigate('/manage');
  const handleDeleteWidget = (widgetId) => {
    //console.log('Deleting widget with ID:', widgetId);
    dispatch(deleteWidget(widgetId));
  };
  const handleDeleteCategory = (index) => dispatch(deleteCategory(index));

  // Toggle widget selection state
  const handleCheckboxChange = (widgetId, categoryIndex) => {
    setCheckedWidgets(prev => ({
      ...prev,
      [categoryIndex]: {
        ...prev[categoryIndex],
        [widgetId]: !prev[categoryIndex]?.[widgetId]
      }
    }));
  };

  const handleConfirmChanges = (categoryIndex) => {
    const widgetsToRemove = Object.keys(checkedWidgets[categoryIndex] || {})
      .filter(widgetId => !checkedWidgets[categoryIndex][widgetId])
      .map(widgetId => parseInt(widgetId, 10));

    widgetsToRemove.forEach(widgetId => dispatch(deleteWidget(widgetId)));
    setIsOpen(false);
  };

    // Revert changes and close the drawer
  const handleCancelChanges = () => {
    setCheckedWidgets(prev => {
      const updatedCheckedWidgets = {};
      categories.forEach((_, index) => {
        updatedCheckedWidgets[index] = { ...prev[index] };
      });
      return updatedCheckedWidgets;
    });
    setIsOpen(false); 
  };

    // Group widgets by category and filter based on searchTerm
  const groupedWidgets = categories.map((_, index) =>
    widgets.filter(
      (widget) =>
        widget.categoryIndex === index &&
        (widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  
  //function to split array into chunks of a given size
  const sliceArray = (array, arraySize) => {
    const result = [];
    for (let i = 0; i < array.length; i += arraySize) {
      result.push(array.slice(i, i + arraySize));
    }
    return result;
  };

  return (
    <div className='bg-slate-200'>
      <div className={"d-flex flex-col flex-md-row justify-content-between align-items-center main px-md-4"}>
        <h3 className="mb-0 mb-md-0 text-2xl">CNAPP Dashboard</h3>
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          <div className="flex min-h-[20vh] items-center justify-center">
            <Button gradientDuoTone="greenToBlue" onClick={() => setIsOpen(true)}>Filter Widget</Button>
          </div>
          <Drawer open={isOpen} onClose={handleClose} position="right" className="drawer-container">
            <Drawer.Header title="Filter Widgets" />
            <div className="drawer-content">
            <Tabs aria-label="Category Tabs" variant="pills">
              {categories.map((category, index) => (
                <Tabs.Item key={index} title={category}>
                  {groupedWidgets[index].map((widget) => (
                    <div key={widget.id} className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        checked={!!checkedWidgets[index]?.[widget.id]}
                        onChange={() => handleCheckboxChange(widget.id, index)}
                        className="me-2"
                      />
                      <span>{widget.title}</span>
                    </div>
                  ))}
                  <div className="button-container">
                    <Button onClick={() => handleConfirmChanges(index)} gradientDuoTone="greenToBlue">
                      Confirm
                    </Button>
                    <Button onClick={handleCancelChanges} color="gray">
                      Cancel
                    </Button>
                  </div>
                </Tabs.Item>
              ))}
            </Tabs>
            </div>
          </Drawer>
          <Button gradientDuoTone="greenToBlue" onClick={handleAddWidget}>
            Add Widget +
          </Button>
          <Button variant="outline-secondary">
            <LuRefreshCcw style={{ height: '20px' }} />
          </Button>
          <Button variant="outline-secondary">
            <CiMenuKebab style={{ height: '20px' }} />
          </Button>
          <Dropdown>
            <Dropdown.Toggle style={{ backgroundColor: 'white', color: 'black', borderColor: 'black' }} id="dropdown-basic" className='d-flex align-items-center'>
              <MdAccessTimeFilled className="align-items-center me-2" size={20} />
              Last 2 days
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      </div>

      {categories.map((category, index) => {
        const widgets = groupedWidgets[index];
        const numberOfEmptyCards = 3 - Math.min(3, widgets.length);  // Calculate number of empty cards to display
        const combinedItems = [
          ...widgets,
          ...Array.from({ length: numberOfEmptyCards }).map(() => ({ empty: true })),
        ];

        return (
          <div key={index} className={"mb-4"}>
            <div className="d-flex justify-content-between align-items-center px-5">
              <h4>{category}</h4>
              <Button style={{'backgroundColor': 'transparent'}} onClick={() => handleDeleteCategory(index)}>
                <IoClose style={{color:'red'}} size={20}/>
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
                            color="gray"
                            onClick={handleAddWidget}
                          >
                            + Add Widget
                          </Button>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card>
                        <Card.Title>{item.title}</Card.Title>
                        <Button style={{backgroundColor: 'transparent', border: 'none'}}
                         
                          onClick={() => {
                           
                            handleDeleteWidget(item.id);
                          }}
                          className="delete"
                        >
                          <IoClose style={{color:'red'}} size={15}/>
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