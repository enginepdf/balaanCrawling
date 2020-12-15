import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = ({toggleLogin}) => (
  <div className='sign-in-and-sign-up'>
    <SignIn toggleLogin={toggleLogin}/>
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
