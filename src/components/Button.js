const Button = ({ type, variant, className, onClick, children, disabled }) => {
  let classes = `font-semibold px-5 py-2 rounded transition ${className} `;

  if (variant === "primary")
    classes += "bg-primary hover:bg-primary-dark text-white";

  if (variant === "secondary")
    classes += "bg-secondary hover:bg-secondary-dark text-white";

  if (variant === "dark" || variant === "black")
    classes += "bg-dark hover:bg-dark-dark text-white";

  if (variant === "light" || variant === "white")
    classes += "bg-light hover:bg-light-dark text-dark";

  if (variant === "danger") classes += "bg-danger text-white";

  if (variant === "link") classes += "px-0 py-0";

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
