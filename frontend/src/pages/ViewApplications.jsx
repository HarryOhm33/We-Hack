import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Background from "../components/BackgroundAnimation";

const ViewApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticating } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticating) return;

    if (!user || user?.role !== "recruiter") {
      navigate("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:9001/api/jobs/${jobId}/applications`,
          { credentials: "include" }
        );

        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, user, navigate, isAuthenticating]);

  if (isAuthenticating || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Background />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-800"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-pink-400">
              Applications Received
            </h1>
            <button
              onClick={() => navigate("/recruiter-dashboard")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              Back to Dashboard
            </button>
          </div>

          {error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : applications.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No applications received yet
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {applications.map((application) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-2xl font-bold text-white">
                        {application.candidate.name}
                      </h2>
                      <p className="text-purple-400">
                        {application.candidate.email}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        application.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : application.status === "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-pink-400 mb-2">
                        Cover Letter
                      </h3>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {application.coverLetter}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <span className="text-purple-400">Applied:</span>{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="text-purple-400">Last Updated:</span>{" "}
                        {new Date(application.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ViewApplications;
