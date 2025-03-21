"use client";

import { useUser } from "@clerk/nextjs";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Badge,
  Textarea,
  Spinner,
} from "flowbite-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// https://dev.to/a7u/reactquill-with-nextjs-478b
import "react-quill-new/dist/quill.snow.css";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function UpdatePost() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split("/").pop();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (isSignedIn && user?.publicMetadata?.isAdmin) {
      fetchPost();
    }
  }, [postId, user?.publicMetadata?.isAdmin, isSignedIn]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
          postId: postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  // get the initial post data using useEffect and fetch

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Update a post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              defaultValue={formData.title}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="uncategorized">Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Select>
          </div>
          <div className="max-w-md">
            <Textarea
              id="keywords"
              placeholder="Keywords, Comma Seperated"
              required
              value={formData.keywords}
              rows={4}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keywords: [...e.target.value.split(",")],
                })
              }
            />
            <div className="flex flex-wrap gap-2 my-4">
              {formData.keywords &&
                formData.keywords.map((keyword, index) => {
                  if (keyword !== keyword.trim()) {
                    let formatted_keywords = formData.keywords;
                    formatted_keywords[index] = keyword.trim();
                    setFormData({ ...formData, keywords: formatted_keywords });
                  }
                  return (
                    <Badge color="indigo" size="sm">
                      {keyword}
                    </Badge>
                  );
                })}
            </div>
          </div>
          <div className="max-w-md">
            <Textarea
              id="metadescription"
              placeholder="Meta Description, try to incorporate keyword and entice users to click link"
              required
              rows={4}
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  metaDescription: e.target.value,
                  metaDescriptionLength: e.target.value.split("").length,
                })
              }
            />
            <div className="flex flex-wrap gap-2 my-4">
              <span
                className={
                  formData.metaDescriptionLength > 160 ||
                  formData.metaDescriptionLength < 50
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                Characters = {formData.metaDescriptionLength}
                <br />
                {formData.metaDescriptionLength < 50 &&
                  "Meta Description too short"}
                {formData.metaDescriptionLength > 160 &&
                  "Meta Description Too Long"}
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <Spinner aria-label="Large spinner example" size="lg" />
                  <p>{`${imageUploadProgress || 0}%`}</p>
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            required
            value={formData.content}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video','formula'],
                ['clean']
              ],
              clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              }
            }}
          />
          <Button type="submit" gradientDuoTone="purpleToPink">
            Update
          </Button>
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  }

  return (
    <h1 className="text-center text-3xl my-7 font-semibold min-h-screen">
      You need to be an admin to update a post
    </h1>
  );
}
