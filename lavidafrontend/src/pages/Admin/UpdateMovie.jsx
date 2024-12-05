import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
  });

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie successfully deleted");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.log("failed to delete movie:", error);
      toast.error(`failed to delete movie: ${error?.message} `);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill all the required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.log("failed to upload image:", uploadImageErrorDetails);
          toast.error("failed to upload image");
          return;
        }

        await updateMovie({
          id: id,
          updatedMovie: { ...movieData, image: uploadedImagePath },
        });

        navigate("/movies");
      }
    } catch (error) {
      console.log("failed to update movie:", error);
      toast.error(`failed to update movie: ${error} `);
    }
  };

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  return (
    <div className=" container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              className="border  px-2 py-1 w-full "
              value={movieData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              className=" border  px-2 py-1  w-full "
              value={movieData.year}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className=" border  px-2 py-1  w-full "
            >
              {" "}
            </textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              className="border px-2 py-1  w-full "
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          onClick={handleUpdateMovie}
          type="button"
          className="py-2 px-4 rounded text-white  bg-teal-500 "
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
        </button>
        <button
          onClick={handleDeleteMovie}
          type="button"
          className="py-2 px-4 rounded text-white ml-2 bg-red-500 "
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
