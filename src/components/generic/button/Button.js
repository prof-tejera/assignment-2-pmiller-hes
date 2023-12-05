import "./Button.css";

const Button = ({ active, text, icon, disabled, ...btnProps }) => {
  return (
    <button
      disabled={disabled}
      className={active ? "Default-button Default-button-active" : "Default-button"}
      {...btnProps}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
