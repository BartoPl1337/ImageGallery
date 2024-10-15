import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=46515688-8751a87aedd26c2f8377ddcc5&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div>
        <div className="flex items-center flex-col space-y-2 mt-6">
          <h1>App Gallery</h1>
          <input
            type="text"
            placeholder="What u lookin for"
            className="border-2 p-2 text-center"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

      {images.length === 0 && !isLoading && (
        <h1 className="font-medium">Images not found</h1>
      )}

      {isLoading ? (
        <h1 className="font-medium">Loading...</h1>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-10 mx-16">
          {images.map((image) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                src={image.largeImageURL}
                alt=""
                className="w-full h-[360px] object-cover"
              />
              <div className="py-4">
                <span>Photo by {image.user}</span>
                <div className="flex flex-col space-y-1">
                  <span>Views: {image.views}</span>
                  <span>Downloads: {image.downloads}</span>
                  <span>Likes: {image.likes}</span>
                </div>
              </div>
              <div className="py-4">
                {image.tags.split(",").map((tag) => (
                  <span className="bg-gray-200 rounded-full text-sm font-semibold text-gray-700 mr-6">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
