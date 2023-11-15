import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  regex: RegExp;
  maxLength?: number;
  validationMessage: string;
  keyboardType?: 'numeric' | 'email-address' | 'default' | 'phone-pad';
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  editable?: boolean;
  isValidate: boolean;
}

export function TextField({
  label,
  name,
  onChange,
  regex,
  defaultValue,
  validationMessage,
  isValidate,
  ...props
}: TextFieldProps) {
  const [text, setText] = useState(defaultValue || '');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (value: string) => {
    const isValid = regex.test(value);
    if (!isValid) {
      setErrorMessage(validationMessage);
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (defaultValue) {
      handleChange(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (isValidate) {
      validate(text);
    }
  }, [isValidate]);

  const handleChange = (value: string) => {
    setText(value);
    onChange(name, value);
    if (errorMessage) {
      validate(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        onChangeText={handleChange}
        defaultValue={defaultValue}
        onEndEditing={() => validate(text)}
        {...props}
        style={styles.input}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});
