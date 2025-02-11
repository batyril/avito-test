import Layout from '../components/Layout';
import BaseForm from '../components/BaseForm';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryForm from '../components/CategoryForm';

import { Heading, useToast } from '@chakra-ui/react';

import { FORM_STEPS } from '../const/formSteps.ts';
import { useCreatePostMutation } from '../services/api.ts';
import { Post } from '../model/posts.ts';
import ROUTES from '../const/routes.ts';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [step, setStep] = useState(FORM_STEPS.BASE);
  const navigate = useNavigate();
  const toast = useToast();
  const [addPost, { isError, isSuccess }] = useCreatePostMutation();

  const formMethods = useForm({
    defaultValues: {
      name: '',
      description: '',
      location: '',
      type: '',
      image: '',
    },
  });

  const onNext = () => {
    setStep(FORM_STEPS.CATEGORY);
  };

  const onSubmit = async (data: Post) => {
    await addPost(data);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при создании объявления',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
    if (isSuccess) {
      navigate(ROUTES.LIST);
    }
  }, [isError, isSuccess, navigate, toast]);

  return (
    <Layout>
      <div>
        <Heading as='h1' size='xl' mb={4}>
          Новое объявление
        </Heading>

        <FormProvider {...formMethods}>
          {step === FORM_STEPS.BASE && <BaseForm onNext={onNext} />}
          {step === FORM_STEPS.CATEGORY && <CategoryForm onSubmit={onSubmit} />}
        </FormProvider>
      </div>
    </Layout>
  );
};

export default FormPage;
