import Gtk from "../models/Gtk/Gtk.js";

export const isMiddlewareGtk = async (req, res) => {
  try {
    const gtk = await Gtk.findById(req.params.id);
    if (!gtk) {
      return res.status(404).json({ message: "Gtk not found" });
    }
    req.gtk = gtk;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
