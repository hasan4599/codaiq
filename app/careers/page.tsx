"use client";

"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { motion } from "framer-motion";
import { useState } from "react";

const jobRoles = [
  {
    id: 1,
    title: "AI Full-Stack Engineer",
    category: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    gradient: "from-blue-500 to-cyan-400",
    icon: "🤖",
    responsibilities: [
      "Develop and optimize AI-powered web creation algorithms and machine learning models",
      "Build scalable full-stack applications integrating AI capabilities with modern web technologies",
      "Collaborate on AI model training, fine-tuning, and deployment for web generation tasks",
    ],
    requirements: [
      "5+ years experience in full-stack development with React, Node.js, and Python",
      "Strong background in machine learning, AI frameworks (TensorFlow, PyTorch), and model deployment",
      "Experience with cloud platforms (AWS, GCP) and containerization technologies",
    ],
  },
  {
    id: 2,
    title: "UI/UX + Editor Developer",
    category: "Design & Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    gradient: "from-purple-500 to-pink-400",
    icon: "🎨",
    responsibilities: [
      "Design and develop intuitive visual editors and drag-drop interfaces for web creation",
      "Create seamless user experiences that make AI-powered web building accessible to everyone",
      "Implement responsive design systems and component libraries for editor interfaces",
    ],
    requirements: [
      "4+ years experience in UI/UX design and frontend development with React/Vue",
      "Proven track record in building complex editor tools, design systems, or visual builders",
      "Strong portfolio demonstrating exceptional design skills and user-centered thinking",
    ],
  },
  {
    id: 3,
    title: "Prompt Engineer + QA",
    category: "AI & Quality",
    type: "Full-time",
    location: "Remote",
    gradient: "from-emerald-500 to-teal-400",
    icon: "🧠",
    responsibilities: [
      "Design and optimize prompts for AI models to generate high-quality web content and code",
      "Develop comprehensive QA frameworks for testing AI-generated outputs and user experiences",
      "Analyze and improve AI model performance through systematic prompt engineering techniques",
    ],
    requirements: [
      "3+ years experience in prompt engineering, AI model optimization, or QA automation",
      "Deep understanding of large language models, AI testing methodologies, and quality metrics",
      "Strong analytical skills with experience in A/B testing and performance optimization",
    ],
  },
  {
    id: 4,
    title: "DevOps + Hosting Admin",
    category: "Infrastructure",
    type: "Full-time",
    location: "Remote",
    gradient: "from-orange-500 to-red-400",
    icon: "⚙️",
    responsibilities: [
      "Manage and scale cloud infrastructure for AI model serving and web hosting services",
      "Implement CI/CD pipelines, monitoring systems, and automated deployment processes",
      "Optimize infrastructure costs while ensuring high availability and performance",
    ],
    requirements: [
      "4+ years experience in DevOps, cloud infrastructure (AWS, GCP, Azure), and containerization",
      "Expertise in Kubernetes, Docker, Terraform, and infrastructure-as-code practices",
      "Experience with AI model serving, high-traffic web hosting, and performance optimization",
    ],
  },
  {
    id: 5,
    title: "Technical Product Manager",
    category: "Product",
    type: "Full-time",
    location: "Remote / Hybrid",
    gradient: "from-indigo-500 to-blue-400",
    icon: "📊",
    responsibilities: [
      "Define product roadmap and strategy for AI-powered web creation tools and platforms",
      "Work closely with engineering teams to prioritize features and manage technical debt",
      "Analyze user feedback and market trends to drive product decisions and feature development",
    ],
    requirements: [
      "5+ years experience in technical product management, preferably in AI/ML or developer tools",
      "Strong understanding of web technologies, AI capabilities, and software development processes",
      "Proven track record of launching successful B2B SaaS products and managing complex roadmaps",
    ],
  },
  {
    id: 6,
    title: "Customer Success & Support Lead",
    category: "Customer Success",
    type: "Full-time",
    location: "Remote",
    gradient: "from-pink-500 to-rose-400",
    icon: "💬",
    responsibilities: [
      "Lead customer onboarding, training, and ongoing success programs for enterprise clients",
      "Build and manage support systems, documentation, and help resources for users",
      "Analyze customer feedback to identify improvement opportunities and feature requests",
    ],
    requirements: [
      "4+ years experience in customer success, support, or account management in B2B SaaS",
      "Excellent communication skills with ability to explain technical concepts to non-technical users",
      "Experience with support tools, CRM systems, and customer success metrics and analytics",
    ],
  },
  {
    id: 7,
    title: "Growth & Performance Marketer",
    category: "Marketing",
    type: "Full-time",
    location: "Remote",
    gradient: "from-green-500 to-emerald-400",
    icon: "📈",
    responsibilities: [
      "Develop and execute data-driven growth strategies across digital marketing channels",
      "Optimize conversion funnels, landing pages, and user acquisition campaigns",
      "Analyze performance metrics and implement A/B testing to improve marketing ROI",
    ],
    requirements: [
      "4+ years experience in growth marketing, performance marketing, or digital advertising",
      "Proven track record with paid acquisition, SEO, content marketing, and conversion optimization",
      "Strong analytical skills with experience in marketing tools, attribution modeling, and data analysis",
    ],
  },
  {
    id: 8,
    title: "Content & Community Manager",
    category: "Marketing",
    type: "Full-time",
    location: "Remote",
    gradient: "from-yellow-500 to-orange-400",
    icon: "✍️",
    responsibilities: [
      "Create engaging content for blogs, social media, tutorials, and community platforms",
      "Build and nurture developer and user communities around AI-powered web creation",
      "Manage content calendar, social media presence, and community engagement initiatives",
    ],
    requirements: [
      "3+ years experience in content marketing, community management, or developer relations",
      "Strong writing skills with ability to create technical content for developers and business users",
      "Experience building online communities, managing social media, and content strategy development",
    ],
  },
  {
    id: 9,
    title: "Sales & Agency Partnerships",
    category: "Sales",
    type: "Full-time",
    location: "Remote / Hybrid",
    gradient: "from-violet-500 to-purple-400",
    icon: "🤝",
    responsibilities: [
      "Drive B2B sales for enterprise clients and establish strategic agency partnerships",
      "Develop sales processes, lead qualification, and customer relationship management systems",
      "Build partnerships with web agencies, consultants, and technology integration partners",
    ],
    requirements: [
      "5+ years experience in B2B sales, partnership development, or business development",
      "Proven track record selling SaaS products to enterprises, agencies, or technology companies",
      "Strong relationship building skills with experience in consultative selling and partnership management",
    ],
  },
  {
    id: 10,
    title: "Executive Assistant to Founder",
    category: "Operations",
    type: "Full-time",
    location: "Remote / Hybrid",
    gradient: "from-slate-500 to-gray-400",
    icon: "📋",
    responsibilities: [
      "Manage founder's calendar, communications, and strategic project coordination",
      "Support business operations, meeting preparation, and executive decision-making processes",
      "Handle confidential matters, travel arrangements, and cross-functional team coordination",
    ],
    requirements: [
      "3+ years experience as executive assistant to C-level executives in tech or startup environments",
      "Exceptional organizational skills with ability to manage multiple priorities and sensitive information",
      "Strong communication skills and experience with project management, scheduling, and business operations",
    ],
  },
];

