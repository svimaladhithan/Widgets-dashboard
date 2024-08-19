import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import {
  addCategory,
  addWidget,
  setSelectedCategoryIndex,
} from "../Redux/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const ManageDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategoryIndex } = useSelector(
    (state) => state.dashboard
  );

  const [categoryName, setCategoryName] = useState("");
  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetDescription, setWidgetDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(setSelectedCategoryIndex(-1));
  }, [categories, dispatch]);

  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      dispatch(addCategory(categoryName));
      setCategoryName("");
    }
  };

  const handleAddWidget = () => {
    let formErrors = {};
    if (!widgetTitle) {
      formErrors.widgetTitle = "Widget title is required";
    }
    if (!widgetDescription) {
      formErrors.widgetDescription = "Widget description is required";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (widgetTitle && selectedCategoryIndex >= 0) {
      dispatch(
        addWidget({
          title: widgetTitle,
          description: widgetDescription,
          categoryIndex: selectedCategoryIndex,
        })
      );
      setWidgetTitle("");
      setWidgetDescription("");
      navigate("/");
    }
  };

  return (
    <Container>
      <Row className="mb-3 mt-5 justify-content-center">
        <Col md={6}>
          <div className="input">
            <Form.Control
              style={{ maxWidth: "500px", margin: "auto" }}
              type="text"
              placeholder="New Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="text-center mt-3">
              <Button
                onClick={handleAddCategory}
                className="w-30"
                gradientDuoTone="greenToBlue"
              >
                Add Category
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3 mt-3 justify-content-center">
        <Col md={6}>
          <FormSelect
            style={{ maxWidth: "500px", margin: "auto" }}
            value={selectedCategoryIndex}
            onChange={(e) =>
              dispatch(setSelectedCategoryIndex(Number(e.target.value)))
            }
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
            onChange={(e) => {
              setWidgetTitle(e.target.value);
              if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, widgetTitle: "" }));
              }
            }}
            isInvalid={!!errors.widgetTitle}
            style={{ maxWidth: "500px", margin: "auto" }}
          />
          {errors.widgetTitle && (
            <Form.Control.Feedback type="invalid">
              {errors.widgetTitle}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <FormControl
            type="text"
            placeholder="Widget Description"
            value={widgetDescription}
            onChange={(e) => {
              setWidgetDescription(e.target.value);
              if (e.target.value) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  widgetDescription: "",
                }));
              }
            }}
            isInvalid={!!errors.widgetDescription}
            style={{ maxWidth: "500px", margin: "auto" }}
          />
          {errors.widgetDescription && (
            <Form.Control.Feedback type="invalid">
              {errors.widgetDescription}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <div className="input">
            <div className="text-center">
              <Button
                onClick={handleAddWidget}
                className="w-30"
                gradientDuoTone="greenToBlue"
              >
                Add Widget
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageDashboard;
