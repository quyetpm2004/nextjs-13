"use client";

import AppTable from "@/component/app.table";
import useSWR from "swr";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:8000/blogs");
  //     const data = await res.json();
  //     console.log(data);
  //   };

  //   fetchData();
  // }, []);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div className="mt-3">
      <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)}></AppTable>
    </div>
  );
};
export default BlogsPage;
