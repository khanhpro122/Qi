import React,{useEffect, useState} from 'react'
import axios from 'axios'
import TreeGraph from './TreeGraph'

function Data() {
    let [data, setData] = useState([])
    let [token, setToken] = useState('')
    const getToken = async () => {
        await axios.post('https://api-dev.hrms.com.vn/api/v1/login', {
            username: 'giangbv@qi.com.vn',
            password: '123456'
        })
        .then(function (response) {
            setToken(response.data.message.access_token || response.data.message.refresh_token);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    useEffect(  () => {
        getToken()
    },[])
    const handleLogin = () => {
        console.log(token)
        localStorage.setItem('access_token', token)
    }
    let tokenLocal = localStorage.getItem('access_token')
    let getData = async () => {
        let res = await axios.get('https://api-dev.hrms.com.vn/api/v1/companystructure', { headers: {"Authorization" : `Bearer ${tokenLocal}`} })
        setData(res.data)
    }
    
    useEffect(() => {
        getData()
    },[])
    var newData = data && data.message && data.message.map(function(item) {
        var o = Object.assign({}, item);
        o.department_manager = {
            "id": 12312312,
            "type_name": "Giám đốc",
            "first_name": "Minh",
            "last_name": "Nguyễn Hồng",
            "image_profile": "https://st.quantrimang.com/photos/image/2021/01/18/anh-hoan-hao-1.jpg"
        }
        return o;
    })    
    return (
        <div>
            <button
            onClick={handleLogin}
            >Login</button>
            <TreeGraph data={newData}/>
        </div>
    )
}

export default Data
