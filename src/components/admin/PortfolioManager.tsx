import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2, Edit2, Check, X, ExternalLink, Image as ImageIcon } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const defaultProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack e-commerce solution with payment integration",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800",
    link: "https://example.com",
    tags: ["React", "Node.js", "Stripe"]
  },
  {
    title: "Mobile Banking App",
    category: "Mobile App",
    description: "Secure banking application for iOS and Android",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    link: "https://example.com",
    tags: ["React Native", "Firebase", "Security"]
  },
  {
    title: "AI Content Generator",
    category: "AI/ML",
    description: "AI-powered content creation tool",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    link: "https://example.com",
    tags: ["Python", "OpenAI", "Next.js"]
  }
];

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Error loading projects:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
    setSaved(true);
    setEditingIndex(null);
    setTimeout(() => setSaved(false), 3000);
    // Trigger update event
    window.dispatchEvent(new Event("portfolioUpdated"));
  };

  const handleUpdate = (index: number, field: keyof Project, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleAddTag = (index: number) => {
    const updated = [...projects];
    updated[index].tags.push("New Tag");
    setProjects(updated);
  };

  const handleRemoveTag = (projectIndex: number, tagIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].tags = updated[projectIndex].tags.filter((_, i) => i !== tagIndex);
    setProjects(updated);
  };

  const handleUpdateTag = (projectIndex: number, tagIndex: number, value: string) => {
    const updated = [...projects];
    updated[projectIndex].tags[tagIndex] = value;
    setProjects(updated);
  };

  const handleDelete = (index: number) => {
    if (confirm("Delete this project?")) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const newProject: Project = {
      title: "New Project",
      category: "Web Development",
      description: "Project description",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      link: "#",
      tags: ["Tag1"]
    };
    setProjects([...projects, newProject]);
    setEditingIndex(projects.length);
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Portfolio Manager</h2>
            <p className="text-white/60">Add and manage your projects</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          >
            {editingIndex === index ? (
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Edit Project</h3>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleUpdate(index, "title", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Category</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => handleUpdate(index, "category", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Description</label>
                  <textarea
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleUpdate(index, "description", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Image URL</label>
                  <input
                    type="url"
                    value={project.image}
                    onChange={(e) => handleUpdate(index, "image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                  {project.image && (
                    <img src={project.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-xl" />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Project Link</label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => handleUpdate(index, "link", e.target.value)}
                    placeholder="https://project-url.com"
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Tags</label>
                  <div className="space-y-2">
                    {project.tags.map((tag, tIndex) => (
                      <div key={tIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleUpdateTag(index, tIndex, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                        />
                        <button
                          onClick={() => handleRemoveTag(index, tIndex)}
                          className="p-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddTag(index)}
                      className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-all"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  className="w-full py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 font-bold text-sm transition-all"
                >
                  Delete Project
                </button>
              </div>
            ) : (
              <>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved ? "bg-green-500 text-white" : "bg-primary hover:bg-primary-dark text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved! Refresh page to see changes.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save All Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
