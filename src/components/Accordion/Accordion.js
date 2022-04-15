import { useState } from "react";
import "./styles.scss";

const Accordion = ({
    title,
    children
}) => {

    const [toggle, setToggle] = useState(false);

  return (
    <>
        <button className="cs_accordion" onClick={() => setToggle((prev) => !prev)}>
            {title}
            <span>
                <i className={`bi ${toggle ? 'bi-chevron-up': 'bi-chevron-down'}`}></i>
            </span>
        </button>
        <div className={`cs_accordion_panel ${toggle ? 'toggle' : '' } `}>
            {children}
        </div>
    </>
  )
}

export default Accordion;