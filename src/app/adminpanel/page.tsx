"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Home,
  BarChart,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import db from "../firebase/firestore";
import { useAuth } from "../context/authcontext";
import { redirect } from "next/navigation";

// Dummy implementations of custom UI components
function Input(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
    />
  );
}

function Button(
  props: React.ComponentProps<"button"> & { variant?: string; size?: string }
) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md transition-all ${
        props.variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

// Dummy Toast hook
function useToast() {
  return {
    toast: ({ title, description }: { title: string; description: string }) => {
      console.log("approved");
    },
  };
}

// Types for the application
interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  status: "pending" | "approved" | "rejected";
  postedOn: Date;
}

// Create some dummy job postings
const fetchJobPostings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      if (data.status != "pending") {
        return;
      }
      console.log(data);
      return {
        id: doc?.id,
        title: data?.title || "Untitled",
        company: data?.company || "Unknown",
        location: data?.location || "Remote",
        experience: data?.experience || "0+ years",
        status: data?.status || "pending",
        postedOn:
          data.postedOn?.toDate().toISOString() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return [];
  }
};
const fetchUserByUid = async (uid) => {
  // Check if user data is already in localStorage
  const cachedUserData = localStorage.getItem("userData");
  if (cachedUserData) {
    return JSON.parse(cachedUserData);
  }

  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const userData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data?.fullName || "No Name",
        email: data?.email || "No Email",
        role: data?.role || "No Role",
        uid: data?.uid || "No UID",
      };
    })[0];

    // Cache user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
export default function JobPostingPanel() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [view, setView] = useState<"dashboard" | "analytics">("dashboard");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<{
    location: string;
    experience: string;
    status: string;
  }>({
    location: "",
    experience: "",
    status: "",
  });
  const { toast } = useToast();
  const { user } = useAuth();


  // Example usage with the UID
  console.log(user)
  const uid = user.uid;
  fetchUserByUid(uid).then((userData) => {
    console.log(userData);
      if (userData.role != "Counselor") {
        redirect("/");
      }
  });

  // Initialize job postings on the client side
  useEffect(() => {
    const loadJobPostings = async () => {
      const postings = await fetchJobPostings();
      setJobPostings(postings);
      console.log(postings);
    };

    loadJobPostings();
  }, []);

  // Filter job postings by search term (name only) and filters
  const filteredJobPostings = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return jobPostings
      .filter((posting) => posting && posting.title) // Ensure posting is defined
      .filter(
        (posting) =>
          posting.title.toLowerCase().includes(term) &&
          (filters.location ? posting.location === filters.location : true) &&
          (filters.experience
            ? posting.experience === filters.experience
            : true)
      );
  }, [jobPostings, debouncedSearch, filters]);

  const handleApprove = useCallback(
    async (id: string) => {
      try {
        const jobRef = doc(db, "jobs", id);
        await updateDoc(jobRef, { status: "approved" });

        setJobPostings((prev) => prev.filter((posting) => posting?.id !== id));
        toast({
          title: "Approved",
          description: "Job posting has been approved.",
        });
      } catch (error) {
        console.error("Error approving job:", error);
        toast({
          title: "Error",
          description: "Failed to approve the job.",
        });
      }
    },
    [toast]
  );

  const handleReject = useCallback(
    async (id: string) => {
      try {
        const jobRef = doc(db, "jobs", id);
        await updateDoc(jobRef, { status: "rejected" });

        setJobPostings((prev) => prev.filter((posting) => posting?.id !== id));
        toast({
          title: "Rejected",
          description: "Job posting has been rejected.",
        });
      } catch (error) {
        console.error("Error rejecting job:", error);
        toast({
          title: "Error",
          description: "Failed to reject the job.",
        });
      }
    },
    [toast]
  );
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Analytics data
  const analyticsData = useMemo(() => {
    const safeJobPostings = jobPostings.filter(
      (p) => p !== undefined && p !== null
    );

    const total = safeJobPostings.length;
    const approved = safeJobPostings.filter(
      (p) => p.status === "approved"
    ).length;
    const rejected = safeJobPostings.filter(
      (p) => p.status === "rejected"
    ).length;
    const pending = safeJobPostings.filter(
      (p) => p.status === "pending"
    ).length;

    // Data for graphs
    const statusData = [
      { name: "Approved", value: approved },
      { name: "Rejected", value: rejected },
      { name: "Pending", value: pending },
    ];

    const locationData = [
      {
        name: "New York",
        value: safeJobPostings.filter((p) => p.location === "New York").length,
      },
      {
        name: "San Francisco",
        value: safeJobPostings.filter((p) => p.location === "San Francisco")
          .length,
      },
      {
        name: "Remote",
        value: safeJobPostings.filter((p) => p.location === "Remote").length,
      },
    ];

    return { total, approved, rejected, pending, statusData, locationData };
  }, [jobPostings]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        {/* Sidebar (Visible in both Dashboard and Analytics views) */}
        <motion.div
          initial={{ width: 240 }}
          animate={{ width: 240 }}
          className="border-r border-gray-200 bg-white hidden md:block"
        >
          <div className="p-6 space-y-8 h-full flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">CC</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Admin Pannel</h1>
            </div>

            <nav className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setView("dashboard")}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  view === "dashboard" ? "bg-gray-100" : ""
                }`}
              >
                <Home className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Dashboard</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setView("analytics")}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  view === "analytics" ? "bg-gray-100" : ""
                }`}
              >
         
              </motion.div>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 overflow-hidden">
          {/* Top Bar with Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white border-gray-300"
              />
            </div>
            {view === "dashboard" && (
              <div className="flex items-center gap-4">
                <Button
                  variant="primary"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {filtersOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Filters Dropdown */}
          {view === "dashboard" && (
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-lg shadow p-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <select
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All</option>
                        <option>New York</option>
                        <option>San Francisco</option>
                        <option>Remote</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <select
                        value={filters.experience}
                        onChange={(e) =>
                          handleFilterChange("experience", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All</option>
                        <option>1+ years</option>
                        <option>2+ years</option>
                        <option>3+ years</option>
                        <option>4+ years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Dashboard View */}
          {view === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col"
            >
              <div className="overflow-y-auto flex-1">
                <table className="min-w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredJobPostings.map((posting) => (
                      <motion.tr
                        key={posting.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {posting.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {posting.company}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {posting.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {posting.experience}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleApprove(posting.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleReject(posting.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
