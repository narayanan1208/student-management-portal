import "../../title.css";

const Title = () => {
  const title = "Student Management System";

  return (
    <h1
      style={{
        position: "absolute",
        left: "50%",
        // top: "50%",
        bottom: "85%",
        transform: "translate(-50%, -50%)",
        fontSize: "3rem",
        color: "rgba(0, 123, 255, 0.2)",
        zIndex: 0,
        textAlign: "center",
        fontWeight: "bold",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {title.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            animation: "fadeIn 1s forwards", // Animation for the characters
            animationDelay: `${index * 0.1}s`, // Apply delay based on index
          }}
        >
          {char === " " ? "\u00A0" : char}{" "}
          {/* Non-breaking space for spacing */}
        </span>
      ))}
    </h1>
  );
};

export default Title;
