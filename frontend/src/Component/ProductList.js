import React, { useEffect, useState } from 'react';
// import AddVarientForm from './AddVarientForm';
// import AddProductForm from './AddProductForm';
// import PurchaseForm from './PurchaseForm';
// import { FaPlus, FaShoppingCart } from 'react-icons/fa';

function ProductTable() {
  const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showPurchaseForm, setShowPurchaseForm] = useState(false);
//   const [purchasedProduct, setPurchasedProduct] = useState('');
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [variantsData, setVariantsData] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState([]);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/assesst')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

//   const handleToggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handlePurchaseClick = () => {
//     setShowPurchaseForm(!showPurchaseForm);
//   };

//   const handlePurchaseSubmit = (productName) => {
//     setPurchasedProduct(productName);
//     setShowPurchaseForm(false);
//   };

//   const handleAddVariant = (product) => {
//     setSelectedProductId(product.productid);
//   };

//   const handleDeleteVariant = (productId) => {
//     // Fetch variants for the selected product
//     if (productId !== null) {
//       fetch(`http://localhost:8080/variants1/${productId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setVariantsData(data);
//           setSelectedVariants(data.map((variant) => variant.id));
//           setDeleteConfirmation(true);
//           console.log('Fetched variants:', data);
//           console.log('Variant IDs:', selectedVariants);
//         })
//         .catch((err) => console.log(err));
//     }
//   };
  
//   const handleVariantAdded = () => {
//     // Fetch updated variants data for the selected product
//     if (selectedProductId !== null) {
//       fetch(`http://localhost:8080/variants/${selectedProductId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setVariantsData(data);
//         })
//         .catch((err) => console.log(err));
//     }
  
//     // Variant added, clear the selection
//     setSelectedProductId(null);
//   };
  
//   const handleCheckboxChange = (variantId) => {
//     if (selectedVariants.includes(variantId)) {
//       // Deselect the variant
//       setSelectedVariants(selectedVariants.filter((id) => id !== variantId));
//     } else {
//       // Select the variant
//       setSelectedVariants([...selectedVariants, variantId]);
//     }
//   };
  
  

//   const handleDeleteConfirmation = () => {
//     if (selectedVariants.length === 0) {
//       return; // No variants selected for deletion
//     }
  
//     // Log the selected variants before sending the request
//     console.log('Selected Variants:', selectedVariants);
  
//     // Send a request to delete the selected variants
//     fetch('http://localhost:8080/variants/delete', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ variantIds: selectedVariants }),
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           // Successfully deleted, update the UI
//           // You can choose to refresh the data or remove the deleted variants from the UI
//           setVariantsData(variantsData.filter((variant) => !selectedVariants.includes(variant.id)));
//           setSelectedVariants([]);
//           setDeleteConfirmation(false);
//         } else {
//           // Handle any errors, e.g., display an error message
//           console.error('Error deleting variants');
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting variants:', error);
//       });
//   };

  return (
    <div className="p-4 bg-gray-100">
      {/* <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePurchaseClick}
        >
          <FaShoppingCart className="mr-2" /> Purchase
        </button>
        <h2 className="text-2xl font-bold text-center">Product List</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggleForm}
        >
          <FaPlus className="mr-2" /> Add New Product
        </button>
      </div> */}
      <table className="w-full table-auto bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">PRODUCT</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Variants</th>
            <th className="border p-2">Values</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border">
              <td className="border p-2">{d.ID}</td>
              <td className="border p-2">{d.productName}</td>
               <td className="border p-2">
                <img src={`http://localhost:5000/backend/uploads/${d.productImage}`} alt={d.productName} style={{ maxWidth: '100px' }} />
              </td>
              <td className="border p-2">{d.productDescription}</td>
              
              <td className="border p-2">{d.Variants}</td>
              <td className="border p-2">{d.variantValues}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-2 "
                //   onClick={() => handleAddVariant(d)}
                >
                  Add Variant
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                //   onClick={() => handleDeleteVariant(d.productid)}
                >
                  Delete Variant
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* <p className="text-xl text-black-500">
        Click
        <span className="text-xl text-blue-500">
          <u>Add Variant</u>
        </span>{" "}
        Button to add a variant to a product
      </p> */}
      {/* {showForm && <AddProductForm />}
      {showPurchaseForm && <PurchaseForm />}
      {selectedProductId !== null && (
        <AddVarientForm
          productId={selectedProductId}
        //   onVariantAdded={handleVariantAdded}
        />
      )} */}
      {/* {deleteConfirmation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2 text-black text-center">
            Delete Variants
          </h2>
          {variantsData.length > 0 ? (
            <div>
              {variantsData.map((variant) => (
  <label key={variant} className="block mt-2 text-black">
    <input
      type="checkbox"
      checked={selectedVariants.includes(variant)}
    //   onChange={() => handleCheckboxChange(variant)}
      className="mr-2 text-black-500"
    />
    {variant}
  </label>
))}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                // onClick={handleDeleteConfirmation}
              >
                Delete Selected Variants
              </button>
            </div>
          ) : (
            <p className="text-red-700">No variants found for deletion.</p>
          )}
        </div>
      )} */}
    </div>
  );
}

export default ProductTable;
