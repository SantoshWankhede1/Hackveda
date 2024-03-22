import './PostDisplay.css';

const PostDisplay = ({ title, image, description }) => {
    return (
        <div className="post-display">
          <h2 className="mb-4 font-bold text-2xl">{title}</h2>
          <img className="post-image" src={image} alt={title} />
          <p className="text-xl text-gray-600">{description}</p>
        </div>
      );
};

export default PostDisplay;