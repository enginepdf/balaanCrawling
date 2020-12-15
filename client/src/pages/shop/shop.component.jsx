import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import './shop.styles.scss';

const ShopPage = ({items}) => (
      <div className='shop-page'>
        {items
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))}
      </div>
    );

export default ShopPage;
