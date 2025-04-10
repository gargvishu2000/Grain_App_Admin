import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {

    const backendUrl = "https://grain-app-backend.onrender.com";

    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/grains/", { headers: { token } });
            if (response.data.success) {
                setList(response.data.grains);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const removeGrain = async (id) => {
        try {
            const response = await axios.delete(backendUrl + "/api/grains/delete/"+id, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchList();
    }, [removeGrain])

    return (
        <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Quantity</b>
          <b>Price</b>
          <b className='items-center'>Action</b>
        </div>
        {/* Product list  */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>₹ {item.price}</p>
              <p onClick={()=> removeGrain(item._id)} className='text-right cursor-pointer text-lg md:text-center'>X</p>
            </div>
          ))
        }
      </div>
    </>
    )
}

export default List;