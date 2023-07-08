import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  feedback_data: yup.string().required(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
