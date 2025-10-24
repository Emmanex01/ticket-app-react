import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { isAuthenticated, logoutUser } from "../utils/auth";

interface Ticket {
  id: number;
  title: string;
  status: "open" | "in_progress" | "closed";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Redirect if user is not logged in
    if (!isAuthenticated()) {
      navigate("/auth/login");
    }

    // Simulated ticket data (would normally come from API or localStorage)
    const stored = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(stored);
  }, [navigate]);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TicketEase Dashboard</h1>
          <nav className="flex items-center gap-4">
            <Link
              to="/tickets"
              className="text-blue-600 font-medium hover:underline"
            >
              Manage Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="grow w-full max-w-[1440px] mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Overview</h2>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-500">
            <h3 className="text-gray-500 font-medium mb-2">Total Tickets</h3>
            <p className="text-4xl font-bold">{total}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-500">
            <h3 className="text-gray-500 font-medium mb-2">Open</h3>
            <p className="text-4xl font-bold">{open}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-amber-500">
            <h3 className="text-gray-500 font-medium mb-2">In Progress</h3>
            <p className="text-4xl font-bold">{inProgress}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-gray-500">
            <h3 className="text-gray-500 font-medium mb-2">Closed</h3>
            <p className="text-4xl font-bold">{closed}</p>
          </div>
        </div>

        {/* Decorative Section */}
        <section className="mt-16 bg-blue-100 rounded-2xl p-8 text-center shadow-inner">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">
            Ready to manage your tickets?
          </h3>
          <p className="text-gray-700 mb-6">
            Jump into the ticket management board to create, edit, or close tickets easily.
          </p>
          <Link
            to="/tickets"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go to Ticket Board
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} TicketEase — Manage with Confidence.</p>
      </footer>
    </div>
  );
};

export default Dashboard;

