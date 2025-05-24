import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../App";
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
import BasicTableOne from "../../components/tables/BasicTableOne";
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
  const formattedProducts = list.map((product) => ({
    _id: product._id,
    name: product.name,
    category: product.category,
    subCategory: product.subCategory,
    bestSeller: product.bestSeller,
    price: product.price,
    image: product.image?.[0] || "",
    onEdit: () => {
      // Prefill form values here before opening modal
      setUpdatedName(product.name);
      setUpdatedDescription(product.description);
      setUpdatedCategory(product.category);
      setUpdatedSubCategory(product.subCategory);
      setUpdatedPrice(product.price);
      setUpdatedSizes(product.sizes || []);
      setIsBestseller(product.bestSeller || false);
      openModal();
    },
    onDelete: () => removeProduct(product._id),
  }));

  return (
    <>
      <PageMeta
        title="All Products page"
        description="All Product Page description"
      />
      <PageBreadcrumb pageTitle="All Products" />
      <ComponentCard title={"Product List"}>
        <BasicTableOne data={formattedProducts} type="product" />
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
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Upload Image
                </h5>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
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
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Product information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
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

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="w-full">
                    <Label>Product description</Label>
                    <TextArea
                      value={updatedDescription}
                      onChange={(value) => setUpdatedDescription(value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div>
                    <MultiSelect
                      label="Product Sizes"
                      options={sizes}
                      onChange={(values) => setUpdatedSizes(values)}
                    />
                    <p className="sr-only">
                      Selected Values: {updatedSizes.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
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
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="flex items-center gap-3 mt-2">
                    <Checkbox
                      checked={isBestSeller}
                      onChange={setIsBestseller}
                    />
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Add to Bestseller
                    </span>
                  </div>
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
