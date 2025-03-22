import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Background from "../components/BackgroundAnimation";

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: [],
    location: "",
    salaryRange: "",
  });
  const [currentSkill, setCurrentSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.salaryRange
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:9001/api/jobs/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Job posted successfully!");
        navigate("/recruiter-dashboard");
      } else {
        toast.error(data.message || "Failed to post job.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    const skill = currentSkill.trim();
    if (skill && !formData.skillsRequired.includes(skill)) {
      setFormData({
        ...formData,
        skillsRequired: [...formData.skillsRequired, skill],
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skillsRequired: formData.skillsRequired.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden pt-20">
      <Background />

      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 relative z-10 flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-br-full opacity-50"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-bl-full opacity-50"></div>

        <h2 className="text-3xl font-bold mb-4 text-pink-400 relative z-20 text-center w-full">
          Post New Job
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 relative z-20 w-full flex flex-col items-center"
        >
          <div className="w-full">
            <label className="block text-gray-300 mb-1 text-sm">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Software Engineer"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none text-sm"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 mb-1 text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed job description..."
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none h-24 resize-none text-sm"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 mb-1 text-sm">
              Skills Required
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Enter skill"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none text-sm"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-pink-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="w-full">
            <label className="block text-gray-300 mb-1 text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Remote"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none text-sm"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 mb-1 text-sm">
              Salary Range
            </label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={(e) =>
                setFormData({ ...formData, salaryRange: e.target.value })
              }
              placeholder="₹8,00,000 per year"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition-all shadow-md shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
