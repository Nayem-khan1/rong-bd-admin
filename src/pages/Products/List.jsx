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
import Loader from "../../components/common/Loader";
const List = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
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
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [currentProductId, setCurrentProductId] = useState(null);

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
    } finally {
      setLoading(false);
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

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        fetchList(); // Refresh product list
      } else {
        toast.error(response.data.message || "Failed to update product.");
      }
      closeModal();
    } catch (error) {
      console.error("Update failed:", error);
      closeModal();
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
      // Set all form values from product
      setCurrentProductId(product._id);
      setUpdatedName(product.name);
      setUpdatedDescription(product.description);
      setUpdatedCategory(product.category);
      setUpdatedSubCategory(product.subCategory);
      setUpdatedPrice(product.price);
      setUpdatedSizes(product.sizes || []);
      setIsBestseller(product.bestSeller || false);

      // Image preview (URLs only; real files can't be prefilled)
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);

      // If needed: preload image URLs in a separate state for preview only
      setImagePreviews([
        product.image?.[0] || null,
        product.image?.[1] || null,
        product.image?.[2] || null,
        product.image?.[3] || null,
      ]);

      openModal();
    },
    onDelete: () => removeProduct(product._id),
  }));

  if (loading) return <Loader />;
  return (
    <>
      <PageMeta
        title="Product List"
        description="Browse, edit, or delete products currently available in the store"
      />
      <PageBreadcrumb pageTitle="Product List" />
      <ComponentCard
        title={"Product List"}
        buttonTitle={"Add Product"}
        path="/add"
      >
        <BasicTableOne data={formattedProducts} type="product" />
      </ComponentCard>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Product
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Modify the details of your product.
            </p>
          </div>

          <form className="flex flex-col space-y-6">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <section>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Product Images
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <label htmlFor="image1">
                    <img
                      className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700"
                      src={
                        image1
                          ? URL.createObjectURL(image1)
                          : imagePreviews[0] || assets.upload_area
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
                        image2
                          ? URL.createObjectURL(image2)
                          : imagePreviews[1] || assets.upload_area
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
                        image3
                          ? URL.createObjectURL(image3)
                          : imagePreviews[2] || assets.upload_area
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
                        image4
                          ? URL.createObjectURL(image4)
                          : imagePreviews[3] || assets.upload_area
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

                <div className="mt-4">
                  <div className="w-full">
                    <Label>Product description</Label>
                    <TextArea
                      value={updatedDescription}
                      onChange={(value) => setUpdatedDescription(value)}
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
                      options={sizes}
                      defaultSelected={updatedSizes}
                      onChange={(values) => setUpdatedSizes(values)}
                    />
                    <p className="sr-only">
                      Selected Sizes: {updatedSizes.join(", ")}
                    </p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      options={categories}
                      placeholder="Select Category"
                      defaultValue={updatedCategory}
                      onChange={handleCategoryChange}
                    />
                  </div>
                  <div>
                    <Label>Sub Category</Label>
                    <Select
                      options={subCategories}
                      placeholder="Select Sub Category"
                      defaultValue={updatedSubCategory}
                      onChange={handleSubCategoryChange}
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <Checkbox
                      checked={isBestSeller}
                      onChange={setIsBestseller}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      Add to Bestseller
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleProductUpdate(currentProductId);
                }}
              >
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
