const Container = ({ children, className, style }) => {
  const classes = `lg:container mx-auto ${className}`;
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Container;
