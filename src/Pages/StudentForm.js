import React, { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initState = {
  name: "",
  birthday: "",
  gender: "--Chọn Giới Tính--",
  address: "",
  avatar: "",
  email: "",
  SchoolYear: "--Chọn năm học",
  faculty: "--Chọn ngành--",
  CPA: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return { ...state, [action.field]: action.payload };
    case "FILE_CHANGE":
      return { ...state, avatar: action.payload };
    case "RESET_FORM":
      return initState;
    default:
      return state;
  }
};

function AddStudent({ addUser }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const [errors, setErrors] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (!state.name) {
      setErrors("Hãy nhập tên");
      return;
    }
    if (!state.birthday) {
      setErrors("Hãy nhập ngày sinh");
      return;
    }
    if (state.gender===initState.gender) {
      setErrors("Hãy chọn giới tính");
      return;
    }
    if (!state.address) {
      setErrors("Hãy nhập địa chỉ");
      return;
    }
    if (!state.email) {
      setErrors("Hãy nhập email");
      return;
    }
    if (state.SchoolYear===initState.SchoolYear) {
      setErrors("Hãy chọn năm học");
      return;
    }
    if (state.faculty===initState.faculty) {
      setErrors("Hãy chọn ngành");
      return;
    }
    if (state.CPA < 0 || state.CPA > 4) {
      setErrors("Giá trị CPA không hợp lệ");
      return;
    }
    addUser(state);
    dispatch({ type: "RESET_FORM" });
    alert("Thêm mới thành công")
    history("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "INPUT_CHANGE",
      field: name,
      payload: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      dispatch({
        type: "FILE_CHANGE",
        payload: imageUrl,
      });
    } else {
      const imageUrl = process.env.PUBLIC_URL + "/avatar.jpg";

      dispatch({
        type: "FILE_CHANGE",
        payload: imageUrl,
      });
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header style={{ backgroundColor: '#36ABFF', color: 'white' }}>
          <Modal.Title>Thêm sinh viên</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit} className="std-form">
            <Form.Group>
              <Form.Label htmlFor="name">Tên</Form.Label><br />
              <Form.Control type="text" id="name" name="name" onChange={handleChange} value={state.name} className="form-control" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="birthday">Ngày sinh</Form.Label><br />
              <Form.Control type="date" id="birthday" name="birthday" onChange={handleChange} value={state.birthday} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="gender">Giới tính</Form.Label><br />
              <Form.Select aria-label="Default select example" id="gender" name="gender" onChange={handleChange} value={state.gender}>
                <option value="">--Chọn giới tính--</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="address">Địa chỉ</Form.Label><br />
              <Form.Control type="text" id="address" name="address" onChange={handleChange} value={state.address} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="avatar">Avatar</Form.Label><br />
              <Form.Control type="file" id="avatar" name="avatar" onChange={handleFileChange} />
              {state.avatar && (<img src={state.avatar} alt="Nothing" width="150" height="150"/>)}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label><br />
              <Form.Control type="text" id="email" name="email" onChange={handleChange} value={state.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="SchoolYear">Năm học</Form.Label><br />
              <Form.Select id="SchoolYear" name="SchoolYear" onChange={handleChange} value={state.SchoolYear}>
                <option value="">--Chọn năm học--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="faculty">Ngành</Form.Label><br />
              <Form.Select id="faculty" name="faculty" onChange={handleChange} value={state.faculty}>
                <option value="">--Chọn ngành học--</option>
                <option value="IT1">IT1</option>
                <option value="IT2">IT2</option>
                <option value="IT3">IT3</option>
                <option value="IT4">IT4</option>
                <option value="IT5">IT5</option>
                <option value="IT6">IT6</option>
                <option value="IT7">IT7</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="CPA">CPA</Form.Label><br />
              <Form.Control type="number" id="CPA" name="CPA" step="0.01" onChange={handleChange} value={state.CPA} />
            </Form.Group>
            <br />
            {errors && <p style={{color: "red"}}>{errors}</p>}
            <Button variant="primary" type="submit">Create</Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default AddStudent;
