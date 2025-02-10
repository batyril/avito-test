import Layout from '../components/Layout';
import BaseForm from '../components/BaseForm';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryForm from '../components/CategoryForm';

import { Heading } from '@chakra-ui/react';

import { FORM_STEPS } from '../const/formSteps.ts';

const FormPage = () => {
  const [step, setStep] = useState(FORM_STEPS.BASE);
  const formMethods = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      category: '',
    },
  });

  const onNext = () => {
    setStep(FORM_STEPS.CATEGORY);
  };

  const onSubmit = (data: unknown) => {
    console.log('Отправка данных', data);
  };

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
