import { Card } from "react-bootstrap"
import { Button, Modal } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom";
import { UsersContext } from "../App";
import { useContext, useState } from "react";


function ShowStd() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = JSON.parse(searchParams.get("user"));
    const linkStyle = {
        textDecoration: "none",
        color: "#ffffff",
    };

    const { users, setUsers } = useContext(UsersContext);
    const [show, setShow] = useState(false)
    const [deleteUser, setDeleteUser] = useState({})
    const handleClick = (user) => {
        
        setShow(true);
        console.log("Trạng thái: "+ show)
        setDeleteUser(user);
    }

    const handleDelete = (user) => {
        const newUsers = users.filter(item => item.id !== user.id);
        setUsers(newUsers);
        setShow(false);
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div>
            <Card style={{ width: '600px', margin: 'auto' }}>
                <Card.Header style={{ backgroundColor: '#36ABFF', color: 'white' }}>
                    <Card.Title>Thông tin sinh viên</Card.Title>
                </Card.Header>
                <Card.Img style={{ float: "right", width: "150px", height: "150px" }} variant="top" src={user.avatar} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        <p><strong>Tên: </strong>{user.name}</p>
                        <p><strong>Ngày sinh:</strong> {user.birthday}</p>
                        <p><strong>Giới tính:</strong> {user.gender}</p>
                        <p><strong>Địa chỉ:</strong> {user.address}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Năm học:</strong> {user.SchoolYear}</p>
                        <p><strong>Ngành:</strong> {user.faculty} </p>
                        <p><strong>CPA:</strong> {user.CPA}</p>
                    </Card.Text>
                    <Link to={`/Edit?user=${JSON.stringify(user)}`} style={linkStyle}>
                        <Button variant="outline-info">
                            Sửa
                        </Button>{' '}
                    </Link>
                    <Button variant="outline-danger" onClick={() => handleClick(user)}>Xóa</Button>
                </Card.Body>
            </Card>
            {
                show && <Modal show={show} onHide={handleClose} >
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
                        <Button variant="danger" onClick={() => handleDelete(deleteUser)}>
                            <Link to="/" style={linkStyle}>Xóa</Link>
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
}

export default ShowStd;
