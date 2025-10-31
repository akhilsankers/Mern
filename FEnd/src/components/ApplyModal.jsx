import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { applyForJob } from "../api/api";
import { useUser } from "../context/UserContext";

const ApplyModal = ({ show, onClose, job }) => {
  const { user, loading: userLoading } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill user info when modal opens
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user, show]);

  if (!job) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message, resume } = formData;

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    if (!name || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("jobId", job._id);
      form.append("name", name);
      form.append("email", email);
      form.append("message", message);
      form.append("resume", resume);

      const res = await applyForJob(form);

      if (res.success) {
        toast.success("Application submitted successfully!");
        setFormData({ name: "", email: "", message: "", resume: null });
        onClose();
      } else {
        toast.error(res.message || "Failed to apply for job");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while applying");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for {job.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Editable Name and Email */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Message */}
          <Form.Group className="mb-3">
            <Form.Label>Why are you a good fit for this role?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              placeholder="Write a short message..."
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Resume Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Resume (PDF / DOCX)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={onClose}
              className="me-2"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyModal;
