import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  driverLicense: Yup.string().required('A CNh é obrigatória'),
  name: Yup.string().required('O nome é obrigatório'),
});
