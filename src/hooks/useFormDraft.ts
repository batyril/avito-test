import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useFormDraft = (storageKey: 'Form') => {
  const { watch, setValue } = useFormContext();
  const formData = watch();

  useEffect(() => {
    const draftData = localStorage.getItem(storageKey);
    if (draftData) {
      const parsedData = JSON.parse(draftData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue, storageKey]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  }, [formData, storageKey]);

  return;
};

export default useFormDraft;
