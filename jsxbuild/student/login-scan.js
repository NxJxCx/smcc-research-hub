import React from "react";
import Scanner from "../qrscan";
function StudentLogin() {
    const [studentId, setStudentId] = React.useState('');
    const onResult = React.useCallback((studentName, studentId) => {
        if (!!studentId) {
            setStudentId(studentId);
        }
    }, []);
    const onLogin = React.useCallback((e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const studentId = formData.get('studentId');
        const password = formData.get('password');
        // TODO: implement authentication logic here
        console.log("Login auth: (ID: ", studentId, ", Password: ", password, ")");
    }, [studentId]);
    return !studentId ? (React.createElement("div", null,
        React.createElement("div", { className: "text-[32px] font-[700] text-center mt-16" }, "Student Login"),
        React.createElement(Scanner, { className: "mt-4", onResult: onResult, regExFormat: [/^[A-Z\w]+/, /20\d{7}$/] }),
        React.createElement("div", { className: "mt-8 text-center font-bold" }, "Scan your Student ID QR Code"))) : (React.createElement("div", null,
        React.createElement("form", { onSubmit: onLogin },
            React.createElement("div", { className: "text-[24px] font-[700] text-center mt-16" }, "Student Login"),
            React.createElement("div", { className: "flex justify-center mt-4" },
                React.createElement("input", { type: "text", className: "p-4 w-full border-2 border-gray-300 rounded-lg", placeholder: "Student ID", readOnly: true, value: studentId })),
            React.createElement("div", { className: "flex justify-center mt-4" },
                React.createElement("input", { type: "password", className: "p-4 w-full border-2 border-gray-300 rounded-lg", placeholder: "Password" })),
            React.createElement("div", { className: "flex justify-center mt-8" },
                React.createElement("button", { type: "submit", className: "bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700" }, "Login")))));
}
export default StudentLogin;
