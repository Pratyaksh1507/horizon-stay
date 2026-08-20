import { useState } from "react";
import { useForm } from "react-hook-form";
import { BedDouble, DollarSign, Image, Percent, Tag, Users } from "lucide-react";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const [previewImage, setPreviewImage] = useState(editValues.image || null);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : { discount: 0, maxCapacity: 2, regularPrice: 250 },
  });

  const { errors } = formState;

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image?.[0] || previewImage;
    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-8 flex flex-col gap-6 max-w-[65rem] w-full text-zinc-100"
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-[2.2rem] font-bold tracking-tight text-zinc-100 flex items-center gap-2.5">
            <BedDouble className="w-6 h-6 text-amber-400" />
            {isEditSession ? `Edit Cabin #${editValues.name || editId}` : "Add New Resort Unit"}
          </h3>
          <p className="text-[1.25rem] text-zinc-400 mt-0.5">
            {isEditSession
              ? "Update unit capacity, night rates, and amenities."
              : "Register a new luxury chalet or suite into resort inventory."}
          </p>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-zinc-500" />
            Cabin Name / Number *
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. 009 or Sky Chalet"
            disabled={isWorking}
            {...register("name", { required: "Cabin name is required" })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.name && <span className="text-[1.15rem] text-red-400">{errors.name.message}</span>}
        </div>

        {/* Max Capacity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            Max Guest Capacity *
          </label>
          <input
            type="number"
            id="maxCapacity"
            min="1"
            max="20"
            disabled={isWorking}
            {...register("maxCapacity", {
              required: "Capacity is required",
              min: { value: 1, message: "Capacity should be at least 1" },
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.maxCapacity && (
            <span className="text-[1.15rem] text-red-400">{errors.maxCapacity.message}</span>
          )}
        </div>

        {/* Regular Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
            Nightly Base Rate ($) *
          </label>
          <input
            type="number"
            id="regularPrice"
            min="1"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "Regular price is required",
              min: { value: 1, message: "Price should be at least $1" },
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.regularPrice && (
            <span className="text-[1.15rem] text-red-400">{errors.regularPrice.message}</span>
          )}
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-zinc-500" />
            Discount ($)
          </label>
          <input
            type="number"
            id="discount"
            min="0"
            disabled={isWorking}
            {...register("discount", {
              validate: (value) =>
                Number(value || 0) < Number(getValues().regularPrice || 0) ||
                "Discount must be less than regular price",
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.discount && (
            <span className="text-[1.15rem] text-red-400">{errors.discount.message}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider">
          Resort Description & Highlights
        </label>
        <textarea
          rows={3}
          id="description"
          placeholder="Interior finishes, fireplace, mountain views, private sauna..."
          disabled={isWorking}
          {...register("description", { required: "Description is required" })}
          className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors resize-none"
        />
        {errors.description && (
          <span className="text-[1.15rem] text-red-400">{errors.description.message}</span>
        )}
      </div>

      {/* Image Upload & Live Preview */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="w-24 h-16 rounded-lg object-cover border border-zinc-700 flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-16 rounded-lg bg-zinc-900 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 flex-shrink-0">
            <Image className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
            Cabin Photography
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            disabled={isWorking}
            {...register("image")}
            onChange={handleImageChange}
            className="text-[1.25rem] text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-zinc-700 file:text-[1.2rem] file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
          className="px-5 py-2.5 rounded-xl text-[1.35rem] font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isWorking}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.35rem] font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isWorking
            ? isEditSession
              ? "Saving changes..."
              : "Creating unit..."
            : isEditSession
            ? "Save Changes"
            : "Create Cabin"}
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
