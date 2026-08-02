function FileInput({ ...props }) {
  return (
    <input
      type="file"
      className="text-[1.35rem] rounded-lg file:font-medium file:px-4 file:py-2 file:mr-4 file:rounded-lg file:border-0 file:text-white file:bg-brand-600 file:cursor-pointer file:hover:bg-brand-700 file:transition-colors"
      {...props}
    />
  );
}

export default FileInput;
