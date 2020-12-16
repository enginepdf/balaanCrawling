import React from 'react';

import './collection-item.styles.scss';

const CollectionItem = ({ id, title, price, imageUrl, descriptionUrl }) => (
  <div className='collection-item'>
    <a
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`,
        cursor:'pointer'
      }}
      href={descriptionUrl}
    />
    <div className='collection-footer'>
      <span className='name'>{title}</span>
      <span className='price'>{price}</span>
    </div>
  </div>
);

export default CollectionItem;
