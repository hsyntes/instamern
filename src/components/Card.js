const Card = ({ className, children }) => {
  const classes = `card ${className}`;
  return <div className={classes}>{children}</div>;
};

const CardHeader = ({ className, children }) => {
  const classes = `card-header p-4 ${className}`;
  return <div className={classes}>{children}</div>;
};

const CardBody = ({ className, children }) => {
  const classes = `card-body ${className}`;
  return <div className={classes}>{children}</div>;
};

const CardFooter = ({ className, children }) => {
  const classes = `card-footer p-4 ${className}`;
  return <div className={classes}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
