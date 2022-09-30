export const ModeSwitcher = ({
  isEditMode,
  onEditClick,
  onViewClick,
  ...rest
}: {
  isEditMode: boolean;
  onEditClick: () => void;
  onViewClick: () => void;
}) => {
  return (
    <div className="flex gap-4 opacity-50 group-hover:opacity-100">
      <button
        onClick={onEditClick}
        className={`${isEditMode ? "underline" : ""}`}
      >
        Edit
      </button>
      <button
        onClick={onViewClick}
        className={`${!isEditMode ? "underline" : ""}`}
      >
        View
      </button>
    </div>
  );
};
