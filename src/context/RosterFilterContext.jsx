import { createContext, useState } from "react";

const RosterFilterContext = createContext();

export const RosterFilterProvider = ({ children }) => {
  const [rosterGlobalFilter, setRosterGlobalFilter] = useState(null);

  return (
    <RosterFilterContext.Provider value={{
        rosterGlobalFilter, 
        setRosterGlobalFilter
      }}
    >
      {children}
    </RosterFilterContext.Provider>
  );
};

export default RosterFilterContext;