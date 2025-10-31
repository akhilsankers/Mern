import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //  allow sending/receiving cookies
});

//  Register user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  console.log("Response:", response);
  return response;
};

//  Login user
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  console.log("Response:", response);
  return response;
};

//profile
export const getUserProfile = async () => {
  const response = await api.get("/auth/profile");
  console.log("Profile Response:", response);
  return response.data;
}

//  Logout user 
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
}

//Get all jobs
export const getAllJobs = async (filters) => {
    const response = await api.get("/jobs", { params: filters });
    return response.data;
}

// create new job
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Get jobs posted by the logged-in employer
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my/jobs", {
    
  });
  return response.data;
};

// update job
export const updateJob = async (jobid, jobData) => {
    const responce = await api.put(`/jobs/${jobid}`, jobData);
    return responce.data;
}

//Delete Jobs

export const deleteJob = async(jobid)=> {
    const responce = await api.delete(`/jobs/${jobid}`);
    return responce.data;
}

// Apply for Job
export const applyForJob = async (formData) => {
  try {
    const { data } = await api.post("/applications/apply", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, message: error.response?.data?.message || "Error" };
  }
};

//get my applications
export const getMyApplications = async () => {
    const responce = await api.get("/applications/my");
    console.log("My Applications Response:", responce);
    return responce.data;
}

//  Get all applications for a specific job (Employer only)
export const getApplicationsByJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  console.log("Applications by Job Response:", response);
  return response.data;
};

// Update application statujs
export const updateApplicationStatus = async (id, status) => {
  const responce = await api.put(`/applications/${id}/status`, { status });
  console.log("Updated responce:", responce);
  return responce.data;

};

export default api;
