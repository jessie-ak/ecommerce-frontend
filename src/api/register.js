import axios from 'axios';
export const registration =async (name, email, password, avatar)=>{
    const url = 'https://api.escuelajs.co/api/v1/users/';
    const {data} = await axios.post(url,{
        name: name,
        email:email,
        password:password,
        avatar : avatar
    })
    return data;
}