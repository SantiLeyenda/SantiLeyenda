import React from "react";
import "../screens/css/Alert.css";

const Alert = ({ message, type = "info", onClose, children }) => {
	return (
		<div className={`alert alert-${type}`}>
			<span className="alert-message">{children}</span>
			{onClose && (
				<button className="alert-close" onClick={onClose}>
					&times;
				</button>
			)}
		</div>
	);
};

export default Alert;
