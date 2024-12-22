import Form from "../components/LoginAndRegisterForm.jsx";

function Login () {
    return <Form route="/api/v1/jwt/create/" method="login"/>
}

export default Login