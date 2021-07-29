import Layout from "../components/layout";
import { getImages } from "../lib/posts";

// export const getStaticProps = async ({ params }) => {
//   const data = params.data;
//   return {
//     props: {
//       data,
//     },
//   };
// };

export async function getStaticProps() {
  const data = await getImages();
  const url = "https://jsonplaceholder.typicode.com/photos";
  const res = await fetch(url);
  const datas = await res.json();
  // const photos = datas.map((data) => data.url);
  return {
    props: {
      datas,
      data,
    },
  };
}

const Home = ({ datas, data }) => {
  console.log(datas[0].url);
  console.log(data);
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
};

export default Home;
