import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticated } from "../utils/auth";
import { getItem, setItem } from "../utils/localStorage";

type TicketStatus = "open" | "in_progress" | "closed";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority?: string;
  createdAt: string;
}


const STATUS_COLORS: Record<Ticket["status"], string> = {
  open: "bg-green-100 text-green-700",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-gray-200 text-gray-700",
};

const sanitizeTicket = (t: any): Ticket => {
  const validStatuses: TicketStatus[] = ["open", "in_progress", "closed"];

  return {
    id: Number(t.id) || Date.now(),
    title: String(t.title || ""),
    description: String(t.description || ""),
    status: validStatuses.includes(t.status as TicketStatus)
      ? (t.status as TicketStatus)
      : "open",
    priority: t.priority ? String(t.priority) : undefined,
    createdAt: String(t.createdAt || new Date().toISOString()),
  };
};


const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const tickets = getItem("tickets");
    return (tickets as Ticket[]) || [];
  });
  const [editing, setEditing] = useState<Ticket | null>(null);
  const [form, setForm] = useState<{
  title: string;
  description: string;
  status: TicketStatus;
}>({
  title: "",
  description: "",
  status: "open",
});




  // ✅ Authentication check
 useEffect(() => {
  if (!isAuthenticated()) {
    navigate("/auth/login");
  }

  const stored = getItem("tickets");
  const sanitized: Ticket[] = Array.isArray(stored)
    ? stored.map((t) => sanitizeTicket(t))
    : [];

  setTickets(sanitized);
}, [navigate]);



  // ✅ Save tickets to storage whenever updated
  useEffect(() => {
    setItem("tickets", tickets)
  }, [tickets]);

  const resetForm = () => {
    setForm({ title: "", description: "", status: "open" });
    setEditing(null);
  };

  // ✅ Create / Update ticket
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!["open", "in_progress", "closed"].includes(form.status)) {
      toast.error("Invalid status value");
      return;
    }

    if (editing) {
      const updated = tickets.map((t) =>
        t.id === editing.id ? { ...t, ...form } : t
      );
      setTickets(updated);
      toast.success("Ticket updated!");
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        status: form.status as Ticket["status"],
        createdAt: new Date().toISOString(),
      };
      setTickets([...tickets, newTicket]);
      toast.success("Ticket created!");
    }

    resetForm();
  };

  // ✅ Edit existing ticket
  const handleEdit = (t: Ticket) => {
    setEditing(t);
    setForm({
      title: t.title,
      description: t.description,
      status: t.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete ticket
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setTickets(tickets.filter((t) => t.id !== id));
      toast.success("Ticket deleted");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white text-gray-800">
      <Toaster />

      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Ticket Board</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow w-full max-w-[1440px] mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {editing ? "Edit Ticket" : "Create New Ticket"}
        </h2>

        {/* Ticket Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 mb-10"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Ticket title"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Status *
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Ticket["status"],
                  })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Describe the issue..."
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {editing ? "Update Ticket" : "Create Ticket"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Ticket List */}
        <h3 className="text-2xl font-bold mb-4">Your Tickets</h3>

        {tickets.length === 0 ? (
          <p className="text-gray-600 italic">No tickets found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-gray-900">
                    {t.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {t.description || "No description provided."}
                  </p>
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${STATUS_COLORS[t.status]}`}
                  >
                    {t.status.includes("_") ? t.status.replace("_", " ").toUpperCase() : t.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(t)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} TicketEase — All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Tickets;

