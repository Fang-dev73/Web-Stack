import {useState, useEffect} from "react"
import axios from "axios";

export const useCategory = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try{
                const {data} = await axios.get('/categories');
                setCategories(data);
            }
            catch(err){
                console.log(err);
            }
        }

        getCategories();
    }, []);

    return {
        categories
    }
}