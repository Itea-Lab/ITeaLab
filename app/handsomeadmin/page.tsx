"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Plus, X, Check } from "lucide-react";
import CustomCursor from "../components/ui/custom-cursor";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { uploadFile } from "../components/uploadFile";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_* env vars");
}
const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

interface NewsItem {
  id?: number;
  icon: string;
  image: string;
  date: string;
  title: string;
  url: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
}

interface WorkshopItem {
  id?: number;
  name: string;
  url: string;
  image?: string;
  alt?: string;
  shape?: string;
  created_at?: string;
  updated_at?: string;
}

interface JoinRequest {
  id?: number;
  full_name: string;
  email: string;
  message?: string;
  addons?: string[];
  newsletter?: boolean;
  status?: string;
  submitted_at?: string;
  processed_at?: string;
}

type TabType = "News" | "Workshops" | "Applications";

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabType>("News");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // News state
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFormData, setNewsFormData] = useState<NewsItem>({
    icon: "",
    image: "",
    date: "",
    title: "",
    url: "",
    alt: "",
  });
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);

  // Workshops state
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [workshopModalOpen, setWorkshopModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<WorkshopItem | null>(
    null,
  );
  const [workshopFormData, setWorkshopFormData] = useState<WorkshopItem>({
    name: "",
    url: "",
    image: "",
    alt: "",
    shape: "",
  });
  const [workshopImageFile, setWorkshopImageFile] = useState<File | null>(null);

  // Applications state
  const [applications, setApplications] = useState<JoinRequest[]>([]);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JoinRequest | null>(null);

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "news" | "workshop";
    id: number;
  } | null>(null);

  useEffect(() => {
    if (activeTab === "News") fetchNews();
    else if (activeTab === "Workshops") fetchWorkshops();
    else if (activeTab === "Applications") fetchApplications();
  }, [activeTab]);

  // Fetch News
  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      showMessage("error", "Failed to load news");
      console.error(error);
    } else {
      setNewsItems(data || []);
    }
    setLoading(false);
  };

  // Fetch Workshops
  const fetchWorkshops = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      showMessage("error", "Failed to load workshops");
      console.error(error);
    } else {
      setWorkshops(data || []);
    }
    setLoading(false);
  };

  // Fetch Applications
  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("join_requests")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) {
      showMessage("error", "Failed to load applications");
      console.error(error);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  // Show message
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // NEWS CRUD OPERATIONS
  const handleCreateNews = async () => {
    if (!newsFormData.title || !newsFormData.url) {
      showMessage("error", "Title and URL are required");
      return;
    }
    setLoading(true);

    // Upload image to Cloudinary if file is selected
    let imageUrl = newsFormData.image;
    if (newsImageFile) {
      try {
        const data = await uploadFile(newsImageFile);
        imageUrl = data.secure_url;
      } catch (error) {
        showMessage("error", "Failed to upload image");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("news").insert([{ ...newsFormData, image: imageUrl }]);
    if (error) {
      showMessage("error", "Failed to create news item");
      console.error(error);
    } else {
      showMessage("success", "News item created successfully");
      setNewsModalOpen(false);
      resetNewsForm();
      fetchNews();
    }
    setLoading(false);
  };

  const handleUpdateNews = async () => {
    if (!editingNews?.id) return;
    setLoading(true);

    // Upload image to Cloudinary if new file is selected
    let imageUrl = newsFormData.image;
    if (newsImageFile) {
      try {
        const data = await uploadFile(newsImageFile);
        imageUrl = data.secure_url;
      } catch (error) {
        showMessage("error", "Failed to upload image");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    // Remove auto-generated fields before updating
    const { id, created_at, updated_at, ...updateData } = newsFormData;
    const { error } = await supabase
      .from("news")
      .update({ ...updateData, image: imageUrl })
      .eq("id", editingNews.id);
    if (error) {
      showMessage("error", "Failed to update news item");
      console.error(error);
    } else {
      showMessage("success", "News item updated successfully");
      setNewsModalOpen(false);
      setEditingNews(null);
      resetNewsForm();
      fetchNews();
    }
    setLoading(false);
  };

  const handleDeleteNews = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      showMessage("error", "Failed to delete news item");
      console.error(error);
    } else {
      showMessage("success", "News item deleted successfully");
      setDeleteConfirm(null);
      fetchNews();
    }
    setLoading(false);
  };

  const resetNewsForm = () => {
    setNewsFormData({
      icon: "",
      image: "",
      date: "",
      title: "",
      url: "",
      alt: "",
    });
    setNewsImageFile(null);
  };

  // WORKSHOP CRUD OPERATIONS
  const handleCreateWorkshop = async () => {
    if (!workshopFormData.name || !workshopFormData.url) {
      showMessage("error", "Name and URL are required");
      return;
    }
    setLoading(true);

    // Upload image to Cloudinary if file is selected
    let imageUrl = workshopFormData.image;
    if (workshopImageFile) {
      try {
        const data = await uploadFile(workshopImageFile);
        imageUrl = data.secure_url;
      } catch (error) {
        showMessage("error", "Failed to upload image");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase
      .from("workshops")
      .insert([{ ...workshopFormData, image: imageUrl }]);
    if (error) {
      showMessage("error", "Failed to create workshop");
      console.error(error);
    } else {
      showMessage("success", "Workshop created successfully");
      setWorkshopModalOpen(false);
      resetWorkshopForm();
      fetchWorkshops();
    }
    setLoading(false);
  };

  const handleUpdateWorkshop = async () => {
    if (!editingWorkshop?.id) return;
    setLoading(true);

    // Upload image to Cloudinary if new file is selected
    let imageUrl = workshopFormData.image;
    if (workshopImageFile) {
      try {
        const data = await uploadFile(workshopImageFile);
        imageUrl = data.secure_url;
      } catch (error) {
        showMessage("error", "Failed to upload image");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    // Remove auto-generated fields before updating
    const { id, created_at, updated_at, ...updateData } = workshopFormData;
    const { error } = await supabase
      .from("workshops")
      .update({ ...updateData, image: imageUrl })
      .eq("id", editingWorkshop.id);
    if (error) {
      showMessage("error", "Failed to update workshop");
      console.error(error);
    } else {
      showMessage("success", "Workshop updated successfully");
      setWorkshopModalOpen(false);
      setEditingWorkshop(null);
      resetWorkshopForm();
      fetchWorkshops();
    }
    setLoading(false);
  };

  const handleDeleteWorkshop = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("workshops").delete().eq("id", id);
    if (error) {
      showMessage("error", "Failed to delete workshop");
      console.error(error);
    } else {
      showMessage("success", "Workshop deleted successfully");
      setDeleteConfirm(null);
      fetchWorkshops();
    }
    setLoading(false);
  };

  const resetWorkshopForm = () => {
    setWorkshopFormData({ name: "", url: "", image: "", alt: "", shape: "" });
    setWorkshopImageFile(null);
  };

  // APPLICATION UPDATE OPERATION
  const handleUpdateApplication = async () => {
    if (!editingApp?.id) return;
    setLoading(true);
    const updateData = {
      status: editingApp.status,
      processed_at:
        editingApp.status === "processed" ? new Date().toISOString() : null,
    };
    const { error } = await supabase
      .from("join_requests")
      .update(updateData)
      .eq("id", editingApp.id);
    if (error) {
      showMessage("error", "Failed to update application");
      console.error(error);
    } else {
      showMessage("success", "Application updated successfully");
      setAppModalOpen(false);
      setEditingApp(null);
      fetchApplications();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-background-light p-6 sm:p-12">
      <CustomCursor />

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex gap-2 text-xl sm:text-2xl items-center hover:text-light-green transition-colors"
        >
          <ArrowLeft /> Back
        </Link>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-8 mt-8 sm:mt-12 border-b border-zinc-800">
          {(["News", "Workshops", "Applications"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xl sm:text-3xl pb-4 transition-colors ${
                activeTab === tab
                  ? "text-light-green border-b-2 border-light-green"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Message Toast */}
        {message && (
          <div
            className={`mt-4 p-4 rounded ${
              message.type === "success"
                ? "bg-light-green text-background"
                : "bg-red-600 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Content Area */}
        <div className="mt-8">
          {/* NEWS TAB */}
          {activeTab === "News" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">News Management</h2>
                <button
                  onClick={() => {
                    resetNewsForm();
                    setEditingNews(null);
                    setNewsModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-light-green text-background px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  <Plus size={20} /> Add News
                </button>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-3">Icon</th>
                        <th className="text-left p-3">Title</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">URL</th>
                        <th className="text-left p-3">Image</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-zinc-800 hover:bg-zinc-900"
                        >
                          <td className="p-3">{item.icon}</td>
                          <td className="p-3">{item.title}</td>
                          <td className="p-3">{item.date}</td>
                          <td className="p-3">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-green hover:underline"
                            >
                              Link
                            </a>
                          </td>
                          <td className="p-3 text-sm text-gray-400 truncate max-w-xs">
                            {item.image}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingNews(item);
                                  setNewsFormData(item);
                                  setNewsModalOpen(true);
                                }}
                                className="p-2 bg-black rounded hover:bg-black-700"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "news",
                                    id: item.id!,
                                  })
                                }
                                className="p-2 bg-red-600 rounded hover:bg-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {newsItems.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                      No news items found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* WORKSHOPS TAB */}
          {activeTab === "Workshops" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Workshops Management</h2>
                <button
                  onClick={() => {
                    resetWorkshopForm();
                    setEditingWorkshop(null);
                    setWorkshopModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-light-green text-background px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  <Plus size={20} /> Add Workshop
                </button>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">URL</th>
                        <th className="text-left p-3">Image</th>
                        <th className="text-left p-3">Shape</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workshops.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-zinc-800 hover:bg-zinc-900"
                        >
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-green hover:underline"
                            >
                              Link
                            </a>
                          </td>
                          <td className="p-3 text-sm text-gray-400 truncate max-w-xs">
                            {item.image}
                          </td>
                          <td className="p-3">{item.shape}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingWorkshop(item);
                                  setWorkshopFormData(item);
                                  setWorkshopModalOpen(true);
                                }}
                                className="p-2 bg-black rounded hover:bg-black-700"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "workshop",
                                    id: item.id!,
                                  })
                                }
                                className="p-2 bg-red-600 rounded hover:bg-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {workshops.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                      No workshops found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === "Applications" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Applications (Read & Update Only)
                </h2>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Message</th>
                        <th className="text-left p-3">Add-ons</th>
                        <th className="text-left p-3">Newsletter</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Submitted</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-zinc-800 hover:bg-zinc-900"
                        >
                          <td className="p-3">{item.full_name}</td>
                          <td className="p-3">{item.email}</td>
                          <td className="p-3 max-w-xs truncate">
                            {item.message || "-"}
                          </td>
                          <td className="p-3 text-sm">
                            {item.addons?.join(", ") || "-"}
                          </td>
                          <td className="p-3">
                            {item.newsletter ? "Yes" : "No"}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                item.status === "processed"
                                  ? "bg-green-700"
                                  : "bg-yellow-700"
                              }`}
                            >
                              {item.status || "pending"}
                            </span>
                          </td>
                          <td className="p-3 text-sm">
                            {item.submitted_at
                              ? new Date(item.submitted_at).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setEditingApp(item);
                                setAppModalOpen(true);
                              }}
                              className="p-2 bg-black rounded hover:bg-black-700"
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {applications.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                      No applications found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NEWS MODAL */}
      {newsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
          <div className="bg-background-light text-background p-6 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {editingNews ? "Edit News" : "Create News"}
              </h3>
              <button
                onClick={() => setNewsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Icon</label>
                <input
                  type="text"
                  value={newsFormData.icon}
                  onChange={(e) =>
                    setNewsFormData({ ...newsFormData, icon: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Icon emoji or text"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Title *</label>
                <input
                  type="text"
                  value={newsFormData.title}
                  onChange={(e) =>
                    setNewsFormData({ ...newsFormData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="News title"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="text"
                  value={newsFormData.date}
                  onChange={(e) =>
                    setNewsFormData({ ...newsFormData, date: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., Jan 15, 2024"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">URL *</label>
                <input
                  type="url"
                  value={newsFormData.url}
                  onChange={(e) =>
                    setNewsFormData({ ...newsFormData, url: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNewsImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded"
                  accept="image/*"
                />
                {newsImageFile && (
                  <p className="text-sm mt-1">Selected: {newsImageFile.name}</p>
                )}
                {newsFormData.image && !newsImageFile && (
                  <p className="text-sm mt-1 text-gray-600">Current: {newsFormData.image}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Alt Text</label>
                <input
                  type="text"
                  value={newsFormData.alt}
                  onChange={(e) =>
                    setNewsFormData({ ...newsFormData, alt: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Image description"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={editingNews ? handleUpdateNews : handleCreateNews}
                  disabled={loading}
                  className="flex items-center gap-2 bg-light-green text-background px-6 py-3 rounded hover:opacity-90 disabled:opacity-50"
                >
                  <Check size={20} /> {editingNews ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setNewsModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 text-background rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WORKSHOP MODAL */}
      {workshopModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
          <div className="bg-background-light text-background p-6 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {editingWorkshop ? "Edit Workshop" : "Create Workshop"}
              </h3>
              <button
                onClick={() => setWorkshopModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name *</label>
                <input
                  type="text"
                  value={workshopFormData.name}
                  onChange={(e) =>
                    setWorkshopFormData({
                      ...workshopFormData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Workshop name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">URL *</label>
                <input
                  type="url"
                  value={workshopFormData.url}
                  onChange={(e) =>
                    setWorkshopFormData({
                      ...workshopFormData,
                      url: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setWorkshopImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded"
                  accept="image/*"
                />
                {workshopImageFile && (
                  <p className="text-sm mt-1">Selected: {workshopImageFile.name}</p>
                )}
                {workshopFormData.image && !workshopImageFile && (
                  <p className="text-sm mt-1 text-gray-600">Current: {workshopFormData.image}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Alt Text</label>
                <input
                  type="text"
                  value={workshopFormData.alt}
                  onChange={(e) =>
                    setWorkshopFormData({
                      ...workshopFormData,
                      alt: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Image description"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Shape</label>
                <input
                  type="text"
                  value={workshopFormData.shape}
                  onChange={(e) =>
                    setWorkshopFormData({
                      ...workshopFormData,
                      shape: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., cube, cone, sphere"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={
                    editingWorkshop
                      ? handleUpdateWorkshop
                      : handleCreateWorkshop
                  }
                  disabled={loading}
                  className="flex items-center gap-2 bg-light-green text-background px-6 py-3 rounded hover:opacity-90 disabled:opacity-50"
                >
                  <Check size={20} /> {editingWorkshop ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setWorkshopModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 text-background rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION MODAL */}
      {appModalOpen && editingApp && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
          <div className="bg-background-light text-background p-6 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Update Application Status</h3>
              <button
                onClick={() => setAppModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <p>
                  <strong>Name:</strong> {editingApp.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {editingApp.email}
                </p>
                <p>
                  <strong>Message:</strong> {editingApp.message || "-"}
                </p>
                <p>
                  <strong>Add-ons:</strong>{" "}
                  {editingApp.addons?.join(", ") || "-"}
                </p>
                <p>
                  <strong>Newsletter:</strong>{" "}
                  {editingApp.newsletter ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={editingApp.status || "pending"}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, status: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdateApplication}
                  disabled={loading}
                  className="flex items-center gap-2 bg-light-green text-background px-6 py-3 rounded hover:opacity-90 disabled:opacity-50"
                >
                  <Check size={20} /> Update Status
                </button>
                <button
                  onClick={() => setAppModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 text-background rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
          <div className="bg-background-light text-background p-6 rounded max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this {deleteConfirm.type}? This
              action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  deleteConfirm.type === "news"
                    ? handleDeleteNews(deleteConfirm.id)
                    : handleDeleteWorkshop(deleteConfirm.id)
                }
                disabled={loading}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-300 text-background px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
