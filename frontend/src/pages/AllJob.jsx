import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Background from "../components/BackgroundAnimation";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const mockJobs = [
    { id: 1, position: "Software Engineer", company: "Tech Corp", location: "New York, NY", salary: "$120,000 - $150,000", experience: "3+ years", type: "Full-time", posted: "2d ago" },
    { id: 2, position: "Product Manager", company: "Innovate Inc", location: "Remote", salary: "$100,000 - $130,000", experience: "5+ years", type: "Contract", posted: "1w ago" },
    { id: 3, position: "Data Analyst", company: "DataWave", location: "San Francisco, CA", salary: "$90,000 - $110,000", experience: "2+ years", type: "Full-time", posted: "3d ago" },
    { id: 4, position: "UX Designer", company: "Creative Minds", location: "Remote", salary: "$85,000 - $105,000", experience: "4+ years", type: "Part-time", posted: "5d ago" },
    { id: 5, position: "DevOps Engineer", company: "CloudNet", location: "Seattle, WA", salary: "$110,000 - $140,000", experience: "3+ years", type: "Full-time", posted: "1w ago" },
    { id: 6, position: "AI Researcher", company: "DeepMind", location: "Boston, MA", salary: "$130,000 - $160,000", experience: "5+ years", type: "Full-time", posted: "2w ago" }
  ];

  useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApply = (jobId) => {
    if (!user) {
      toast.error("Please login to apply for jobs");
      return;
    }
    toast.success("Application submitted successfully!");
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
        <Background />
      <div className="max-w-7xl w-full px-6">
        
        {/* Updated Heading with Gradient Color */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-center mb-8">
          All Job
        </h1>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search jobs by position, company, or location..."
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 border border-purple-500 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow w-full max-w-md"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{job.position}</h2>
                  <p className="text-purple-400 text-lg mb-4">{job.company}</p>

                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      {job.experience} experience
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">⏱️</span>
                      {job.type}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{job.posted}</span>
                  <div className="space-x-3">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Explore
                    </Link>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center text-gray-400 text-xl mt-12">
            No jobs found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
