// apiCabins.js
import supabase, { supabaseUrl } from "./supabase";

/**
 * Fetch all cabins
 */
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("getCabins error:", error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

/**
 * Create or edit a cabin.
 * - newCabin: object with cabin fields (may include image as File or string URL)
 * - id: optional primitive id (number|string). If id is provided -> update, otherwise create.
 *
 * Defensive: logs inputs, attempts to extract primitive id if an object was accidentally passed,
 * and throws early with a clear message rather than letting Postgres return a 400.
 */
export async function createEditCabin(newCabin, id) {
  // Minimal preview for logs (avoid dumping full file objects)
  try {
    console.log("createEditCabin called:", {
      newCabinPreview: {
        name: newCabin?.name,
        hasImage: Boolean(newCabin?.image),
        regularPrice: newCabin?.regularPrice,
      },
      id,
      idType: typeof id,
    });
  } catch (e) {
    // ignore logging errors
    console.warn("createEditCabin logging failed", e);
  }

  // Defensive: if id is an object, try to extract probable primitive id
  if (id && typeof id === "object") {
    const extracted = id.id ?? id.value ?? id.cabinId ?? null;
    console.warn(
      "createEditCabin received id as object. attempted extract:",
      extracted,
      "original:",
      id
    );
    id = extracted;
  }

  // Validate id type if present
  if (id && !["string", "number"].includes(typeof id)) {
    throw new Error(
      "createEditCabin: id must be a primitive (string|number). Received: " +
        typeof id
    );
  }

  // Normalize image types
  const imageIsString = typeof newCabin.image === "string";
  const imageIsFile =
    newCabin.image && typeof newCabin.image === "object" && newCabin.image.name;
  const hasImagePath =
    imageIsString && newCabin.image.startsWith?.(supabaseUrl);

  // Build a safe imageName only when we have a File
  const imageName = imageIsFile
    ? `${Math.random().toString(36).slice(2)}-${String(
        newCabin.image.name
      )}`.replaceAll("/", "")
    : null;

  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : null;

  try {
    let query = supabase.from("cabins");
    const payload = { ...newCabin, image: imagePath };

    // If no id -> create
    if (!id) {
      query = query.insert([payload]);
    } else {
      // Update path
      query = query.update(payload).eq("id", id);
    }

    // Request the new/updated row back
    const { data, error } = await query.select().single();

    if (error) {
      console.error("Supabase insert/update error:", error);
      throw new Error(error.message || "Cabin could not be created/updated");
    }

    // If the image is already a supabase public URL or there is no file to upload -> return
    if (hasImagePath || !imageIsFile) {
      return data;
    }

    // Upload the file to storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      // Rollback: delete the created cabin row
      try {
        await supabase.from("cabins").delete().eq("id", data.id);
      } catch (delErr) {
        console.error("Rollback delete failed:", delErr);
      }

      console.error("Storage upload error:", storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }

    return data;
  } catch (err) {
    console.error("createEditCabin caught:", err);
    throw err;
  }
}

/**
 * Delete cabin by id.
 * Note: include .select() if you want deleted rows returned.
 */
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("deleteCabin error:", error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
