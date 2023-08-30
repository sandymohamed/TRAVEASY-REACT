import { useState, createContext } from 'react';

// default value false
const DarkModeContext = createContext(false);

function DarkModeProvider(props) {
  let darkModeLS = JSON.parse(localStorage.getItem('darkMode'));
  let [darkMode, setdarkMode] = useState(darkModeLS ? darkModeLS : false );

  const toggleDarkMode = () => {
    let darkModeLS22 = localStorage.getItem('darkMode');
    if (JSON.parse(darkModeLS22) === true) {
      localStorage.removeItem('darkMode');
      localStorage.setItem('darkMode', false);
      setdarkMode(false);
    } else {
      localStorage.removeItem('darkMode');
      localStorage.setItem('darkMode', true);
      setdarkMode(true);
    }
  };

  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <div className={`  ${darkMode}`}>
        {props.children}

        </div>
      </DarkModeContext.Provider>
    </div>
  );
}
export { DarkModeContext, DarkModeProvider };
