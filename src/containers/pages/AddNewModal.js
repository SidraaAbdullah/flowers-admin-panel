/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import { Formik } from 'formik';
import { CREATE_PRODUCT } from 'queries/product';
import { useMutation, useQuery } from 'react-query';

const AddNewModal = ({ modalOpen, toggleModal, refetchProducts }) => {
  const [image, setImage] = useState('');
  const { mutate: createProduct } = useMutation(CREATE_PRODUCT);
  const { data: apiCategories } = useQuery('/category');
  const categories = (apiCategories?.data || []).map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const onImageChange = (event) => {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <Formik
        initialValues={{
          name: '',
          category: '',
          description: '',
        }}
        onSubmit={async (values) => {
          const filtered = {
            ...values,
            category: undefined,
            category_id: values.category?.value,
            image,
          };
          createProduct(filtered);
          await refetchProducts();
          toggleModal();
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="pages.add-new-modal-title" />
            </ModalHeader>
            <ModalBody>
              <Label>
                <IntlMessages id="pages.product-name" />
              </Label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Label className="mt-4">
                <IntlMessages id="pages.category" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="category"
                options={categories}
                value={values.category}
                onChange={(data) => setFieldValue('category', data)}
              />
              <Label className="mt-4">
                <IntlMessages id="pages.description" />
              </Label>
              <Input
                type="textarea"
                name="description"
                id="exampleText"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="d-flex flex-column mt-3">
                <input
                  multiple
                  id="openImage"
                  type="file"
                  onChange={onImageChange}
                />
                {image && (
                  <img src={image} alt="product" width="200" height="200" />
                )}
              </div>
              <Label className="mt-4">
                <IntlMessages id="pages.status" />
              </Label>
              <CustomInput
                type="radio"
                id="onHold"
                name="customButton"
                label="ON HOLD"
                onChange={(e) => setFieldValue('status', e.target.id)}
              />
              <CustomInput
                type="radio"
                id="processed"
                name="customButton"
                label="PROCESSED"
                onChange={(e) => setFieldValue('status', e.target.id)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="pages.cancel" />
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                <IntlMessages id="pages.submit" />
              </Button>{' '}
            </ModalFooter>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewModal;
