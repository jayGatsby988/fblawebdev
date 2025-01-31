'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaLocationArrow, FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaBriefcase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Redirect } from "next";
import { redirect } from "next/navigation";

const jobs = [
  {
    id: 1,
    title: "Executive Assistant",
    company: "Ditto",
    location: "Atlanta Metropolitan Area",
    timePosted: "2 hours ago",
    isRemote: false,
    salary: "$50,000 - $70,000",
    description: "Assist executives in daily tasks and schedule management. Coordinate meetings, handle sensitive information, and provide logistical support."
  },
  {
    id: 2,
    title: "Learning Content Manager",
    company: "LinkedIn",
    location: "Sunnyvale, CA",
    timePosted: "41 minutes ago",
    isRemote: true,
    salary: "$80,000 - $100,000",
    description: "Manage and develop learning content for the platform. Oversee a team of content creators, analyze user engagement, and implement educational strategies."
  },
  {
    id: 3,
    title: "Receptionist",
    company: "Britannia Hotels Ltd",
    location: "Location, WV",
    timePosted: "1 hour ago",
    isRemote: false,
    salary: "$30,000 - $40,000",
    description: "Manage front desk operations and customer queries. Greet visitors, maintain records, and ensure smooth communication within the organization."
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    timePosted: "3 hours ago",
    isRemote: true,
    salary: "$120,000 - $150,000",
    description: "Develop and maintain scalable software solutions. Collaborate with cross-functional teams to design and implement new features."
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Apple",
    location: "Cupertino, CA",
    timePosted: "5 hours ago",
    isRemote: false,
    salary: "$70,000 - $90,000",
    description: "Plan and execute marketing campaigns. Analyze market trends, manage social media accounts, and coordinate with external partners."
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Amazon",
    location: "Seattle, WA",
    timePosted: "6 hours ago",
    isRemote: true,
    salary: "$90,000 - $110,000",
    description: "Analyze large datasets to provide actionable insights. Create reports, build dashboards, and support decision-making processes."
  },
  {
    id: 7,
    title: "Graphic Designer",
    company: "Adobe",
    location: "San Jose, CA",
    timePosted: "4 hours ago",
    isRemote: false,
    salary: "$60,000 - $80,000",
    description: "Create visual content for digital and print media. Collaborate with the marketing team to design engaging graphics and layouts."
  },
  {
    id: 8,
    title: "Product Manager",
    company: "Microsoft",
    location: "Redmond, WA",
    timePosted: "7 hours ago",
    isRemote: true,
    salary: "$130,000 - $160,000",
    description: "Lead product development from concept to launch. Work with engineering, design, and marketing teams to deliver high-quality products."
  },
  {
    id: 9,
    title: "Customer Support Representative",
    company: "Zendesk",
    location: "San Francisco, CA",
    timePosted: "8 hours ago",
    isRemote: true,
    salary: "$45,000 - $55,000",
    description: "Provide exceptional customer service and resolve issues. Communicate with customers via phone, email, and chat to ensure satisfaction."
  },
  {
    id: 10,
    title: "HR Coordinator",
    company: "Netflix",
    location: "Los Gatos, CA",
    timePosted: "9 hours ago",
    isRemote: false,
    salary: "$65,000 - $85,000",
    description: "Support HR operations and employee relations. Manage recruitment processes, onboarding, and employee records."
  },
  {
    id: 11,
    title: "Sales Associate",
    company: "Tesla",
    location: "Palo Alto, CA",
    timePosted: "10 hours ago",
    isRemote: false,
    salary: "$50,000 - $70,000",
    description: "Assist customers in purchasing vehicles and related products. Provide product knowledge and ensure a seamless buying experience."
  },
  {
    id: 12,
    title: "UX/UI Designer",
    company: "Figma",
    location: "San Francisco, CA",
    timePosted: "11 hours ago",
    isRemote: true,
    salary: "$100,000 - $130,000",
    description: "Design intuitive and user-friendly interfaces. Conduct user research, create wireframes, and collaborate with developers."
  },
  {
    id: 13,
    title: "Financial Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    timePosted: "12 hours ago",
    isRemote: false,
    salary: "$85,000 - $105,000",
    description: "Analyze financial data and prepare reports. Support budgeting, forecasting, and investment decisions."
  },
  {
    id: 14,
    title: "Content Writer",
    company: "HubSpot",
    location: "Cambridge, MA",
    timePosted: "13 hours ago",
    isRemote: true,
    salary: "$55,000 - $75,000",
    description: "Create engaging content for blogs, websites, and marketing materials. Research topics and optimize content for SEO."
  },
  {
    id: 15,
    title: "DevOps Engineer",
    company: "GitLab",
    location: "Remote",
    timePosted: "14 hours ago",
    isRemote: true,
    salary: "$110,000 - $140,000",
    description: "Manage and optimize CI/CD pipelines. Automate infrastructure and ensure system reliability and scalability."
  },
];

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    remote: false,
    salaryRange: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.location ? job.location.includes(filters.location) : true) &&
      (filters.remote ? job.isRemote === true : true) &&
      (filters.salaryRange ? job.salary.includes(filters.salaryRange) : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex mt-20 ">
      {/* Sidebar Filters */}
      <aside className="w-[18%] bg-white p-6 shadow-lg h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="">Location</option>
          <option value="Atlanta Metropolitan Area">Atlanta</option>
          <option value="Sunnyvale, CA">Sunnyvale</option>
        </select>
        <select
          value={filters.salaryRange}
          onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="">Salary Range</option>
          <option value="$50,000 - $70,000">$50,000 - $70,000</option>
        </select>
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Remote</span>
        </label>
      </aside>

      

      {/* Job List */}
      <div className="w-[25%] p-4 bg-white shadow-lg h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 overflow-y-hidden">Job Listings</h2>
        <ScrollArea>
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${
                  selectedJob?.id === job.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600 flex items-center gap-2"><FaBuilding /> {job.company}</p>
                <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> {job.location}</p>
                <p className="text-gray-600 flex items-center gap-2"><FaMoneyBillWave /> {job.salary}</p>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Job Preview */}
      <section className="w-[57%] p-6 bg-gray-100 shadow-md h-screen overflow-y-auto">
        {selectedJob ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white rounded-lg shadow-md space-y-4"
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="text-blue-600 mb-4 flex items-center"
            >
              &#8592; Back to job list
            </button>
            <h3 className="text-4xl font-bold mb-2">{selectedJob.title}</h3>
            <p className="text-gray-600 flex items-center text-lg"><FaBuilding className="mr-2" /> {selectedJob.company}</p>
            <p className="text-gray-600 flex items-center text-lg"><FaLocationArrow className="mr-2" /> {selectedJob.location}</p>
            <p className="text-gray-500 flex items-center text-lg"><FaMoneyBillWave className="mr-2" /> {selectedJob.salary}</p>
            <p className="text-gray-800 text-lg border-t pt-4">{selectedJob.description}</p>
            <div className="flex gap-4 pt-6">
              <span className="flex items-center gap-2 text-green-600 font-medium">
                {selectedJob.isRemote ? <FaCheckCircle /> : <FaTimesCircle />} {selectedJob.isRemote ? "Remote Available" : "On-site"}
              </span>
              <span className="flex items-center gap-2 text-gray-500">
                <FaClock /> {selectedJob.timePosted}
              </span>
            </div>
            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition" onClick = {()=> redirect("/submit")}>Apply Now</button>
          </motion.div>
        ) : (
          <div className="text-gray-500 text-center text-lg">Select a job to view details</div>
        )}
      </section>
    </div>
  );
}
