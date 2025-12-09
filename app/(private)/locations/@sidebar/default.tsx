import type { SearchParams } from "nuqs/server";
import Page from "./page";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Default = (props: PageProps) => {
  return <Page searchParams={props.searchParams} />;
};
export default Default;
