// handleClick.js
const handleClick = (product, setHistory) => {
	const newEntry = {
	  time: new Date().toLocaleTimeString(),
	  date: new Date().toLocaleDateString(),
	  product,
	};
  
	setHistory(prevHistory => [...prevHistory, newEntry]);
  };
  
  export default handleClick;  