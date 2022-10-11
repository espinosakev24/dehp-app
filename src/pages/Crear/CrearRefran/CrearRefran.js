import React, { useEffect, useRef } from 'react';
import { TextField } from 'components';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';

import {
  FormControl,
  FormLabel,
  Box,
  Flex,
  Button,
  CheckboxGroup,
  Checkbox,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { isoGlosaOptions } from './options';
import * as Yup from 'yup';

const refranSchema = Yup.object().shape({
  lema: Yup.string().required(),
  actoDeHabla: Yup.string().required(),
  isoglosa: Yup.array().required(),
  significado: Yup.string().required(),
});

export const CrearRefran = () => {
  const toast = useToast();

  const image = useRef();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      lema: '',
      isoglosa: [],
      actoDeHabla: '',
      significado: '',
    },
    validationSchema: refranSchema,
    onSubmit: values => {
      if (!image.current) {
        toast({
          title: 'Tienes campos sin llenar',
          description: 'Todos los campos son obligatorios',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const fd = new FormData();

      fd.append('lema', values.lema);
      fd.append('actoDeHabla', values.actoDeHabla);
      fd.append('isoglosa', values.isoglosa);
      fd.append('significado', values.significado);
      fd.append('file', image.current, image.current.name);

      axios
        .post('https://diccionario-backend.herokuapp.com/refran', fd)
        .then(() => {
          navigate('/refranes');
          toast({
            title: 'Refrán creado',
            description: 'Tu refrán fue creado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        });
    },
  });

  const onUploadImage = e => {
    image.current = e;
    console.log(e);
  };

  useEffect(() => {
    return () => {
      image.current = null;
    };
  }, []);

  return (
    <Box h="500px" overflowY="scroll">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Lema:"
          name="lema"
          onChange={formik.handleChange}
          value={formik.values.lema}
          errorText={formik.errors.lema}
          touched={formik.touched.lema}
        />

        <FormControl
          my="24px"
          isInvalid={!!formik.errors.isoglosa && formik.touched.isoglosa}
        >
          <Box>
            <FormLabel>Isoglosa:</FormLabel>
          </Box>
          <CheckboxGroup value={formik.values.isoglosa}>
            <Flex gap="12px">
              {isoGlosaOptions.map((element, index) => (
                <Checkbox
                  name="isoglosa"
                  key={`${element}-${index}`}
                  value={element}
                  onChange={formik.handleChange}
                >
                  {element}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>

          {!!formik.errors.isoglosa && formik.touched.isoglosa && (
            <FormErrorMessage>{formik.errors.isoglosa}</FormErrorMessage>
          )}
        </FormControl>

        <TextField
          label="Acto de habla:"
          name="actoDeHabla"
          onChange={formik.handleChange}
          value={formik.values.actoDeHabla}
          errorText={formik.errors.actoDeHabla}
          touched={formik.touched.actoDeHabla}
        />

        <TextField
          isTextArea
          label="Significado"
          name="significado"
          onChange={formik.handleChange}
          value={formik.values.significado}
          errorText={formik.errors.significado}
          touched={formik.touched.significado}
        />

        <Box>
          <FormControl>
            <FormLabel>Sube una image:</FormLabel>
            <Flex>
              <FileUploader
                handleChange={onUploadImage}
                name="file"
                types={['png', 'jpg']}
              />
            </Flex>
          </FormControl>
        </Box>
        <Flex justify="center" my="20px">
          <Button type="submit" colorScheme="blue">
            Guardar refrán
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
