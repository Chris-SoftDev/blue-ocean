import AdminContent from "../components/AdminContent";
import AdminNavigationSidebar from "../components/AdminNavigationSidebar";
import "../css/AdminDashboard.css"
import { DataProvider } from "../context/DataContext";
import { RosterFilterProvider } from "../context/RosterFilterContext";

function AdminDashboard() {
    return (
        <DataProvider>
            <div className="admin-dashboard-container">
                <div className="admin-dashboard-navigation">
                    <AdminNavigationSidebar />
                </div>
                <div className="admin-dashboard-content-container">
                    <RosterFilterProvider>
                        <AdminContent />
                    </RosterFilterProvider>
                </div>
            </div>
        </DataProvider>
     );
}

export default AdminDashboard;