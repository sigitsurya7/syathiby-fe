import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, get } from "../../middleware/services/api";
import moment from "moment";
import Layout from "./Layout";

const DetailPost = () => {
  const { link } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`v1/post/${link}`);
        setPost(response);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    fetchData();
  }, [link]);

  const handleCopy = (event) => {
    const currentUrl = window.location.href;
    const attributionText = `\n\n©2023 https://syathiby.id \nInstagram: syathibyid | Facebook: Ma'had Tahfidz Imam Syathiby \nSumber: ${currentUrl}`;

    event.preventDefault();
    const copiedText = window.getSelection().toString();
    const modifiedText = copiedText + attributionText;
    event.clipboardData.setData('text/plain', modifiedText);
  };

  useEffect(() => {
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div id="article" className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto relative">
          <img
            className="rounded-lg w-full"
            src={`${API_URL}/upload/post/${post.img}`}
            alt={post.title}
          />
          <div className="absolute top-2 right-2 bg-blue-50 px-2 py-1 rounded-tr-md rounded-bl-md">
            <p className="text-gray-600 text-xs">{post.label}</p>
          </div>
          <h1 className="text-3xl font-bold mt-6">{post.title}</h1>
          <p className="text-gray-600 mt-2">
            Published on {moment(post.created_at).format('DD MMMM YY')}.
            &nbsp;Author: {post.created_by}
          </p>
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: post.description }} />
        </div>
      </div>
    </Layout>
  );
};

export default DetailPost;
