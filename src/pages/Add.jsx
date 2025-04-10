
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets.js';

const Add = ({ token }) => {

    const backendUrl = "https://grain-app-backend.onrender.com";

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState('');
    const [grade, setGrade] = useState('');
    const [supplier, setSupplier] = useState('');
    const [status, setStatus] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("quantity", quantity);
            formData.append("price", price);
            formData.append("unit", unit);
            formData.append("grade", grade);
            formData.append("supplier", supplier);
            formData.append("status", status);

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);
            
            const response = await axios.post(backendUrl + "/api/grains/", formData, { headers: { token } })
            console.log(response.data.success);
            
            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setType('');
                setQuantity(0);
                setPrice(0);
                setUnit('');
                setGrade('');
                setSupplier('');
                setStatus('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-5'>Upload Images</p>

                <div className='flex gap-2'>
                    <label htmlFor="image1" className='w-20 cursor-pointer'>
                        <img src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="upload" />
                        <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
                    </label>

                    <label htmlFor="image2" className='w-20 cursor-pointer'>
                        <img src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="upload" />
                        <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
                    </label>

                    <label htmlFor="image3" className='w-20 cursor-pointer'>
                        <img src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="upload" />
                        <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
                    </label>

                    <label htmlFor="image4" className='w-20 cursor-pointer'>
                        <img src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="upload" />
                        <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
                    </label>

                </div>
            </div>

            <div className='w-full'>
                <div className='mb-3'>Product Name</div>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Set type</div>
                <input onChange={(e) => setType(e.target.value)} value={type} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Quantity</div>
                <input onChange={(e) => setQuantity(e.target.value)} value={quantity} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="Number" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Unit</div>
                <input onChange={(e) => setUnit(e.target.value)} value={unit} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Grade</div>
                <input onChange={(e) => setGrade(e.target.value)} value={grade} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Price</div>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="Number" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Supplier</div>
                <input onChange={(e) => setSupplier(e.target.value)} value={supplier} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <div className='mb-3'>Status</div>
                <input onChange={(e) => setStatus(e.target.value)} value={status} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>

            </div>
            <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>Add product</button>

        </form>
    )
}

export default Add
