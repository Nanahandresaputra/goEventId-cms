const LabelField = ({ children, required, className }) => {
  return (
    <p className={className}>
      <span className="text-[#00000066] font-semibold">{children}</span>
      {required && <span className="text-[#F26D1B]">*</span>}
    </p>
  );
};

export default LabelField;
