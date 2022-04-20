const Alert = () => {
  return (
    <div className="fixed top-[50%] right-0 h-8 bg-amber-600">
      preview mode{" "}
      <a
        href="/api/exit-preview"
        className="underline transition-colors duration-200 hover:text-black"
      >
        Click here to exit
      </a>
    </div>
  );
};

export default Alert;
