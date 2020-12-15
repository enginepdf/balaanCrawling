import React from 'react';

import './collection-item.styles.scss';

const CollectionItem = ({ title, price, imageUrl, descriptionUrl }) => (
  <div className='collection-item'> 
    <div 
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`,
        cursor:'pointer'
      }}
      onclick="location.href="
    />
    <div className='collection-footer'>
      <span className='name'>{title}</span>
      <span className='price'>{price}</span>
    </div>
  </div>
);

export default CollectionItem;
