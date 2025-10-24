import { motion } from "motion/react"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-linear-to-b from-white to-blue-50 text-gray-800">
      {/* Decorative Circle Top-Left */}
      <div className="absolute top-[-60px] left-[-60px] w-[180px] h-[180px] bg-blue-100 rounded-full blur-3xl opacity-70"></div>

      {/* Decorative Circle Bottom-Right */}
      <div className="absolute -bottom-20 -right-20 w-[220px] h-[220px] bg-amber-100 rounded-full blur-2xl opacity-70"></div>

      {/* Header */}
      <header className="w-full max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TicketEase</h1>
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
          <Link
            to="/auth/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="grow flex flex-col justify-center items-center text-center px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[800px] mx-auto z-10"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Manage Your Tickets with <span className="text-blue-600">Ease</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Streamline your workflow. Create, track, and resolve tickets — all
            from one clean, intuitive dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/auth/login"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Login <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Wavy Background */}
        <svg
            id="wave"
            className=" fixed bottom-0 left-0 w-full rotate-0 transition-transform duration-300 z-0"
            viewBox="0 0 1440 490"
            xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(122,107,102,1)" offset="0%" />
            <stop stop-color="rgba(255,179,11,1)" offset="100%" />
            </linearGradient>
        </defs>
        <path
            className="translate-y-0 opacity-100"
            fill="url(#sw-gradient-0)"
            d="M0,0L26.7,73.5C53.3,147,107,294,160,294C213.3,294,267,147,320,73.5C373.3,0,427,0,480,8.2C533.3,16,587,33,640,81.7C693.3,131,747,212,800,261.3C853.3,310,907,327,960,310.3C1013.3,294,1067,245,1120,245C1173.3,245,1227,294,1280,285.8C1333.3,278,1387,212,1440,163.3C1493.3,114,1547,82,1600,122.5C1653.3,163,1707,278,1760,285.8C1813.3,294,1867,196,1920,163.3C1973.3,131,2027,163,2080,179.7C2133.3,196,2187,196,2240,220.5C2293.3,245,2347,294,2400,310.3C2453.3,327,2507,310,2560,261.3C2613.3,212,2667,131,2720,98C2773.3,65,2827,82,2880,73.5C2933.3,65,2987,33,3040,40.8C3093.3,49,3147,98,3200,163.3C3253.3,229,3307,310,3360,310.3C3413.3,310,3467,229,3520,179.7C3573.3,131,3627,114,3680,89.8C3733.3,65,3787,33,3813,16.3L3840,0L3840,490L3813.3,490C3786.7,490,3733,490,3680,490C3626.7,490,3573,490,3520,490C3466.7,490,3413,490,3360,490C3306.7,490,3253,490,3200,490C3146.7,490,3093,490,3040,490C2986.7,490,2933,490,2880,490C2826.7,490,2773,490,2720,490C2666.7,490,2613,490,2560,490C2506.7,490,2453,490,2400,490C2346.7,490,2293,490,2240,490C2186.7,490,2133,490,2080,490C2026.7,490,1973,490,1920,490C1866.7,490,1813,490,1760,490C1706.7,490,1653,490,1600,490C1546.7,490,1493,490,1440,490C1386.7,490,1333,490,1280,490C1226.7,490,1173,490,1120,490C1066.7,490,1013,490,960,490C906.7,490,853,490,800,490C746.7,490,693,490,640,490C586.7,490,533,490,480,490C426.7,490,373,490,320,490C266.7,490,213,490,160,490C106.7,490,53,490,27,490L0,490Z"
        />
        </svg>

      </main>

      {/* Feature Boxes */}
      <section
        id="features"
        className="w-full max-w-[1440px] mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 relative z-10"
      >
        {[
          {
            title: "Fast Ticketing",
            desc: "Create and manage support tickets effortlessly with real-time validation.",
          },
          {
            title: "Smart Dashboard",
            desc: "View open, in-progress, and closed tickets at a glance.",
          },
          {
            title: "Secure Access",
            desc: "Your session is protected and stored locally with mock authentication.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-auto text-center">
        <p>&copy; {new Date().getFullYear()} TicketEase — All rights reserved.</p>
      </footer>
    </div>
  );
}
