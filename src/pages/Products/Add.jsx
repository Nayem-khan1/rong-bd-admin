import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import toast from "react-hot-toast";
import { assets } from "./../../assets/assets";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [Sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(Sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      console.log(formData);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Product Addition Failed");
    }
  };

  return (
    <>
      <PageMeta title="Add Product" description="This page is product Add" />
      <PageBreadcrumb pageTitle="Add Product" />
      <div className="space-y-6">
        <ComponentCard title="Add Product">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3"
          >
            <div>
              <p className="mb-2">Upload Image</p>
              <div className="flex gap-2">
                <label htmlFor="image1">
                  <img
                    className="w-20"
                    src={
                      !image1 ? assets.upload_area : URL.createObjectURL(image1)
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
                      !image2 ? assets.upload_area : URL.createObjectURL(image2)
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
                      !image3 ? assets.upload_area : URL.createObjectURL(image3)
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
                      !image4 ? assets.upload_area : URL.createObjectURL(image4)
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
              <p className="mb-2">Product Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Type Here"
                className="w-full max-w-[500px] px-3 py-2"
              />
            </div>
            <div className="w-full">
              <p className="mb-2">Product description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                placeholder="Write content here"
                className="w-full max-w-[500px] px-3 py-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
              <div>
                <p className="mb-2">Product category</p>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full px-3 py-2"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div>
                <p className="mb-2">Sub category</p>
                <select
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                  className="w-full px-3 py-2"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>
              <div>
                <p className="mb-2">Product Price</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="899"
                  className="w-full max-w-[120px] px-3 py-2"
                />
              </div>
            </div>
            <div>
              <p className="mb-2">Product Sizes</p>
              <div className="flex gap-3">
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("S")
                        ? prev.filter((item) => item !== "S")
                        : [...prev, "S"]
                    )
                  }
                >
                  <p
                    className={`${
                      Sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    S
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("M")
                        ? prev.filter((item) => item !== "M")
                        : [...prev, "M"]
                    )
                  }
                >
                  <p
                    className={`${
                      Sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    M
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("L")
                        ? prev.filter((item) => item !== "L")
                        : [...prev, "L"]
                    )
                  }
                >
                  <p
                    className={`${
                      Sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    L
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("XL")
                        ? prev.filter((item) => item !== "XL")
                        : [...prev, "XL"]
                    )
                  }
                >
                  <p
                    className={`${
                      Sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XL
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("XXL")
                        ? prev.filter((item) => item !== "XXL")
                        : [...prev, "XXL"]
                    )
                  }
                >
                  <p
                    className={`${
                      Sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XXL
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="checkbox"
                id="bestseller"
                className="mr-2"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
              />
              <label className="cursor-pointer" htmlFor="bestseller">
                Add to Bestseller
              </label>
            </div>
            <button
              type="submit"
              className="w-28 mt-4 px-4 py-2 bg-black text-white"
            >
              ADD
            </button>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default Add;
