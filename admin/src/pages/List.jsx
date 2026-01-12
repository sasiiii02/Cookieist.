import React, { useEffect, useState } from "react";
import API from "../config/axios";
import toast from "react-hot-toast";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await API.get("/cookies/list");

      if (response.data.success) {
        setList(response.data.data); 
      } else {
        toast.error("Failed to fetch cookies");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const removeCookie= async(cookieId) =>{
    const response = await API.post("/cookies/remove",{id:cookieId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading cookies...
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Cookie List 🍪</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No cookies found
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-4">
              <img
                src={`http://localhost:4000/images/${item.image}`}
                alt={item.name}
                className="w-14 h-14 rounded object-cover"
              />

                  </td>

                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">Rs. {item.price}</td>

                  <td className="p-4">
                    <button onClick={()=>{removeCookie(item._id)}}
                    className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default List;
