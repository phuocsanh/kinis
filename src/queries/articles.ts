import {useQuery} from '@tanstack/react-query';
import {TypeArticles} from 'models/articles';
import {PagingResponseData} from 'models/common';
import api from 'utils/api';
import {removeUndefinedObject} from 'utils/helper';

export const useGetArticles = ({type}: {type: TypeArticles}) => {
  return useQuery({
    queryKey: ['getArticles', type],
    queryFn: async () => {
      const res = await api.get<
        PagingResponseData<{name: string; description: string; _id: string}>
      >(
        'common/article',
        removeUndefinedObject({
          type,
        }),
      );
      return res;
    },
  });
};
