import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import toast from "react-hot-toast";
import { assets } from "./../../assets/assets";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import { useAuth } from "../../context/AuthContext";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/Input";
import TextArea from "../../components/form/input/TextArea";
import MultiSelect from "../../components/form/MultiSelect";
import Select from "../../components/form/Select";
import Checkbox from "../../components/form/input/Checkbox";
import Button from "../../components/ui/button/Button";
import { BoxIcon } from "../../icons";

const Add = () => {
  const { token } = useAuth();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission
      const toastId = toast.loading("Adding...");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

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
      toast.success(response.data.message, { id: toastId });
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
      } else {
      toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      console.error(error);
    toast.error("Product Addition Failed", { id: toastId });
    }finally {
      setLoading(false);
    }
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
  const productSizes = [
    { value: "S", text: "S", selected: false },
    { value: "M", text: "M", selected: false },
    { value: "L", text: "L", selected: false },
    { value: "XL", text: "XL", selected: false },
    { value: "XXL", text: "XXL", selected: false },
  ];
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleSubCategoryChange = (value) => {
    setSubCategory(value);
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
            <section>
              <p className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Upload Image
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label htmlFor="image1">
                  <img
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700"
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
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700"
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
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700"
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
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700"
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
            </section>

            <section className="mt-5">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Product Information
              </h5>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="">
                  <Label htmlFor="input">Product Name</Label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Type Here"
                    id="input"
                  />
                </div>
                <div>
                  <Label className="mb-2">Product Price</Label>
                  <Input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    placeholder="250"
                    id="input"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full">
                  <Label>Product description</Label>
                  <TextArea
                    value={description}
                    onChange={(value) => setDescription(value)}
                    rows={3}
                  />
                </div>
              </div>
            </section>

            <section className="mt-4">
              <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Additional Details
              </h5>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <MultiSelect
                    label="Product Sizes"
                    options={productSizes}
                    defaultSelected={sizes}
                    onChange={(values) => setSizes(values)}
                  />
                  <p className="sr-only">Selected Sizes: {sizes.join(", ")}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    options={categories}
                    placeholder="Select Category"
                    defaultValue={category}
                    onChange={handleCategoryChange}
                  />
                </div>
                <div>
                  <Label>Sub Category</Label>
                  <Select
                    options={subCategories}
                    placeholder="Select Sub Category"
                    defaultValue={subCategories}
                    onChange={handleSubCategoryChange}
                  />
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <Checkbox checked={bestseller} onChange={setBestseller} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Add to Bestseller
                  </span>
                </div>
              </div>
            </section>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              endIcon={<BoxIcon className="size-5" />}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default Add;
