import * as yup from 'yup'

const registerSchema = yup.object().shape({
  name: yup.string().required('Ovo polje je obavezno !'),
  email: yup.string().email().required('Ovo polje je obavezno !'),
  password: yup
    .string()
    .min(4, 'Šifra može da sadrži minimum 4 karaktera !')
    .max(12, 'Šifra može da sadrži maksimum 12 karaktera !')
    .required(),
})

export { registerSchema }
