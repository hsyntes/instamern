const EmptyPhoto = ({ username, size, opacity, fontSize, className, onClick }) => {

  const classes = `bg-primary ${className}`

  return (
    <div
    className={classes}
    style={{
      width: size || "32px",
      height: size || "32px",
      borderRadius: "100%",
      position: "relative",
      opacity,
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    <span
      className="text-white"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: fontSize || "14px",
      }}
    >
      {username?.slice(0, 1).toUpperCase()}
    </span>
  </div>
  )
}
export default EmptyPhoto;
