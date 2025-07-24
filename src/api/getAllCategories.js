import axios from 'axios';
const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getAllCategories = async() => {
  
   const URL =`${BASE_URL}/categories`;
   try{
    const {data} = await axios.get(URL);
    return data;
   }catch(err){
    return err
   }
}

