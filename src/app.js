//import form from './components/UI/form/form'
import registrationForm from './pageRSS/modules/registrationForm/controllers/form'

const app = () => {

  /*   const initialState = {
    form: {
      valid: true,
      formData: {
        url: '',
      },
      statusFeedback: {
        errors: {
          errInvalid: 'form.errors.errInvalid',
          errRepeat: 'form.errors.errRepeat',
          errInvalidRSS: 'form.errors.errInvalidRSS',
          errNetwork: 'form.errors.errNetwork',
        },
        statusValid: {
          rssValid: 'form.rssValid',
        },
        activeStatus: '',
      },
    },
    feeds: [],
    posts: [],
  } */

  //form()
  registrationForm()
}

app()
