import "./Input.css";

const Input = ({ className, placeHolder, ...props })  => {
  return <input className={'default-inputField '+ className} placeholder={placeHolder} {...props} />;
};

export default Input;
