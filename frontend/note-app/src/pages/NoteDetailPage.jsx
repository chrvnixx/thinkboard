import axios from "axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/notes/${id}`);
        setNote(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields required");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`${api}/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("couldn't update note");
      toast.error("couldn't update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${api}/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("unable to delete note", error);
      toast.error("Deletion error", error);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || saving;

  return (
    <div>
      <div className="max-w-3xl  flex justify-between items-center mx-auto mt-10">
        <Link to={"/"} className="btn btn-ghost ">
          <ArrowLeftIcon />
          Back to Notes
        </Link>

        <button
          disabled={disabled}
          onClick={handleDelete}
          className="btn btn-error btn-outline rounded-full"
        >
          <Trash2Icon size="17" />
          Delete
        </button>
      </div>

      {loading ? (
        <div className="max-w-3xl mx-auto flex justify-center h-100 items-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      ) : (
        <div className="card bg-base-100 max-w-3xl mx-auto mt-10">
          <div className="card-body flex items-center">
            <form className="form">
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text ">Title</span>
                </label>
                <input
                  value={note?.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  type="text"
                  className="input input-bordered outline-none md:w-lg"
                />
                <label className="label">
                  <span className="label-text mt-5">Content</span>
                </label>
                <textarea
                  value={note?.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  type="text"
                  className="textarea textarea-bordered outline-none md:w-lg"
                />
              </div>

              <button
                disabled={saving}
                onClick={handleSave}
                type="submit "
                className="btn btn-primary mt-5 float-end rounded-full"
              >
                {saving ? "saving changes..." : "save changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