export default function CareersPage() {
  const [expandedRole, setExpandedRole] = useState(null);

  const toggleRole = (roleId: any) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[3%] -z-10" />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#0a101f] to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

        <div className="pt-16 sm:pt-20 relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Codaiq – <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Shape the Future
            </span>
            <br />
            of AI-Powered Web Creation
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're building the next generation of AI-powered tools that
            democratize web creation. Join our mission to make professional web
            development accessible to everyone.
          </motion.p>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-white px-2">
              Open{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              We're looking for passionate individuals to join our team and help
              revolutionize web creation with AI
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6">
            {jobRoles.map((role, index) => (
              <motion.div
                key={role.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden shadow-2xl shadow-black/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Job Header */}
                <div
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => toggleRole(role.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-lg sm:text-xl flex-shrink-0`}
                      >
                        {role.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate pr-2">
                          {role.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-300">
                          <span className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs w-fit">
                            {role.category}
                          </span>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span>{role.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-xs sm:text-sm">
                              {role.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: expandedRole === role.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-300 text-lg sm:text-xl ml-2 flex-shrink-0"
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>

                {/* Job Details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedRole === role.id ? "auto" : 0,
                    opacity: expandedRole === role.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {role.responsibilities.map((responsibility, idx) => (
                            <li
                              key={idx}
                              className="text-gray-200 text-xs sm:text-sm leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-blue-400 mt-1 flex-shrink-0">
                                •
                              </span>
                              <span className="break-words">
                                {responsibility}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                          Must-Have Requirements
                        </h4>
                        <ul className="space-y-2">
                          {role.requirements.map((requirement, idx) => (
                            <li
                              key={idx}
                              className="text-gray-200 text-xs sm:text-sm leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-purple-400 mt-1 flex-shrink-0">
                                •
                              </span>
                              <span className="break-words">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                      <motion.a
                        href={`mailto:careers@codaiq.com?subject=Application for ${role.title}&body=Hi Codaiq Team,%0D%0A%0D%0AI'm interested in applying for the ${role.title} position. Please find my application details below:%0D%0A%0D%0A[Please attach your resume and cover letter]%0D%0A%0D%0ABest regards`}
                        className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${role.gradient} text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 text-sm sm:text-base`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Apply Now
                        <span className="text-base sm:text-lg">→</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-8 sm:mt-12 md:mt-16 p-6 sm:p-8 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl shadow-black/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-2">
              Don't see the perfect role?
            </h3>
            <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              We're always looking for exceptional talent. Send us your resume
              and tell us how you'd like to contribute to the future of
              AI-powered web creation.
            </p>
            <motion.a
              href="mailto:careers@codaiq.com?subject=General Application - Future Opportunities"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
              <span className="text-base sm:text-lg">✨</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
