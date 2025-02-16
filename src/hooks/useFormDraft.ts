import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useFormDraft = (storageKey: 'Form', isEditMode: boolean) => {
  const { watch, setValue } = useFormContext();
  const formData = watch();

  useEffect(() => {
    if (isEditMode) return;

    const draftData = localStorage.getItem(storageKey);
    if (draftData) {
      const parsedData = JSON.parse(draftData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue, storageKey, isEditMode]);

  useEffect(() => {
    if (isEditMode) return;

    if (Object.keys(formData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  }, [formData, storageKey, isEditMode]);

  return;
};

export default useFormDraft;
