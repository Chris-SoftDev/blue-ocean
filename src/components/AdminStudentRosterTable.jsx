import { useContext, useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table"
import DataContext from "../context/DataContext";
import RosterFilterContext from "../context/RosterFilterContext";
import "../css/AdminStudentRosterTable.css"

function AdminStudentRosterTable() {
    const { cohortStudents, setSelectedStudent, isMaxStudentRosterVisible } = useContext(DataContext)
    const { rosterGlobalFilter } = useContext(RosterFilterContext)

    const COLUMNS = [
        {
            Header: "Name",
            accessor: "name",
            imageAccessor: "picture",
            Cell: ({value, row}) => {
                return (
                    <div className="student-roster-profile-container" onClick={() => setSelectedStudent(row.original)}>
                        <div className="student-roster-profile-pic"><img src={row.original.picture} alt="student profile image" /></div>
                        <div className="student-roster-name">{value}</div>
                    </div>
                )
            },
        },
        {
            Header: "Last Login Date",
            accessor: "last_login",
            Cell: ({ value }) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return <div>{formattedDate}</div>;
            },
        },
        {
            Header: "Avg Grade",
            accessor: "average_grade",
            Cell: ({value}) => {
                return <div className="student-roster-average-grade">{value}</div>
            }
        },
        {
            Header: "Status",
            accessor: "is_present",
            Cell: ({value}) => {
                return (
                    <div className="student-roster-status">
                        {value ? 
                            <div className="student-roster-present">
                                Present
                            </div> 
                        : 
                            <div className="student-roster-absent">
                                Absent
                            </div> 
                        }
                    </div>
                )
            }
        },
    ];
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => cohortStudents, [cohortStudents])

    const tableInstance = useTable({
        columns,
        data,
        initialState: isMaxStudentRosterVisible ? { pageSize: 11 } : { pageSize: 5 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        canNextPage, 
        canPreviousPage, 
        pageOptions,
        state,
        setGlobalFilter, 
        prepareRow 
    } = tableInstance

    const { pageIndex } = state;

    useEffect(() => {
        setGlobalFilter(rosterGlobalFilter)
    }, [rosterGlobalFilter])
    
    return (
        <div className="student-roster-table-container">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? 
                                                <>&nbsp;&nbsp;<i className="fa fa-caret-down"></i></>
                                            : 
                                                <>&nbsp;&nbsp;<i className="fa fa-caret-up"></i></>
                                        ) : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="student-roster-pagination-container" style={cohortStudents.length === 0 ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}><i className="fa-solid fa-angles-left"></i></button>
                <span>Page: {pageIndex + 1} of {pageOptions.length}</span>
                <button onClick={() => nextPage()} disabled={!canNextPage}><i className="fa-solid fa-angles-right"></i></button>
            </div>      
        </div>
    );
}

export default AdminStudentRosterTable;