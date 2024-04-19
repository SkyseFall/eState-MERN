import React from 'react'

export default function CreateListing() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a List</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' id='name' maxLength={"62"} minLength={"10"} required
                        className='border p-3 rounded-lg' />
                    <input type="text" placeholder='Description' id='description' required
                        className='border p-3 rounded-lg' />
                    <input type="text" placeholder='Address' id='address' required
                        className='border p-3 rounded-lg' />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' />
                            <span>Parting spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bedrooms' min={'1'} max={'10'} required className='p-3 border border-gray-300 rounded-lg' />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bathrooms' min={'1'} max={'10'} required className='p-3 border border-gray-300 rounded-lg' />
                            <span>Bathrooms</span>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input type="number" id='regularprice' className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-sm'>($/month)</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='discountedprice' className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Discounted price</p>
                                <span className='text-sm'>($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gfap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" name="" id="images" accept='image/*' multiple />
                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-90'>Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >Create listing</button>
                </div>
            </form>
        </main>
    )
}