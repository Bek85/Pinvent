import './ProductForm.scss';
import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '@/components/card/Card';
import FormProvider from '@/components/product/product-form/FormProvider';
import InputField from '@/components/product/product-form/InputField';
import ReactQuillCustom from '@/components/react-quill-custom/ReactQuillCustom';
import {
  createProduct,
  updateProduct,
} from '@/redux/features/product/productThunk';
import { dispatch } from '@/redux/store';

const productFormSchema = yup.object({
  image: yup.string().required('Image is required').nullable(true),
  name: yup.string().required('Product name is required'),
  category: yup.string().required('Category is required'),
  price: yup.string().required('Price is required'),
  qty: yup.string().required('Quantity is required'),
  description: yup.string().required('Description is required'),
});

export default function ProductForm({ isEdit = false, product }) {
  const [imagePreview, setImagePreview] = useState(null);

  const defaultValues = useMemo(
    () => ({
      image: product?.image.filePath || '',
      name: product?.name || '',
      category: product?.category || '',
      qty: product?.qty || '',
      price: product?.price || '',
      description: product?.description || '',
      sku: product?.sku || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
  );

  const methods = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    modules,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && product) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, product]);

  const onSubmit = async (data) => {
    const sku = generateKSKU(product.category);
    const file = getValues('image');
    data.sku = sku;
    data.image = file;
    const { name, category, qty, price, description, image } = data;

    let formData = new FormData();
    Object.keys(data).forEach((fieldName) => {
      formData.append(fieldName, data[fieldName]);
    });

    isEdit
      ? dispatch(
          updateProduct({
            name,
            category,
            qty,
            price,
            description,
            image,
            id: product._id,
          })
        )
      : dispatch(createProduct(formData));
  };

  const onFileChange = (evt) => {
    const file = evt.target.files[0];
    const newFile = URL.createObjectURL(file);
    setImagePreview(newFile);

    if (file) {
      setValue('image', file, { shouldValidate: true });
    }
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + '-' + number;
    return sku;
  };

  return (
    <div className='add-product'>
      <Card cardClass='card'>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card cardClass='group'>
            <label htmlFor=''>Product Image</label>
            <code className='--color-dark'>
              Supported formats: jpg, jpeg, png
            </code>
            <input
              type='file'
              name='image'
              placeholder='Image'
              onChange={onFileChange}
            />
            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt='product image' />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}

            <span className='error'>{errors.image?.message}</span>
          </Card>
          <InputField
            name='name'
            label='Product Name'
            error={errors}
            register={register}
          />
          <InputField
            name='category'
            label='Product Category'
            error={errors}
            register={register}
          />
          <InputField
            name='price'
            label='Product Price'
            error={errors}
            register={register}
          />
          <InputField
            name='qty'
            label='Product Quantity'
            error={errors}
            register={register}
          />
          <label>Product Description</label>
          <Controller
            name='description'
            control={control}
            rules={{
              required: 'Please enter task description',
            }}
            theme='snow'
            modules={modules}
            render={({ field }) => (
              <ReactQuillCustom
                field={field}
                placeholder='Please write a short description'
                onChange={(text) => {
                  field.onChange(text);
                }}
              />
            )}
          />
          <span className='error'>{errors.description?.message}</span>

          <button type='submit' className='--btn --btn-primary --btn-block '>
            {isEdit ? 'Save changes' : 'Create a new product'}
          </button>
        </FormProvider>
      </Card>
    </div>
  );
}
