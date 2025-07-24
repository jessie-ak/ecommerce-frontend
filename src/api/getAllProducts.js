import axios from 'axios';
const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getAllProducts = async() => {
  
   const URL =`${BASE_URL}/products`;
   try{
    const {data} = await axios.get(URL);
    return data;
   }catch(err){
    return err
   }
}

