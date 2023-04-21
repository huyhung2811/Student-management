import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../App";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import {Modal} from "react-bootstrap"

const Users = ({ currentStd, indexStd }) => {
    const linkStyle = {
        textDecoration: "none",
        color: "#000000",
    };

    const { users, setUsers } = useContext(UsersContext);
    const [show, setShow] = useState(false)
    const [deleteUser, setDeleteUser] = useState({})
    const handleClick = (user) => {
        setShow(true);
        setDeleteUser(user);
    }

    const handleDelete = (user) => {
        const newUsers = users.filter(item => item.id !== user.id);
        setUsers(newUsers);
        setShow(false);
    }
    
    const handleClose = ()=> {
        setShow(false);
    }

    return (
        <Table striped bordered hover>
            <thead style={{ backgroundColor: "rgb(171 171 171)" }}>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Năm</th>
                    <th>Ngành</th>
                    <th>CPA</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentStd.map((user, index) => (
                        <tr key={user.id} className="table-row" style={{ border: ' 1px solid #000000' }}>
                            <td>{indexStd + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.birthday}</td>
                            <td>{user.gender}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            <td>{user.SchoolYear}</td>
                            <td>{user.faculty}</td>
                            <td>{user.CPA}</td>
                            <td>
                                <Link to={`/Show?user=${JSON.stringify(user)}`} style={linkStyle}>
                                    <Button variant="info">
                                        <i className="fa-regular fa-eye" style={{ color: '#ffffff' }}></i>
                                    </Button>{' '}
                                </Link>
                                <Link to={`/Edit?user=${JSON.stringify(user)}`} style={linkStyle}>
                                    <Button variant="info">
                                        <i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i>
                                    </Button>{' '}
                                </Link>
                                <Button variant="danger" onClick={() => handleClick(user)}>
                                    <i className="fa-sharp fa-solid fa-trash" style={{ color: '#ffffff' }}></i>
                                </Button></td>
                        </tr>
                    ))
                }
                {
                    show&&<Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                      <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Bạn có chắc chắn muốn xóa?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Hủy
                      </Button>
                      <Button variant="danger" onClick={()=>handleDelete(deleteUser)}>
                        Xóa
                      </Button>
                    </Modal.Footer>
                  </Modal>
                }
            </tbody >
        </Table>

    )
}

export default Users;