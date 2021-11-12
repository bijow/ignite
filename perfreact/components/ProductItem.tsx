import { memo, useState } from "react";
import dynamic from 'next/dynamic';
import { AddProductToWishListProps } from "./AddProductToWishList";
// import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import("./AddProductToWishList").then(mod => mod.AddProductToWishList)
}, {
  loading: () => (<span>Carregando!</span>)
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormated: string;
  }
  onAddToWishList: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <>
      <div>{product.title} - <strong>{product.priceFormated}</strong></div>
      <button onClick={() => setIsAddingToWishList(true)}>ADD to s2</button>

     {isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
     )}
    </>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});