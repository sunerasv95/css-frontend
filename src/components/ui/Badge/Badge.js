import "./styles.scss";

const Badge = ({
    badgeColor,
    text
}) => {
    let btnClasses = ["cs_badge"];

    if(badgeColor === "default"){
        btnClasses.push("cs_default");
    }else if(badgeColor === "primary"){
        btnClasses.push("cs_primary");
    }else if(badgeColor === "success"){
        btnClasses.push("cs_success");
    }else if(badgeColor === "warning"){
        btnClasses.push("cs_warning");
    }else if(badgeColor === "danger"){
        btnClasses.push("cs_danger");
    }else{
        btnClasses.push("cs_default");
    }
  return (
    <span className={btnClasses.join(' ')}>{text}</span>
  )
}

export default Badge;