import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { removeFromBasket } from "../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 md:flex-row md:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          fill
          style={{ objectFit: "contain" }}
          alt="Product Image"
        />
      </div>

      <div className="flex flex-1 items-end md:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl md:flex-row md:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            ₹ {items.reduce((total, item) => total + item.price, 0)}
          </h4>
          <button
            onClick={removeItemFromBasket}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
