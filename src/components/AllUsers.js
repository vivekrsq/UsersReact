import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AllUsers({ data, onDelete, onEdit }) {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        mob: ""
    })
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const confirmDelete = (id)=>{
        setShowDeleteModal(true);
        setDeleteId(id)
    }

    const closeDeleteModal = ()=> setShowDeleteModal(false)

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
        setShow(true)
        
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${id}`);
        const responseJson = await response.json()
        console.log(responseJson);
        setUser({
            id: responseJson._id,
            name: responseJson.name,
            email: responseJson.email,
            mob: responseJson.mob
        })
       
    };

    const handleSubmit = ()=>{
        console.log(user);
        onEdit(user.id, user)
        setShow(false);
    }

    const handleDelete = (id) => {
        onDelete(id);
        setShowDeleteModal(false)
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => (

                        <tr key={data._id}>
                            <td><img src={`${process.env.REACT_APP_SERVER}/uploads/`+data.image} width="50" alt="user"/></td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.mob}</td>
                            <td>
                                <Button variant="primary" className="m-2" onClick={()=>handleShow(data._id)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                <Button variant="danger" onClick={() => { confirmDelete(data._id) }}><FontAwesomeIcon icon={faTrashCan} /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={(e)=>{setUser({...user, name: e.target.value})}} value={user.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>{setUser({...user, email: e.target.value})}} value={user.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile No." name="mob" onChange={(e)=>{setUser({...user, mob: e.target.value})}} value={user.mob} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* delete modal */}
            <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are your sure you want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { handleDelete(deleteId) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllUsers;