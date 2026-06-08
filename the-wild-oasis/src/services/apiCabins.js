import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  let { data: data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Check if the image is already a Supabase URL (editing without changing image)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 1. Create a unique image name only if a new image file was provided
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );

  // 2. Build the image path: reuse existing URL or build a new one
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 3. Build the Supabase query — insert for create, update for edit
  let query = supabase.from("cabins");

  if (!id) {
    // CREATE
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // EDIT
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created or edited");
  }

  // 4. Skip image upload if the image hasn't changed
  if (hasImagePath) return data;

  // 5. Upload the actual image file to the storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 6. If image upload failed, delete the cabin row we just created
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
