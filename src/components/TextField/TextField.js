import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

export const TextField = ({
  value = '',
  name,
  label,
  helperText,
  errorText,
  placeholder,
  isTextArea = false,
  touched = false,
  type,
  onChange = () => {},
}) => {
  const isInvalid = !!errorText;

  return (
    <FormControl isInvalid={isInvalid && touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      {isTextArea ? (
        <Textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
        />
      )}

      {isInvalid && touched && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};
