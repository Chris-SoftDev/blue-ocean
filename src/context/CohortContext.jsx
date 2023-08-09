import { createContext, useState, useEffect, useRef } from "react";

const CohortContext = createContext()

export const CohortProvider = ({ children }) => {
  const [showAnalyticsCohortMenu, setShowAnalyticsCohortMenu] = useState(false)
  const [cohortMenuInLineAnalytics, setCohortMenuInLineAnalytics] = useState(false)
  const [selectedCohort, setSelectedCohort] = useState({cohort: '', term: ''})
  const [isCohortMenuVisible, setIsCohortMenuVisible] = useState(false)
  const [isPresent, setIsPresent] = useState(false);
  const cohortMenuRef = useRef()
  const rosterDropdownRef = useRef()
  const analyticsCohortMenuRef = useRef()
  const analyticsDropdownRef = useRef()
  const cohortMenuInLineAnalyticsRef = useRef()
  const lineAnalyticsDropdownRef = useRef()
  

  const toggleCohortMenu = () => {
      setIsCohortMenuVisible(!isCohortMenuVisible);
  }

  const toggleCohortMenuInAnalytics = () => {
    setShowAnalyticsCohortMenu(!showAnalyticsCohortMenu)
  }

  const toggleCohortMenuInLineAnalytics = () => {
    setCohortMenuInLineAnalytics(!cohortMenuInLineAnalytics)
  }
  
// Cohort Menu outside-click, close-menu use-effect
useEffect(() => {
  const checkIfClickedOutside = e => {
    // If the menu is open and the clicked target is not within the menu, then close the menu
    if (isCohortMenuVisible && cohortMenuRef.current && rosterDropdownRef.current && !cohortMenuRef.current.contains(e.target) && !rosterDropdownRef.current.contains(e.target)) {
      setIsCohortMenuVisible(false)
    }
  }
  document.addEventListener("mousedown", checkIfClickedOutside)
  // Cleanup function
  return () => {
    document.removeEventListener("mousedown", checkIfClickedOutside)
  }
}, [isCohortMenuVisible])

//Cohort Menu IN CohortAnalytics Component outside-click
useEffect(() => {
  const checkIfClickedOutside = e => {
  if (showAnalyticsCohortMenu && analyticsCohortMenuRef.current && analyticsDropdownRef.current && !analyticsCohortMenuRef.current.contains(e.target) && !analyticsDropdownRef.current.contains(e.target)) {
    setShowAnalyticsCohortMenu(false)
  }
}
  document.addEventListener("mousedown", checkIfClickedOutside)
  return () => {
    document.removeEventListener("mousedown", checkIfClickedOutside)
  }
}, [showAnalyticsCohortMenu])

//Cohort Menu IN AnalyticsLineGraph Component outside-click
useEffect(() => {
  const checkIfClickedOutside = e => {
  if (cohortMenuInLineAnalytics && cohortMenuInLineAnalyticsRef.current && lineAnalyticsDropdownRef.current && !cohortMenuInLineAnalyticsRef.current.contains(e.target) && !lineAnalyticsDropdownRef.current.contains(e.target)) {
    setCohortMenuInLineAnalytics(false)
  }
}
  document.addEventListener("mousedown", checkIfClickedOutside)
  return () => {
    document.removeEventListener("mousedown", checkIfClickedOutside)
  }
}, [cohortMenuInLineAnalytics])


  return (
    <CohortContext.Provider 
      value ={{
        isPresent,
        setIsPresent,
        setSelectedCohort,
        selectedCohort,
        isCohortMenuVisible,
        toggleCohortMenu,
        cohortMenuRef,
        rosterDropdownRef,
        toggleCohortMenuInAnalytics,
        analyticsCohortMenuRef,
        showAnalyticsCohortMenu,
        analyticsDropdownRef,
        toggleCohortMenuInLineAnalytics,
        cohortMenuInLineAnalytics,
        cohortMenuInLineAnalyticsRef,
        lineAnalyticsDropdownRef
      }}>
      {children}
    </CohortContext.Provider>
  )

}

export default CohortContext;