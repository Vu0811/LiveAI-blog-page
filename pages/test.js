import { useState } from "react";
/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
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
    }).then(response => response.json())
    .then(data => {
      let body = new FormData();
      body.append("filename", data.data);
      fetch("api/python", {
        method: "POST",
        body
      }).then(response => response.json())
      .then(data => {
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
        <h4>Select Image</h4>
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