import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Form, FormControl, FormSelect, Row, Button } from 'react-bootstrap';
import { addCategory, addWidget, setSelectedCategoryIndex } from '../Redux/dashboardSlice';
import { useNavigate } from 'react-router-dom';

const ManageDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategoryIndex } = useSelector((state) => state.dashboard);

  const [categoryName, setCategoryName] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');

  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      dispatch(addCategory(categoryName));
      setCategoryName('');
    }
  };

  const handleAddWidget = () => {
    if (widgetTitle && selectedCategoryIndex >= 0) {
      dispatch(addWidget({
        title: widgetTitle,
        description: widgetDescription,
        categoryIndex: selectedCategoryIndex,
      }));
      setWidgetTitle('');
      setWidgetDescription('');
      navigate('/');
    }
  };

  return (
    <Container>
      <Row className="mb-3 mt-5 justify-content-center">
        <Col md={6}>
          <Form.Control
            style={{ maxWidth: '400px', margin: 'auto' }}
            type="text"
            placeholder="New Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="text-center mt-3">
            <Button onClick={handleAddCategory} className="w-20">
              Add Category
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mb-3 mt-3 justify-content-center">
        <Col md={6}>
          <FormSelect
            style={{ maxWidth: '400px', margin: 'auto' }}
            value={selectedCategoryIndex}
            onChange={(e) => dispatch(setSelectedCategoryIndex(Number(e.target.value)))}
          >
            <option value={-1}>Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={index}>
                {category}
              </option>
            ))}
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3 mt-3 justify-content-center">
        <Col md={6}>
          <FormControl
            type="text"
            placeholder="Widget Title"
            value={widgetTitle}
            onChange={(e) => setWidgetTitle(e.target.value)}
            style={{ maxWidth: '400px', margin: 'auto' }}
          />
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <FormControl
            type="text"
            placeholder="Widget Description"
            value={widgetDescription}
            onChange={(e) => setWidgetDescription(e.target.value)}
            style={{ maxWidth: '400px', margin: 'auto' }}
          />
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <Button onClick={handleAddWidget} className="w-20">
              Add Widget
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageDashboard;