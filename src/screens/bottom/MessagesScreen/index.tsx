import React, {useCallback, useState} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Image, Text, View} from 'components/base';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewToken,
} from 'react-native';
import {COLORS} from 'themes/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Avatar, HeaderTitle} from 'components/common';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  Time,
  User,
} from 'react-native-gifted-chat';
import {hs, hScale, width} from 'themes/helper';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {Manrope} from 'assets';
import {ChevronDown, SendHorizontal} from 'lucide-react-native';
import RenderActions from './components/RenderActions';
type ItemList = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  time: string;
};
type ListItemProps = {
  viewableItems: SharedValue<ViewToken[]>;
  item: ItemList;
};
const MessageScreen = ({route}: any) => {
  const {bottom} = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [heightInput, setHeightInput] = useState<number>(45);
  const setNewMessage = (
    _idMes: string | number,
    createdAt: Date | number,
    text: string,
    image: string | undefined,
    user: User,
  ) => {
    // sendMessage({booking_id: id, content: image ? 'Hình ảnh' : text ? text : ''});
  };

  const updateMessage = (
    _idMes: string | number,
    createdAt: Date | number,
    text: string,
    image: string | undefined,
    user: User,
  ) => {};

  const setMessageFromChatBot = (mes: string) => {
    // messages.length
    //   ? updateMessage(idGenerate(), new Date(), mes, '', {
    //       _id: userInfo?._id!,
    //       name: userInfo?.full_name,
    //       avatar: userInfo?.info.avatar,
    //     })
    //   : setNewMessage(idGenerate(), new Date(), mes, '', {
    //       _id: userInfo?._id!,
    //       name: userInfo?.full_name,
    //       avatar: userInfo?.info.avatar,
    //     });
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, [
    //     {
    //       _id: idGenerate(),
    //       text: mes,
    //       createdAt: new Date(),
    //       user: {
    //         _id: userInfo?._id!,
    //         name: userInfo?.full_name,
    //         avatar: userInfo?.info.avatar,
    //       },
    //     },
    //   ]),
    // );
  };

  const onSend = useCallback((messagesData: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messagesData),
    );
    const {_id, createdAt, text, user, image} = messagesData[0];

    // currentMessage
    //   ? updateMessage(_id, createdAt, text, image, user)
    //   : setNewMessage(_id, createdAt, text, image, user);
  }, []);

  const customtInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          paddingHorizontal: 10,
          marginLeft: 4,
          marginRight: 4,
          marginTop: 10,
          borderRadius: 20,
          flexDirection: 'column-reverse',
          position: 'relative',
        }}
        renderComposer={propsComposer => (
          <Composer
            {...propsComposer}
            multiline={true}
            composerHeight={
              Number(heightInput.toFixed(0)) > 100
                ? 100
                : Number(heightInput.toFixed(0))
            }
            textInputStyle={[styles.textInput]}
            placeholder={'Nhập tin nhắn...'}
            onInputSizeChanged={l => {
              setHeightInput(
                Number(l.height.toFixed(0)) > 45
                  ? Number(l.height.toFixed(0))
                  : 45,
              );
            }}
          />
        )}
        renderActions={RenderActions}
        accessoryStyle={{height: 'auto'}}
      />
    );
  };
  return (
    <View
      flex
      backgroundColor={COLORS.white}
      paddingBottom={bottom ? bottom : 10}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: COLORS.white}}
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <HeaderTitle title={'Khách hàng'} />
        <View flex>
          <GiftedChat
            scrollToBottom
            alwaysShowSend
            timeFormat="HH:mm"
            dateFormat="hh:mm A"
            maxInputLength={150}
            keyboardShouldPersistTaps="never"
            // isKeyboardInternallyHandled={false}
            renderAvatarOnTop={true}
            messages={messages}
            onSend={onSend}
            bottomOffset={0}
            scrollToBottomComponent={ScrollToBottom}
            messagesContainerStyle={[styles.messagesContainerStyle]}
            // user={{
            //   _id: userInfo?._id!,
            //   name: userInfo?.full_name,
            //   avatar: userInfo?.info.avatar,
            // }}
            renderTime={props =>
              props.currentMessage?.image ? null : <Time {...props} />
            }
            renderAvatar={props => (
              // <Image source={{uri: props.currentMessage?.user.avatar?.toString()}} round={40} />
              <Avatar
                uri={props.currentMessage?.user?.avatar?.toString()}
                name={'KH'}
              />
            )}
            renderBubble={props => (
              <Bubble
                {...props}
                textStyle={{
                  left: styles.textMessage,
                  right: styles.textMessage,
                }}
                wrapperStyle={{
                  left: {
                    marginBottom: 15,

                    backgroundColor: props.currentMessage?.image
                      ? ''
                      : COLORS.antiFlashWhite,
                  },
                  right: {
                    marginBottom: 15,
                    backgroundColor: props.currentMessage?.image
                      ? COLORS.primary
                      : COLORS.primary,
                  },
                }}
              />
            )}
            renderMessageImage={props => (
              <Image
                radius={5}
                source={{uri: props.currentMessage?.image}}
                width={width / 2}
                height={width / 1.5}
              />
            )}
            renderInputToolbar={props => customtInputToolbar(props)}
            renderSend={props => (
              <Send
                {...props}
                containerStyle={{
                  height: 30,
                  marginBottom: Platform.OS === 'ios' ? 15 : 10,
                  width: props.text ? 30 : 0,
                  marginLeft: props.text ? 12 : 0,
                }}>
                <SendHorizontal color={COLORS.primary} size={30} />
              </Send>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const ScrollToBottom = () => {
  return (
    <View>
      <ChevronDown size={20} color={COLORS.shadowBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainerStyle: {
    flex: 1,
    marginHorizontal: 12,
    borderRadius: 10,
    // ...DEFAULT_STYLES.shadowSky,
  },
  inputToolbarContainerStyle: {
    paddingTop: 5,
    borderTopWidth: 0,
    marginBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    marginLeft: 75,
    minHeight: 45,
    lineHeight: 18,
    paddingTop: Platform.OS === 'ios' ? 15 : 5,
    paddingBottom: Platform.OS === 'ios' ? 15 : 5,
    borderWidth: 1,
    borderColor: COLORS.antiFlashWhite,
    borderRadius: hScale(8),
    paddingHorizontal: hScale(12),
  },
  textMessage: {
    fontSize: hs(18),
    fontFamily: Manrope.regular,
  },
});
