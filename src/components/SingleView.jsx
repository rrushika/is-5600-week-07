import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const SingleView = ({ data }) => {
  const { id } = useParams();
  const product = data.find((product) => product._id === id) || {};
  const user = product.user || {};

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls?.regular})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={user.instagram_username || ''}
          />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <p>{title}</p>
        </div>
        <div className="gray db pv2">&hearts; <span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <button className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-green">Add to Cart</button>
      </div>
    </article>
  );
};

export default SingleView;
