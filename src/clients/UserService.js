import axios from 'axios';

const USER_SERVICE_URL = "https://fullstack-test-navy.vercel.app/api/users/create";
const createUser = async (user) => {
    try {
        const response = await axios.post(USER_SERVICE_URL, user);
        if(response.status ==200) {
            return {result: "SUCCESS"};
        } else {
            return {result: "FAILURE", errorMessage: response.data.description};
        }
    }
    catch(error) {
        console.log(error);
        return {result: null, errorMessage: error.response.data.description};
    }
};

export default createUser;