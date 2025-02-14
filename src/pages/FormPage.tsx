import Layout from '../components/Layout';
import BaseForm from '../components/BaseForm';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryForm from '../components/CategoryForm';

import { Heading, Stack, useToast } from '@chakra-ui/react';

import { FORM_STEPS } from '../const/formSteps.ts';
import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '../services/api.ts';
import { Post } from '../model/posts.ts';
import ROUTES from '../const/routes.ts';
import { useNavigate, useParams } from 'react-router-dom';
import clearDraft from '../helper/clearDraft.ts';
import { EditIcon } from '@chakra-ui/icons';

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

  useLayoutEffect(() => {
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
      clearDraft('Form');
      return;
    }
    await addPost(data);

    clearDraft('Form');
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
        <Stack alignItems={'baseline'} direction={'row'} spacing='24px'>
          <Heading as='h1' size='xl' mb={4}>
            {id ? 'Редактирование объявления' : 'Новое объявление'}
          </Heading>
          {id && <EditIcon boxSize={6} />}
        </Stack>

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
