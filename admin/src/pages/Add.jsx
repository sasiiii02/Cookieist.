import React, {  useState } from "react";
import API from "../config/axios";
import toast from "react-hot-toast";


const Add = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Chocolate",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmmitHandler = async(e)=>{
    e.preventDefault();

    if(!image){
      toast.error("Please upload an image");
    }

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await API.post("/cookies/add",formData);

      if(response.data.success){
        toast.success("Cookie added successfully 🍪");
      }

      setData({
        name: "",
        description: "",
        price: "",
        category: "Chocolate",
      });
      setImage(null);


    } catch (error) {
      console.log(error);
      toast.error("Failed to add cookie");
    }

  }

 

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Add New Cookie
      </h1>

      <form className="space-y-6" onSubmit={onSubmmitHandler}>

        {/* Cookie Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cookie Name
          </label>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter cookie name"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            placeholder="Enter cookie description"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs.)
            </label>
            <input
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              type="number"
              placeholder="e.g. 450"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full border rounded-lg px-4 py-2 bg-white"
            >
              <option value="Chocolate">Chocolate</option>
              <option value="Vanilla">Vanilla</option>
              <option value="Oat">Oat</option>
              <option value="Special">Special</option>
            </select>
          </div>

        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cookie Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg px-4 py-2 bg-gray-50"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mt-4 max-w-48 max-h-48 rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-accent text-white px-8 py-2 rounded-full"
        >
          Add Cookie
        </button>

      </form>
    </div>
  );
};

export default Add;
