import React, { useEffect, useRef } from 'react';
import { TextField } from 'components';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';

import {
  FormControl,
  FormLabel,
  Select,
  Box,
  Flex,
  Button,
  CheckboxGroup,
  Checkbox,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { gramaticalInfo, hiperonimoOptions, isoGlosaOptions } from './options';
import * as Yup from 'yup';

const wordSchema = Yup.object().shape({
  lema: Yup.string().required(),
  infoGramatical: Yup.string().required(),
  hiperonimo: Yup.string().required(),
  etimologia: Yup.string().required(),
  isoglosa: Yup.array().required(),
  significado: Yup.string().required(),
  ejemplo: Yup.string().required(),
});

export const CrearPalabra = () => {
  const toast = useToast();

  const image = useRef();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      lema: '',
      infoGramatical: '',
      hiperonimo: '',
      etimologia: '',
      isoglosa: '',
      significado: '',
      ejemplo: '',
    },
    validationSchema: wordSchema,
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
      fd.append('informacion_gramatical', values.infoGramatical);
      fd.append('hiperonimo', values.hiperonimo);
      fd.append('etimologia', values.etimologia);
      fd.append('significado', values.significado);
      fd.append('ejemplo', values.ejemplo);
      fd.append('file', image.current, image.current.name);
      fd.append('isoglosa', values.isoglosa);

      axios
        .post('https://diccionario-backend.herokuapp.com/palabra', fd)
        .then(() => {
          navigate('/palabras');
          toast({
            title: 'Palabra creada',
            description: 'Tu palabra fue creada con éxito',
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

        <br />
        <FormControl
          isInvalid={
            !!formik.errors.infoGramatical && formik.touched.infoGramatical
          }
        >
          <FormLabel>Información gramatical:</FormLabel>
          <Select
            name="infoGramatical"
            placeholder="Selecciona una opción"
            onChange={formik.handleChange}
            value={formik.infoGramatical}
          >
            {gramaticalInfo.map((element, index) => (
              <option value={element} key={`${element}-${index}`}>
                {element}
              </option>
            ))}
          </Select>
          {!!formik.errors.infoGramatical && formik.touched.infoGramatical && (
            <FormErrorMessage>{formik.errors.infoGramatical}</FormErrorMessage>
          )}
        </FormControl>
        <br />
        <FormControl
          isInvalid={!!formik.errors.hiperonimo && formik.touched.hiperonimo}
        >
          <FormLabel>Hiperónimo:</FormLabel>
          <Select
            placeholder="Selecciona una opción"
            name="hiperonimo"
            onChange={formik.handleChange}
            value={formik.hiperonimo}
          >
            {hiperonimoOptions.map((element, index) => (
              <option value={element} key={`${element}-${index}`}>
                {element}
              </option>
            ))}
          </Select>
          {!!formik.errors.hiperonimo && formik.touched.hiperonimo && (
            <FormErrorMessage>{formik.errors.hiperonimo}</FormErrorMessage>
          )}
        </FormControl>
        <br />
        <TextField
          isTextArea
          label="Etimología:"
          name="etimologia"
          onChange={formik.handleChange}
          value={formik.values.etimologia}
          errorText={formik.errors.etimologia}
          touched={formik.touched.etimologia}
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
          isTextArea
          label="Significado"
          name="significado"
          onChange={formik.handleChange}
          value={formik.values.significado}
          errorText={formik.errors.significado}
          touched={formik.touched.significado}
        />
        <TextField
          isTextArea
          label="Ejemplo"
          name="ejemplo"
          onChange={formik.handleChange}
          value={formik.values.ejemplo}
          errorText={formik.errors.ejemplo}
          touched={formik.touched.ejemplo}
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
            Guardar palabra
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
