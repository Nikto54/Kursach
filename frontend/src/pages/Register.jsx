import Form from "../components/LoginAndRegisterForm.jsx";

function Register () {
    return <Form route="/api/v1/users/" method="register" />
}

export default Register