import jwtDecode from 'jwt-decode';

const isRecruiterAuthenticated = () => {
    try {
        const { role } = jwtDecode(localStorage.getItem("token"));
        return !(("recruiter").localeCompare(role));
    } catch (error) {
        return;
    }
};

const isUserAuthenticated = () => {
    try {
        const { role } = jwtDecode(localStorage.getItem("token"));
        return !(("user").localeCompare(role));
    } catch (error) {
        return;
    }
};

const VerifyAuthentication = {isRecruiterAuthenticated, isUserAuthenticated};
export default VerifyAuthentication;