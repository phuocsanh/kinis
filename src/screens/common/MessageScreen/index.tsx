import React, {useCallback, useEffect, useState} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Image, Pressable, Text, View} from 'components/base';
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
  Send as SendG,
  Time,
  User,
} from 'react-native-gifted-chat';
import {hs, hScale, width} from 'themes/helper';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {Manrope} from 'assets';
import {
  ChevronDown,
  Dot,
  EllipsisVertical,
  Send,
  SendHorizontal,
} from 'lucide-react-native';
import {io, Socket} from 'socket.io-client';
import RenderAction from './components/RenderAction';
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
  // const [messages, setMessages] = useState<IMessage[]>([]);

  const [heightInput, setHeightInput] = useState<number>(45);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('https://api.kinis.ai', {
      // auth: {token: getCookie('kinis').accessToken},
      query: {userId: '675bb2783124418963a2efe0'},
      reconnection: true, // Bật tự động kết nối lại
      reconnectionAttempts: 5, // Số lần thử lại tối đa
      reconnectionDelay: 2000, // Thời gian chờ giữa mỗi lần thử (ms)
      reconnectionDelayMax: 5000, // Thời gian chờ tối đa giữa mỗi lần thử (ms)
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    newSocket.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    newSocket.on('disconnect', reason => {
      console.warn('Socket disconnected:', reason);
    });

    newSocket.on('newMessage', data => {
      setMessages(previous => [...previous, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  const setNewMessage = () =>
    // _idMes: string | number,
    // createdAt: Date | number,
    // text: string,
    // image: string | undefined,
    // user: User,
    {
      // sendMessage({booking_id: id, content: image ? 'Hình ảnh' : text ? text : ''});
    };

  // const updateMessage = (
  //   _idMes: string | number,
  //   createdAt: Date | number,
  //   text: string,
  //   image: string | undefined,
  //   user: User,
  // ) => {};

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
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messagesData),
    // );
    // const {_id, createdAt, text, user, image} = messagesData[0];
    // // currentMessage
    // //   ? updateMessage(_id, createdAt, text, image, user)
    // //   : setNewMessage(_id, createdAt, text, image, user);
  }, []);

  const customtInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          marginTop: 20,
          paddingLeft: 5,
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
            placeholder={'Type a message...'}
            onInputSizeChanged={l => {
              setHeightInput(
                Number(l.height.toFixed(0)) > 45
                  ? Number(l.height.toFixed(0))
                  : 45,
              );
            }}
          />
        )}
        // renderActions={RenderAction}
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
        style={{flex: 1, backgroundColor: COLORS.brightGray}}
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <HeaderTitle
          title={'Bethany Russell PT, DPT'}
          subContent={() => (
            <View marginTop={-6} rowCenter alignSelf="center">
              <Dot size={30} color={'green'} />
              <Text marginLeft={-6} fontSize={12}>
                Active now
              </Text>
            </View>
          )}
          renderRight={() => (
            <Pressable>
              <EllipsisVertical />
            </Pressable>
          )}
        />
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
              <SendG {...props}>
                <Pressable
                  marginLeft={12}
                  marginRight={20}
                  backgroundColor={COLORS.primary}
                  round={42}
                  justifyContent="center"
                  alignItems="center">
                  <Send color={COLORS.white} size={24} />
                </Pressable>
              </SendG>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
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
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
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
