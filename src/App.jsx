import { useEffect, useState } from "react";

function App() {
const [images, setImages] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [term, setTerm] = useState("");
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=46515688-8751a87aedd26c2f8377ddcc5&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);
const tags = images.tags.split(',');
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

      <div className="grid grid-cols-6 gap-12 mt-10 mx-16">
      {images.map((image) => (
        <div className="flex flex-col space-y-4">
          <img src={image.userImageURL} alt="" />
        <span>Photo by someone</span>
        <div className="flex flex-col space-y-1">
          <span>Views: 99999</span>
          <span>Downloads: 284218</span>
          <span>Likes: 481294</span>
        </div>
        <div className="grid  gap-2 ">
        {tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</span>
      ))}
      </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
