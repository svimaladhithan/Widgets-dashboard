import { useDispatch, useSelector } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import { LuRefreshCcw } from 'react-icons/lu';
import { CiMenuKebab } from 'react-icons/ci';
import { MdAccessTimeFilled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Category from '../components/Category';
import { deleteCategory, deleteWidget } from '../Redux/dashboardSlice';
import { useState } from 'react';
import { Button, Drawer } from "flowbite-react";

const Dashboard = ({ searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { widgets, categories } = useSelector((state) => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleAddWidget = () => navigate('/manage');
  const handleDeleteWidget = (index) => dispatch(deleteWidget(index));
  const handleDeleteCategory = (index) => dispatch(deleteCategory(index));

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
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Drawer" />
      </Drawer>
          <Button  gradientDuoTone="greenToBlue" onClick={handleAddWidget}>
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