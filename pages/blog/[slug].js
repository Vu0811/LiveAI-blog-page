import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked';
import Link from 'next/link'
import { useState } from "react";
export function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  
  const uploadToClient = (event) => {
    
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("theFiles", image);
    const response = fetch("/api/upload", {
      method: "POST",
      body
    });
    (await response).json().then(data => {
      let body = new FormData();
      body.append("filename", data.data);
      fetch("../api/python", {
        method: "POST",
        body
      }).then(response => response.json())
      .then(data => {
        //document.getElementById("label").parentElement.removeChild(document.getElementById("label"));
        const t = document.getElementById("label");
        const text = data.message;
        t.insertAdjacentText("afterend", text);
      });
    });
  };

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Try it - Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
        <p id="label">Result: </p>
      </div>
    </div>
  );
}
export default function PostPage({
  frontmatter: { title, date, cover_image, embedded_program },
  slug,
  content,
}) {
  if (embedded_program) {
    return (
      <>
        <Link href='/'>
          <a className='btn btn-back'>Go Back</a>
        </Link>
        <div className='card card-page'>
          <h1 className='post-title'>{title}</h1>
          <div className='post-date'>Posted on {date}</div>
          <img src={cover_image} alt='' />
          <div className='post-body'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
          </div>
        </div>
          <PrivatePage></PrivatePage>
      </>
    )
  }
  else{
    return (
      <>
        <Link href='/'>
          <a className='btn btn-back'>Go Back</a>
        </Link>
        <div className='card card-page'>
          <h1 className='post-title'>{title}</h1>
          <div className='post-date'>Posted on {date}</div>
          <img src={cover_image} alt='' />
          <div className='post-body'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
          </div>
        </div>
      </>
    )
  }

}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
