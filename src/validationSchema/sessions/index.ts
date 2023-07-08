import * as yup from 'yup';

export const sessionValidationSchema = yup.object().shape({
  session_data: yup.string().required(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
