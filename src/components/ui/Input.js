const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
}) => {
  const classes = `form-input peer w-full border-0 border-b-2 ps-0 bg-white placeholder-transparent dark:bg-black lg:dark:bg-dark focus:border-b-pimary focus:ring-0 ${className}`;

  return (
    <>
      <input
        type={type}
        id={name}
        name={name}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label
        htmlFor={name}
        className="absolute -top-3 left-0 text-gray-500 peer-focus:-top-3 peer-placeholder-shown:top-2 duration-200 cursor-text"
      >
        {placeholder}
      </label>
    </>
  );
};

export default Input;
