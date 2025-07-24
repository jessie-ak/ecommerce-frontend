import { useEffect, useState } from "react"
import { getAllCategories } from "../../api/getAllCategories"

export const Sidebar=({ onMinChange, onMaxChange, onApplyFilterClick})=>{

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        (async()=>{
            const categorys = await getAllCategories();
            setCategories(categorys);
        })()
    },[])

    
    return(
        <>
        <section className=" px-4 bg-gray-200" >
        <div>
            <h1 className="mt-5 text-gray-900 text-2xl ">Filters</h1>
        </div>
        <div className=" category mt-5 ">
            <ul >
                {categories?.length>0 && categories.map((category)=><li>{category.name}</li>)}
            </ul>
        </div>
        <div className="prices text-gray-900">
            <div>
             <h1 className="text-2xl mt-5">Price</h1>
            </div>
            <div className="flex flex-row gap-2  mt-3">
                <div>
                    <label className="opacity-75"> min  </label>
                <input onChange={(e)=>{onMinChange(e.target.value)}} className="w-20 px-1 py-1 text-sm h-8 border rounded" type="number" placeholder={'0'} />
                </div>
                
                <div>
                    <label className="opacity-75"> max  </label>
                <input onChange={(e)=>{onMaxChange(e.target.value)}} className="w-20 px-1 py-1 text-sm h-8 border rounded" type="number" placeholder={'0'} />
                </div>
                
            </div>
            <div className="flex flex-wrap justify-center mt-2 mb-2 p-1 border-2 border-gray-900  rounded bg-slate-50">
                <button onClick={onApplyFilterClick} >Apply Filters</button>
            </div>
            
        </div>
        </section>
        </>
    )
}