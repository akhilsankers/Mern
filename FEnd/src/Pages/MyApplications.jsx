import React, { useEffect, useState } from "react";
import { getMyApplications } from "../api/api";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications();
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;

  if (applications.length === 0)
    return <p className="text-center mt-10">You haven't applied for any jobs yet.</p>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Applications ({applications.length})
        </h2>

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold">{app.job?.title}</h3>
              <p className="text-gray-700">
                <strong>Company:</strong> {app.job?.company}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {app.job?.location}
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong> {app.message}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {app.email}
              </p>
              <p className={`fw-semibold ${app.status === "accepted"
                  ? "text-success"
                  : app.status === "rejected"
                    ? "text-danger"
                    : "text-warning"
                }`}>
                <strong>Status:</strong>{" "}
                {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyApplications;
