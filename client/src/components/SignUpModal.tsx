import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignUpCredentials } from '../network/notes_api';

import * as NotesApi from '../network/notes_api';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputFeild from './form/TextInputField';

import utilStyles from '../styles/utils.module.css';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUp: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUp }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(creds: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(creds);
      onSignUp(newUser);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputFeild
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
          />
          <TextInputFeild
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={utilStyles.width100}
          >
            SignUp
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
