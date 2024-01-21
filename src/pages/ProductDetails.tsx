import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetSingleProductQuery } from '@/store/api/apiSlice';
import { IProduct } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/store/hook';
import { addToCart } from '@/store/features/cart/cartSlice';

export default function ProductDetails() {
  const { id } = useParams();

  //* new code

  const dispatch = useAppDispatch();

  const { data } = useGetSingleProductQuery(id);
  const product: IProduct = data?.data;

  //* new code ends here

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button
            onClick={() => {
              dispatch(addToCart(product));
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
