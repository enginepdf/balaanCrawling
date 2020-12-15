import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, ...otherProps }) => (
  <button className='custom-button' {...otherProps}>
    {children}
  </button>
);

export default CustomButton;

// <CustomButton a='1' b='2' c='3' />
//  <span>123</span>
//  <span>456</span>
//  </CustomButton>   --> otherProps is {a:1, b:2, c:3} and children would be [<span>123</span>, <span>456</span>]