import { Children } from "react";
import "./styles.scss";

const Button = ({
    buttonColor,
    small,
    block,
    buttonMode,
    clicked,
    disable,
    children,
}) => {

    // console.log("props", small);
    let btnClasses = ["cs_btn"];

    if(buttonColor === "default"){
        btnClasses.push("cs_default");
    }else if(buttonColor === "primary"){
        btnClasses.push("cs_primary");
    }else if(buttonColor === "warning"){
        btnClasses.push("cs_warning");
    }else if(buttonColor === "danger"){
        btnClasses.push("cs_danger");
    }else{
        btnClasses.push("cs_default");
    }

    if(small) btnClasses.push("cs_btn_small");
    if(block) btnClasses.push("cs_btn_block");

  return (
    <button
        className={btnClasses.join(" ")}
        type={buttonMode}
        onClick={clicked}
        disabled={disable}
    >
        {children}
    </button>
  )
}

export default Button;