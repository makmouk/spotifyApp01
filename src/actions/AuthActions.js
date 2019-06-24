import { Actions } from 'react-native-router-flux';

export const loginUser = () => {
  return () => {
    loginUserSuccess();
  };
};

 


const loginUserSuccess = () => {
  Actions.main();
};
