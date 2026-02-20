// import React, { useEffect, useState } from 'react'
// import "./List.css"
// import axios from "axios"
// import { toast } from 'react-toastify';
// const List = () => {
//    const url= "http://localhost:4000";

//   const [list,setList]=useState([]);

//   const fetchList=async()=>{
//     const response=await axios.get(`${url}/api/food/list`);
//     console.log(response.data)
//     if(response.data.success){
//       setList(response.data.data);
//     }else{
//       toast.error("Error")
//     }

//   }

//   const removeFood=async(foodId)=>{
//              const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
//              await fetchList()
//              if (response.data.message) {
//               toast.success(response.data.message)
              
//              }else{
//               toast.error("Error");
//              }
//   }
//   useEffect(()=>{
//     fetchList()
//   },[])
//   return (
//     <div className='list add flex-col'>
//       <p>All Foods List</p>
//       <div className='list-table'>
//         <div className='list-table-format title'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//           return(
//             <div key={index} className='list-table-format'>
//               <img src={`${url}/images/`+item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.price}</p>
//               <p onClick={()=>removeFood(item._id)}>X</p>

//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List
























// import React, { useEffect, useState } from "react";
// import "./List.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const List = () => {
//   const url = "http://localhost:4000"; // Backend base URL
//   const [list, setList] = useState([]);

//   // Fetch all foods from backend
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${url}/api/food/list`);
//       if (response.data.success) {
//         setList(response.data.data);
//       } else {
//         toast.error("Failed to fetch food list");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while fetching foods");
//     }
//   };

//   // Remove a food item
//   const removeFood = async (foodId) => {
//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       if (response.data.message) {
//         toast.success(response.data.message);
//         await fetchList(); // Refresh the list after deletion
//       } else {
//         toast.error("Failed to remove food");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while removing food");
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p>All Foods List</p>
//       <div className="list-table">
//         {/* Table Header */}
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {/* Table Rows */}
//         {list.map((item, index) => (
//           <div key={index} className="list-table-format">
//             {/* Display Cloudinary Image */}
//             <img
//               src={item.image} // <- Use direct Cloudinary URL
//               alt={item.name}
//               className="food-image"
//               onError={(e) => (e.target.src = "/fallback-image.png")} // optional fallback
//             />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>₹{item.price}</p>
//             <p onClick={() => removeFood(item._id)} className="remove-btn">
//               X
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;












import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  // const API_BASE_URL = "http://localhost:4000/api/food";
  const [list, setList] = useState([]);

  // Fetch all foods
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching food list");
    }
  };

  // Remove food
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Error removing food");
    }
  };

  // Toggle Available / Unavailable
  const toggleAvailability = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/toggle-availability`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message || "Status Updated");
        fetchList();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        {/* Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Status</b>
          <b>Action</b>
        </div>

        {/* Rows */}
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img
              src={item.image}
              alt={item.name}
              className="food-image"
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />

            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>

            {/* Availability Button */}
            <button
              onClick={() => toggleAvailability(item._id)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                color: "white",
                background: item.isAvailable
                  ? "linear-gradient(45deg,#00c853,#64dd17)"
                  : "linear-gradient(45deg,#ff1744,#ff5252)",
                boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                transition: "0.3s",
              }}
            >
              {item.isAvailable ? "🔥 SELL FAST" : "❌ UNAVAILABLE"}
            </button>

            <p
              onClick={() => removeFood(item._id)}
              className="remove-btn"
              style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
