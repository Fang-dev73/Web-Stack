import {useState, useEffect} from "react"
import axios from "axios";

export const useLatestPosts = () => {
    const [latestPosts, setLatestPosts] = useState([])

    useEffect(() => {
        const getLatestPosts = async () => {
            try{
                const {data} = await axios.get('/posts/1');
                setLatestPosts(data);
            }
            catch(err){
                console.log(err);
            }
        }

        getLatestPosts();
    }, []);

    return {
        latestPosts
    }
}
