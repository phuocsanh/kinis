import {Pressable, View, ViewProps} from 'components/base';
import {Text, TextProps} from 'components/base/Text';
import {TextInput, TextInputProps} from 'components/base/TextInput';
import React, {ReactElement, useState} from 'react';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import {COLORS} from 'themes/color';
import {NUMBER_FORMAT} from 'utils/helper';
import {EyeOff, Eye} from 'lucide-react-native';
export type FormInputProps<F extends FieldValues> = {
  isAction?: boolean;
  control: Control<F>;
  name: FieldPath<F>;
  label?: string;
  messageError?: string;
  editable?: boolean;
  required?: boolean;
  errProps?: TextProps;
  labelProps?: TextProps;
  containerProps?: ViewProps;
  inputContainerProps?: ViewProps;
  toggleHiddenPassword?: boolean;
  renderInput?: (
    props: Pick<TextInputProps, 'value' | 'onChangeText' | 'onBlur'>,
  ) => ReactElement;
  renderLabel?: (label?: string, required?: boolean) => ReactElement;
  renderError?: (error?: FieldError) => ReactElement;
  renderRight?: () => ReactElement;
  transformInputValue?:
    | 'card'
    | 'price'
    | 'number'
    | ((value: string) => string);
} & TextInputProps;

const toNumberString = (value: string) => {
  return value.replace(/\D/g, '');
};

export const toPriceNumberString = (value: string) => {
  const rawNumber = +toNumberString(value);
  return rawNumber ? NUMBER_FORMAT.format(rawNumber) : '';
};

const toCardNumberString = (value: string) => {
  let trimmed = value.replace(/[^\d]/g, '');
  if (trimmed) {
    trimmed = trimmed.match(/.{1,4}/g)?.join(' ') || '';
    if (trimmed.length > 19) {
      trimmed = trimmed.substring(0, 19);
    }
  }
  return trimmed;
};

export const FormInput = <F extends FieldValues>({
  isAction = true,
  name,
  label = '',
  control,
  messageError,
  errProps,
  required,
  labelProps,
  containerProps,
  inputContainerProps,
  toggleHiddenPassword,
  transformInputValue,
  renderInput,
  renderLabel,
  renderError,
  renderRight,
  ...inputProps
}: FormInputProps<F>) => {
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({name, control});
  const [showText, setShowText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onChangeText = (text: string) => {
    if (transformInputValue) {
      let transformed = '';
      switch (transformInputValue) {
        case 'card':
          transformed = toCardNumberString(text);
          break;
        case 'number':
          transformed = toNumberString(text);
          break;
        case 'price':
          transformed = toPriceNumberString(text);
          break;
        default:
          transformed = transformInputValue(text);
          break;
      }
      onChange(transformed);
    } else {
      onChange(text);
    }
  };

  const _renderLabel = () => {
    return renderLabel ? (
      renderLabel(label, required)
    ) : label.length > 0 ? (
      <Text
        font="regular"
        fontSize={16}
        color={COLORS.black}
        marginBottom={10}
        {...labelProps}>
        {label}
        {required && <Text color={COLORS.red}> *</Text>}
      </Text>
    ) : null;
  };

  const _renderError = () => {
    return renderError ? (
      renderError(error)
    ) : messageError || error?.message ? (
      <Text marginTop={5} fontSize={14} color={COLORS.red} {...errProps}>
        {messageError || error?.message}
      </Text>
    ) : null;
  };

  const _renderRight = () => {
    if (renderRight) {
      return renderRight();
    }
    if (toggleHiddenPassword) {
      return (
        <Pressable
          marginRight={12}
          onPress={() => setShowText(!showText)}
          alignSelf="center">
          {showText ? (
            <EyeOff color={COLORS.shadowBlue} />
          ) : (
            <Eye color={COLORS.shadowBlue} />
          )}
        </Pressable>
      );
    }
  };

  const _renderInput = () => {
    return renderInput ? (
      renderInput({value, onChangeText, onBlur})
    ) : (
      <View
        row
        radius={10}
        borderWidth={1}
        borderColor={
          isAction && isFocused && !error
            ? COLORS.primary
            : error
            ? COLORS.red
            : COLORS.cadetGrey
        }
        {...inputContainerProps}>
        <TextInput
          flex
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          value={value}
          onBlur={onBlur}
          paddingHorizontal={12}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.cadetGrey}
          backgroundColor={
            inputProps.editable === false
              ? COLORS.antiFlashWhite
              : error
              ? COLORS.bgError
              : undefined
          }
          clearButtonMode="always"
          secureTextEntry={toggleHiddenPassword ? !showText : undefined}
          {...inputProps}
        />
        {_renderRight()}
      </View>
    );
  };

  return (
    <View {...containerProps}>
      {_renderLabel()}
      {_renderInput()}
      {_renderError()}
    </View>
  );
};
