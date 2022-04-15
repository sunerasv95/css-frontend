import { useEffect, useRef } from 'react';
import './styles.scss';

const FormInput = ({
	inputType,
	elementId,
	elementName,
	type,
	labelName,
	changed,
	elementValue,
	options
}) => {

    // const inputRef = useRef(null);

    // useEffect(() => {
	// 	inputRef.current && inputRef.current.focus();
	// });

	let renderInput = null;

	if(inputType === "select"){
		renderInput = (
			<select
                className='cs_form_group_select'
                key={elementId}
				id={elementId}
				name={elementName}
				onChange={changed}
				value={elementValue}
			>
				{options ? options.map((opt, i) => {
					return <option key={`${elementId}_opt_${i}`} value={opt.value}>{opt.option}</option>
				}): <option>No options</option>}
			</select>
		);
	}else{
		renderInput = (
			<input
                className='cs_form_group_input'
                key={elementId}
				id={elementId}
				name={elementName}
				type={type}
				onChange={changed}
				value={elementValue}
			/>
		);
	}


	return (
		<div className="cs_form_group">
			<label 
                className='cs_form_group_label'
                htmlFor={elementId}
            >{labelName}</label>
			{renderInput}
		</div>
	);
};

export default FormInput;
