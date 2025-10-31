import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import ViewApplicants from "../Pages/ViewApplicats";
import CreateJobModal from "../components/CreateJobModal";
import EditJobModal from "../components/EditJobModal";
import { getMyJobs, deleteJob } from "../api/api"; // ✅ Added deleteJob
import toast from "react-hot-toast";

function Dashboard() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null); // For viewing applicants
  const [selectedJobForEdit, setSelectedJobForEdit] = useState(null); // For editing
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // === Fetch Employer's Jobs ===
  const fetchJobs = async () => {
    try {
      const response = await getMyJobs();
      if (response.success) {
        setPostedJobs(response.data);
      } else {
        toast.error("Failed to load jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Something went wrong while fetching jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // === Handle New Job Creation ===
  const handleJobCreated = () => {
    fetchJobs();
  };

  // === Handle Job Deletion ===
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await deleteJob(jobId);
      if (res.success) {
        toast.success("Job deleted successfully");
        fetchJobs();
      } else {
        toast.error(res.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Something went wrong while deleting the job");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Employer Dashboard</h2>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            + Create Job
          </Button>
        </div>

        {!selectedJobId ? (
          // === JOB LIST VIEW ===
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {postedJobs.length === 0 ? (
              <p className="text-muted text-center mt-4">No jobs posted yet.</p>
            ) : (
              postedJobs.map((job) => (
                <Card
                  key={job._id}
                  className="shadow-sm border-0"
                  style={{ width: "22rem" }}
                >
                  <Card.Body>
                    <Card.Title className="fw-semibold text-dark">
                      {job.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company} • {job.location}
                    </Card.Subtitle>
                    <Card.Text className="text-secondary small mb-3">
                      <strong>Type:</strong> {job.type} <br />
                      <strong>Category:</strong> {job.category}
                    </Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setSelectedJobId(job._id)}
                      >
                        View Applicants
                      </Button>

                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          setSelectedJobForEdit(job);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        ) : (
          // === APPLICANTS VIEW ===
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="mb-3"
              onClick={() => setSelectedJobId(null)}
            >
              ← Back to Jobs
            </Button>
            <ViewApplicants jobId={selectedJobId} />
          </div>
        )}
      </div>

      {/* === Create Job Modal === */}
      <CreateJobModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onJobCreated={handleJobCreated}
      />

      {/* === Edit Job Modal === */}
      <EditJobModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        job={selectedJobForEdit}
        onJobUpdated={fetchJobs}
      />
    </>
  );
}

export default Dashboard;
