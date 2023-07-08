import * as yup from 'yup';

export const chatbotValidationSchema = yup.object().shape({
  chatbot_data: yup.string().required(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
