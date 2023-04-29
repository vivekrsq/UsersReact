import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserForm({ add }) {
    const [showAlert, setShowAlert] = useState({
        show: false,
        type: 1,
        msg: ""
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mob, setMob] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('mob', mob);
        data.append('file', selectedImage);

        // console.log(data)
        const status = await add(data);
        if (status.status === 1) {
            setEmail("")
            setMob("");
            setName("");
            setSelectedImage(null)
        }

        setShowAlert({ show: true, type: status.status, msg: status.msg });
        setTimeout(() => {
            setShowAlert({ show: false })
        }, 3000)
    }
    return (
        <>{
            showAlert.show &&
            <Alert variant={showAlert.type === 1 ? "success" : "danger"}>
                {showAlert.msg}
            </Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} value={name} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile No." onChange={(e) => { setMob(e.target.value) }} value={mob} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control type="file" name="file" onChange={(e)=>{setSelectedImage(e.target.files[0])}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default UserForm;