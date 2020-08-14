interface LoginData {
    email: string,
    password: string
}

const isEmpty = (value:string) => {
	if (value.trim() === '') return true;
	else return false;
};

export const validateLoginData = (data : LoginData) => {
   let errors :LoginData = {email:"",password:''};
   if (isEmpty(data.email)) errors.email = 'Must not be empty';
   if (isEmpty(data.password)) errors.password = 'Must not be  empty';
   return {
       errors,
       valid: Object.keys(errors).length === 0 ? true : false
    };
};