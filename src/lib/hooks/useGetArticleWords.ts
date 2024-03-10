import { clientApi } from "@/utils/trpc";
import { useEffect } from "react";

export const useGetArticleWords = (
  id: number,
): [isLoading: boolean, data: Word[]] => {
  const get = clientApi.article.getArticleWords.useQuery({
    articleId: id,
  });
  useEffect(() => {
    if (get.isLoadingError) {
      console.error("issue getting words for article", id);
    }
  }, [get.isLoadingError, id]);
  return [get.isLoading, get.data ?? []];
};
