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
import { useMutation, useQuery } from 'react-query';
import { getLocalStorageValues } from '../../constants';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  refetchData,
  mutate,
  pathname,
}) => {
  const { mutate: createItem } = useMutation(mutate);
  const { data: apiCategories } = useQuery('/category');
  const categories = (apiCategories?.data || []).map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const { User } = getLocalStorageValues();
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
          if (pathname === 'product') {
            const filtered = {
              ...values,
              category: undefined,
              category_id: values.category?.value,
              image: values.image,
            };
            createItem(filtered, {
              onSuccess: async () => {
                toggleModal();
                await refetchData();
              },
            });
          } else {
            const category = {
              name: values.name,
              description: values.description,
              image: values.image,
              created_by: User._id,
              price: values.price,
            };
            createItem(category, {
              onSuccess: async () => {
                await refetchData();
                toggleModal();
              },
            });
          }
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
              <Label style={{ marginTop: 25 }}>
                <IntlMessages id="pages.price" />
              </Label>
              <Input
                name="price"
                value={values.price}
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
              <Label style={{ marginTop: 25 }}>
                <IntlMessages id="pages.image" />
              </Label>
              <Input
                name="image"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="d-flex flex-column mt-3">
                {values?.image && (
                  <img
                    src={values?.image}
                    alt="product"
                    width="200"
                    height="200"
                  />
                )}
              </div>
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
