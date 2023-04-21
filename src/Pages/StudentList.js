import React from "react";
import Users from "./Users";
import Pagination from "./Pagination";
import { useState } from "react"



function StudentList({users}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [userPerPage, setUserPerPage] = useState(10);

    const indexOfLastStudent = currentPage * userPerPage;
    const indexOfFirstStudent = indexOfLastStudent - userPerPage;
    const currentStudents = users.slice(indexOfFirstStudent, indexOfLastStudent)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div className="student-list">
            <Users currentStd={currentStudents} indexStd={indexOfFirstStudent} />
            <Pagination userPerPage={userPerPage} totalUsers={users.length} paginate={paginate} setUserPerPage={setUserPerPage} />
        </div>

    );
}

export default StudentList;