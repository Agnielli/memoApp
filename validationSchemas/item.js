import * as yup from 'yup'

export const itemValidationSchema = yup.object().shape({
     itemTitle: yup
      .string()
      .min(3, 'Too short!')
      .max(100, 'Too long!'),
    itemText: yup
      .string()
      .min(5, 'Too short!')
      .max(1500, 'Too long!')
})