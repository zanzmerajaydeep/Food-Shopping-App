import axios from "axios"

const getAllFoods=()=>{
    return axios.get("http://localhost:8080/food");
}
export const addUserDataToServer=(data)=>{
    axios.post(`http://localhost:8081/addUser`, data);
}

export default getAllFoods