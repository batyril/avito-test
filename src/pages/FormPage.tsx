import Layout from '../components/Layout';
import BaseForm from '../components/BaseForm';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryForm from '../components/CategoryForm';

import { Heading, useToast } from '@chakra-ui/react';

import { FORM_STEPS } from '../const/formSteps.ts';
import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '../services/api.ts';
import { Post } from '../model/posts.ts';
import ROUTES from '../const/routes.ts';
import { useNavigate, useParams } from 'react-router-dom';

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: postData } = useGetPostByIdQuery(id, {
    skip: !id,
  });

  const [addPost, { isError, isSuccess }] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [step, setStep] = useState(FORM_STEPS.BASE);
  const toast = useToast();

  const formMethods = useForm();

  useEffect(() => {
    if (postData) {
      formMethods.reset(postData);
    }
  }, [postData, formMethods]);

  const onNext = () => {
    setStep(FORM_STEPS.CATEGORY);
  };

  const onBack = () => {
    setStep(FORM_STEPS.BASE);
  };

  const onSubmit = async (data: Post) => {
    if (id) {
      await updatePost({ id, newPost: data });
      navigate(`/item/${id}`);
      //TODO: добавить обработку успешного обновления и ошибки
      return;
    }
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
          {step === FORM_STEPS.CATEGORY && (
            <CategoryForm onSubmit={onSubmit} onBack={onBack} />
          )}
        </FormProvider>
      </div>
    </Layout>
  );
};

export default FormPage;
