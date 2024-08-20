import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from "flowbite-react";
import Dropdown from 'react-bootstrap/Dropdown';
import { LuRefreshCcw } from 'react-icons/lu';
import { CiMenuKebab } from 'react-icons/ci';
import { MdAccessTimeFilled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Category from '../components/Category';
import { deleteCategory, deleteWidget } from '../Redux/dashboardSlice';
import { useEffect, useState } from 'react';
import { Button, Drawer } from "flowbite-react";

const Dashboard = ({ searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { widgets, categories } = useSelector((state) => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedWidgets, setCheckedWidgets] = useState({});

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
    console.log('Deleting widget with ID:', widgetId);
    dispatch(deleteWidget(widgetId));
  };
  const handleDeleteCategory = (index) => dispatch(deleteCategory(index));

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
    console.log('Checked Widgets before Confirm:', checkedWidgets);

   
    const widgetsToRemove = Object.keys(checkedWidgets[categoryIndex] || {})
      .filter(widgetId => !checkedWidgets[categoryIndex][widgetId])
      .map(widgetId => parseInt(widgetId, 10));

    
    widgetsToRemove.forEach(widgetId => dispatch(deleteWidget(widgetId)));

   
    setIsOpen(false);
  };

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

 
  const groupedWidgets = categories.map((_, index) =>
    widgets.filter(
      (widget) =>
        widget.categoryIndex === index &&
        (widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className='bg-slate-200'>
      <div className={"d-flex justify-content-between align-items-center mt-2 main px-4"}>
        <h3 className="mb-0 text-2xl">CNAPP Dashboard</h3>
        <div className="d-flex align-items-center gap-3">
          <div className="flex min-h-[20vh] items-center justify-center">
            <Button gradientDuoTone="greenToBlue" onClick={() => setIsOpen(true)}>Filter Widget</Button>
          </div>
          <Drawer open={isOpen} onClose={handleClose} position="right" style={{ width: '600px' }}>
            <Drawer.Header title="Filter Widgets" />
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
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button onClick={() => handleConfirmChanges(index)} gradientDuoTone="greenToBlue">
                      Confirm
                    </Button>
                    <Button onClick={handleCancelChanges} variant="outline-secondary">
                      Cancel
                    </Button>
                  </div>
                </Tabs.Item>
              ))}
            </Tabs>
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

      {categories.map((category, index) => (
        <Category
          key={index}
          category={{ name: category }}
          widgets={groupedWidgets[index]}
          onAddWidget={handleAddWidget}
          onDeleteCategory={() => handleDeleteCategory(index)}
          onDeleteWidget={handleDeleteWidget}
        />
      ))}
    </div>
  );
};

export default Dashboard;