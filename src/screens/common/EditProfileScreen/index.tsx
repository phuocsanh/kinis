import React, {useEffect, useState} from 'react';

import {Button, CheckBox, Image, Pressable, Text, View} from 'components/base';
import {ICONS, IMAGES} from 'assets';
import {height, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {AtSign, Calendar, Check, Phone, User} from 'lucide-react-native';

import {ScrollView, TextInput} from 'react-native';
import {useForm} from 'react-hook-form';
import {useLogin, useQueryUserInfo} from 'queries/auth';
import {FormInput} from 'components/form';
import formConfig, {FormField} from './formConfig';
import {HeaderTitle} from 'components/common';
import {DateTimeInput} from 'components/form/DateTimeInput';
import moment from 'moment';
import {convertDate} from 'utils/helper';
const medicalConditions = [
  'Heart condition',
  'Diabetes',
  'Hypertension',
  'Other',
];
const EditProfileScreen = () => {
  const [injury, setInjury] = useState(true);
  const [medicalCondition, setMedicalConditions] = useState<string[]>(['']);
  const {control, handleSubmit, setValue} = useForm<FormField>(formConfig);
  const {mutate, isPending, error} = useLogin();
  const userInfo = useQueryUserInfo();
  useEffect(() => {
    if (userInfo.data) {
      setValue('brithday', convertDate(userInfo.data.userId.dateOfBirth));
      setValue('email', userInfo.data.email);
      setValue('phone', userInfo.data.userId.phone);
      setValue('emergencyContact', userInfo.data.emergencyContact);
      setValue('emergencyPhone', userInfo.data.emergencyPhone);
      setInjury(userInfo.data.medicalHistory);
      setMedicalConditions(userInfo.data.medicalConditions);
    }
  }, [userInfo.data]);

  const onSubmit = async (value: FormField) => {};
  const handleMedicalConditions = (condition: string) => {
    if (medicalCondition.includes(condition)) {
      const c = medicalCondition.filter(c => c !== condition);
      setMedicalConditions(c);
    } else {
      setMedicalConditions(pre => [...pre, condition]);
    }
  };

  return (
    <View flex backgroundColor={COLORS.white}>
      <HeaderTitle title="Edit Profile" />
      <ScrollView>
        <View>
          <View
            paddingHorizontal={36}
            marginTop={24}
            backgroundColor={COLORS.white}>
            <View
              rowCenter
              paddingHorizontal={10}
              height={48}
              backgroundColor={COLORS.brightGray}
              borderWidth={1}
              radius={10}
              borderColor={COLORS.lightGray}>
              <Text>#</Text>
              <Text marginLeft={10}>{userInfo.data?.memberId}</Text>
            </View>
            <FormInput
              containerProps={{marginTop: 12}}
              renderLeft={() => (
                <View
                  marginLeft={10}
                  justifyContent="center"
                  alignItems="center">
                  <AtSign size={15} />
                </View>
              )}
              control={control}
              name="email"
            />
            {/* <FormInput
              containerProps={{marginTop: 12}}
              renderLeft={() => (
                <View
                  marginLeft={10}
                  justifyContent="center"
                  alignItems="center">
                  <Calendar size={15} />
                </View>
              )}
              
            /> */}
            <DateTimeInput
              containerProps={{marginTop: 12}}
              control={control}
              name="brithday"
              displayFormat="YYYY/MM/DD"
              returnFormat="date"
            />
            <FormInput
              containerProps={{marginTop: 12}}
              renderLeft={() => (
                <View
                  marginLeft={10}
                  justifyContent="center"
                  alignItems="center">
                  <Phone size={15} />
                </View>
              )}
              control={control}
              name="phone"
            />
            <FormInput
              label="Emergency contact"
              containerProps={{marginTop: 12}}
              renderLeft={() => (
                <View
                  marginLeft={10}
                  justifyContent="center"
                  alignItems="center">
                  <User size={15} />
                </View>
              )}
              control={control}
              name="emergencyContact"
            />
            <FormInput
              containerProps={{marginTop: 12}}
              renderLeft={() => (
                <View
                  marginLeft={10}
                  justifyContent="center"
                  alignItems="center">
                  <Phone size={15} />
                </View>
              )}
              control={control}
              name="emergencyPhone"
            />

            <Text marginTop={12} color={COLORS.black} fontSize={16}>
              Medical History
            </Text>
            <Text marginVertical={10}>
              Do you had any injuries in the past 12 months?
            </Text>
            <View rowCenter>
              <Pressable rowCenter onPress={() => setInjury(true)}>
                <View
                  round={18}
                  borderWidth={injury ? 5 : 1}
                  borderColor={injury ? COLORS.primary : COLORS.lightGray}
                />
                <Text marginLeft={5}>Yes</Text>
              </Pressable>
              <Pressable
                marginLeft={25}
                rowCenter
                onPress={() => setInjury(false)}>
                <View
                  round={18}
                  borderWidth={!injury ? 5 : 1}
                  borderColor={!injury ? COLORS.primary : COLORS.lightGray}
                />
                <Text marginLeft={5}>No</Text>
              </Pressable>
            </View>

            <Text marginVertical={10}>
              Do you have any current medical conditions?
            </Text>

            <View>
              {medicalConditions.map((condition, index) => (
                <Pressable
                  key={index}
                  rowCenter
                  marginBottom={8}
                  onPress={() => handleMedicalConditions(condition)}>
                  <View
                    justifyContent="center"
                    alignItems="center"
                    square={18}
                    radius={3}
                    borderWidth={medicalCondition.includes(condition) ? 1 : 1}
                    borderColor={
                      medicalCondition.includes(condition)
                        ? COLORS.primary
                        : COLORS.lightGray
                    }>
                    {medicalCondition.includes(condition) && (
                      <Check size={14} color={COLORS.primary} />
                    )}
                  </View>
                  <Text marginLeft={5}>{condition}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              maxLength={200}
              multiline
              placeholder="Fill your health history"
              textAlignVertical="top"
              style={{
                marginTop: 10,
                minHeight: 60,
                paddingHorizontal: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
              }}
            />
            <Button
              title="Save changes"
              disabled={isPending}
              loading={isPending}
              marginTop={30}
              marginBottom={50}
              fontSize={16}
              font={'bold'}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default EditProfileScreen;
