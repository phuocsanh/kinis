import {useMutation} from '@tanstack/react-query';
import {ApiResponseData} from 'interfaces/shared';
import api from 'utils/api';

interface IMessageRequest {
  message: string;
  imageUrl: string;
  videoUrl: string;
  senderId: string;
  receiverId: string;
}
export const useCreateChat = () => {
  return useMutation({
    onError: error => console.log(error),
    // onSuccess: data => notification.success({message: data.message}),
    mutationFn: async (body: IMessageRequest) => {
      return await api.postRaw<ApiResponseData<any>>('/chat/message', body);
    },
  });
};
