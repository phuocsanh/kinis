import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {queryClient} from 'queries';
import {useAppStore} from 'stores';
import api from 'utils/api';

const notificationsOption = (userToken?: string) => {
  const token = userToken || useAppStore.getState().userToken;
  return infiniteQueryOptions({
    queryKey: ['list_notifications', token],
    queryFn: async ({pageParam}) => {
      const res = await api.get<{
        data: {
          last_page: number;
          total: number;
          per_page: number;
          current_page: number;
          data: any[];
          total_unview: number;
          total_viewed: number;
        };
      }>('user/list-notification', {
        page: pageParam,
        limit: 10,
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: currentPage => {
      if (currentPage.last_page === currentPage.current_page) {
        return undefined;
      }
      return currentPage.current_page + 1;
    },
    enabled: !!token,
  });
};

export const useQueryNotifiDetail = (id: number) => {
  return useQuery({
    queryKey: ['detail_notification', id],
    queryFn: async () => {
      const res = await api.get<ResponseData<any>>(
        `/user/detail-notification/${id}`,
      );
      const isViewed = res.data.viewed;
      if (!isViewed) {
        queryClient.invalidateQueries({
          queryKey: notificationsOption().queryKey,
        });
      }
      return res.data;
    },
  });
};

export const useQueryNotifications = () => {
  const userToken = useAppStore(state => state.userToken);
  return useInfiniteQuery(notificationsOption(userToken));
};
