import { useState } from "react";

export default function app() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = "YOUR_CLOUD_NAME"; // 🔴 change this
  const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET"; // 🔴 change this

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Upload failed!");
        console.error(data);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Upload Image to Cloudinary</h2>

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <br />

      {/* Upload Button */}
      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      <br />
      <br />

      {/* Show uploaded image */}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "300px", borderRadius: "8px" }}
          />
          <p>
            URL:{" "}
            <a href={imageUrl} target="_blank" rel="noreferrer">
              {imageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
