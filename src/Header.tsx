export const Header = () => {
  <header className="h-full group flex items-center gap-4 justify-between sticky top-0 px-4 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 border-b-2 dark:border-gray-500 transition-all duration-150">
    <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-all duration-150">
      <Link to="/" className="font-bold text-xl">
        Markdown
      </Link>
      <Link className="text-2xl" to="texts">
        <MdViewList title="My texts" />
      </Link>
    </div>
    <ModeSwitcher
      isEditMode={isEditMode}
      onEditClick={() => setIsEditMode(true)}
      onViewClick={() => setIsEditMode(false)}
    />
    <ThemeSwitcher className="opacity-50 group-hover:opacity-100" />
  </header>;
};
