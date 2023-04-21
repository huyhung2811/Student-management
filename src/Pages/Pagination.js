import React from "react";

function Pagination ({ userPerPage, totalUsers, paginate, setUserPerPage}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalUsers/userPerPage); i++ ){
        pageNumbers.push(i)
    }

    const handleChange = (event) => {
        const perPage = parseInt(event.target.value);
        setUserPerPage(perPage);
        paginate(1);
      };

    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map(number=>(
                        <li key={number} className="pagination-item">
                            <a onClick ={()=>paginate(number)} href = "#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
                <select value = {userPerPage} onChange={handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </ul>
        </nav>
    )
}

export default Pagination;