import { Accordion } from "react-bootstrap";
import "./styles.scss";

const List = ({
    items
}) => {
    console.log("list", items);
  return (
    <ul className="cs_list">
        {items.length > 0 
            ? items.map((item, k) => {
                return <li key={`lk_${Math.random() + k}`}>{item.name}</li>
            }) 
            : <li>No items</li>
        }
    </ul>
    
  )
}

export default List;