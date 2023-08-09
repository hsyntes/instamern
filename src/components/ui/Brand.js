const Brand = ({ className }) => {
  const classes = `text-transparent bg-clip-text bg-gradient-to-r from-primary to-100% to-secondary ${className}`;

  return (
    <h1 id="brand" className={classes}>
      InstaMERN
    </h1>
  );
};

export default Brand;
