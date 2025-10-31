import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import JobCard from '../components/JobCard.jsx';
import JobDetail from './JobDetail.jsx';
import { getAllJobs } from '../api/api.js';

function Home() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const limit = 6; // jobs per page

  // Fetch jobs whenever filters or page change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const params = {
          q: filter,
          type,
          location,
          category,
          page: currentPage,
          limit,
        };

        const data = await getAllJobs(params);
        setJobs(data.data || []);
        setTotalJobs(data.total || 0);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filter, type, location, category, currentPage]);

  const totalPages = Math.ceil(totalJobs / limit);

  return (
    <>
      {/* Header */}
      <div className="sticky-top bg-white shadow-sm z-3">
        <Header />
      </div>

      <div className="container-fluid py-3" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="row h-100">
          {/* Job List Section */}
          <div
            className={`col-md-6 border-end overflow-auto p-3 ${
              selectedJob ? 'd-none d-md-block' : 'd-block'
            }`}
            style={{ maxHeight: '100%' }}
          >
            {/* Filter Inputs */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search jobs..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ flex: '1' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ flex: '1' }}
              />
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ flex: '1' }}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center text-muted mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-danger mt-5">
                <h5>{error}</h5>
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {jobs.map((job) => (
                    <div key={job._id} onClick={() => setSelectedJob(job)} style={{ cursor: 'pointer' }}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`btn btn-sm ${
                        currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-muted mt-5">
                <h5>No jobs found</h5>
              </div>
            )}
          </div>

          {/* Job Detail Section */}
          <div
            className={`col-md-6 overflow-auto p-4 ${
              selectedJob ? 'd-block' : 'd-none d-md-block'
            }`}
            style={{ maxHeight: '100%' }}
          >
            {selectedJob ? (
              <>
                <button
                  className="btn btn-outline-secondary mb-3 d-md-none"
                  onClick={() => setSelectedJob(null)}
                >
                  ← Back to Jobs
                </button>
                <JobDetail job={selectedJob} />
              </>
            ) : (
              <div className="text-center text-muted mt-5">
                <h5>Select a job to view details</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
