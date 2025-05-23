import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../../App";
import toast from "react-hot-toast";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/Input";
import Button from "../../components/ui/button/Button";
import { assets } from "../../assets/assets";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/form/Select";
import MultiSelect from "../../components/form/MultiSelect";
import Checkbox from "../../components/form/input/Checkbox";
import {TrashBinIcon} from "../../icons"
const List = () => {
  const { token } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const [list, setList] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedSizes, setUpdatedSizes] = useState([]);
  const [isBestSeller, setIsBestseller] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleProductUpdate = async (productId) => {
    const formData = new FormData();

    // Append required fields
    formData.append("productId", productId);
    formData.append("name", updatedName);
    formData.append("description", updatedDescription);
    formData.append("price", updatedPrice);
    formData.append("category", updatedCategory);
    formData.append("subCategory", updatedSubCategory);
    formData.append("sizes", JSON.stringify(updatedSizes));
    formData.append("bestSeller", isBestSeller.toString());

    // if (image1File) formData.append("image1", image1File);
    // if (image2File) formData.append("image2", image2File);
    // if (image3File) formData.append("image3", image3File);
    // if (image4File) formData.append("image4", image4File);

    try {
      const response = axios.post(backendUrl + "/api/product/update", {
        method: "POST",
        formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      const data = await response.json();
      console.log(data);
      console.log("Saving changes...");
      closeModal();
    } catch (error) {
      console.error("Update failed:", error);
      console.log("Saving changes...");
      closeModal();
    }
    console.log("Saving changes...");
    closeModal();
  };
  const categories = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Kids", label: "Kids" },
  ];
  const subCategories = [
    { value: "Topwear", label: "Topwear" },
    { value: "Bottomwear", label: "Bottomwear" },
    { value: "Winterwear", label: "Winterwear" },
  ];
  const sizes = [
    { value: "S", text: "S", selected: false },
    { value: "M", text: "M", selected: false },
    { value: "L", text: "L", selected: false },
    { value: "XL", text: "XL", selected: false },
    { value: "XXL", text: "XXL", selected: false },
  ];
  const handleCategoryChange = (value) => {
    setUpdatedCategory(value);
  };
  const handleSubCategoryChange = (value) => {
    setUpdatedSubCategory(value);
  };
  return (
    <>
      <PageMeta
        title="All Products page"
        description="All Product Page description"
      />
      <PageBreadcrumb pageTitle="All Products" />
      <ComponentCard title={"Product List"}>
        <div className="flex flex-col gap-2">
          {/* List Table Title */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm rounded">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* Product List */}
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text-sm border border-gray-300 rounded-xl"
            >
              <img className="w-12" src={item.image[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <div className="flex justify-center items-center">
                <button
                  onClick={openModal}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                      fill=""
                    />
                  </svg>
                  Edit
                </button>
                <p
                  onClick={() => removeProduct(item._id)}
                  className=" hover:bg-red-400 p-3 rounded-full text-red-500 cursor-pointer hover:text-white"
                >
                  <TrashBinIcon/>
                </p>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Product
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your product.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <div>
                  <p className="mb-2">Upload Image</p>
                  <div className="flex gap-2">
                    <label htmlFor="image1">
                      <img
                        className="w-20"
                        src={
                          !image1
                            ? assets.upload_area
                            : URL.createObjectURL(image1)
                        }
                        alt=""
                      />
                      <input
                        onChange={(e) => setImage1(e.target.files[0])}
                        type="file"
                        id="image1"
                        hidden
                      />
                    </label>
                    <label htmlFor="image2">
                      <img
                        className="w-20"
                        src={
                          !image2
                            ? assets.upload_area
                            : URL.createObjectURL(image2)
                        }
                        alt=""
                      />
                      <input
                        onChange={(e) => setImage2(e.target.files[0])}
                        type="file"
                        id="image2"
                        hidden
                      />
                    </label>
                    <label htmlFor="image3">
                      <img
                        className="w-20"
                        src={
                          !image3
                            ? assets.upload_area
                            : URL.createObjectURL(image3)
                        }
                        alt=""
                      />
                      <input
                        onChange={(e) => setImage3(e.target.files[0])}
                        type="file"
                        id="image3"
                        hidden
                      />
                    </label>
                    <label htmlFor="image4">
                      <img
                        className="w-20"
                        src={
                          !image4
                            ? assets.upload_area
                            : URL.createObjectURL(image4)
                        }
                        alt=""
                      />
                      <input
                        onChange={(e) => setImage4(e.target.files[0])}
                        type="file"
                        id="image4"
                        hidden
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <Label htmlFor="input">Product Name</Label>
                    <Input
                      onChange={(e) => setUpdatedName(e.target.value)}
                      value={updatedName}
                      type="text"
                      placeholder="Type Here"
                      id="input"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label>Product description</Label>
                  <TextArea
                    value={updatedDescription}
                    onChange={(value) => setUpdatedDescription(value)}
                    rows={6}
                  />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col w-full">
                  <div>
                    <Label className="mb-2">Product category</Label>
                    <Select
                      options={categories}
                      placeholder="Select Option"
                      onChange={handleCategoryChange}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Sub category</Label>
                    <Select
                      options={subCategories}
                      placeholder="Select Option"
                      onChange={handleSubCategoryChange}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Product Price</Label>
                    <Input
                      onChange={(e) => setUpdatedPrice(e.target.value)}
                      value={updatedPrice}
                      type="number"
                      placeholder="250"
                      id="input"
                    />
                  </div>
                </div>
                <div>
                  <MultiSelect
                    label="Multiple Select Options"
                    options={sizes}
                    defaultSelected={["1", "3"]}
                    onChange={(values) => setUpdatedSizes(values)}
                  />
                  <p className="sr-only">
                    Selected Values: {updatedSizes.join(", ")}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <Checkbox checked={isBestSeller} onChange={setIsBestseller} />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Add to Bestseller
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleProductUpdate}>
                Update
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default List;
