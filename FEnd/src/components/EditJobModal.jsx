import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateJob } from "../api/api"; // you’ll create this API call
import toast from "react-hot-toast";

const EditJobModal = ({ show, onClose, job, onJobUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    category: "",
    description: "",
    salaryRange: "",
  });

  // Prefill form when job data changes
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        type: job.type || "",
        category: job.category || "",
        description: job.description || "",
        salaryRange: job.salaryRange || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateJob(job._id, formData);
      if (res.success) {
        toast.success("Job updated successfully!");
        onClose();
        onJobUpdated(); // refresh job list
      } else {
        toast.error(res.message || "Failed to update job");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. ₹50,000 - ₹70,000"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Job
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobModal;
