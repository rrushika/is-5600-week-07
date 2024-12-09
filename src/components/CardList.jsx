import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data);

  useEffect(() => {
    const paginatedProducts = data.slice(offset, offset + limit);
    setProducts(paginatedProducts);
  }, [offset, limit, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) =>
      tagQuery ? product.tags.some(({ title }) => title === tagQuery) : true
    );
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= data.length}
        />
      </div>
    </div>
  );
};

export default CardList;
