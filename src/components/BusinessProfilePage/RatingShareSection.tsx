import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ShareButton from "./ShareButton";

interface ShareButtonProps {
  share_link: string;
  rating: number;
}

const RatingShareSection: React.FC<ShareButtonProps> = ({
  share_link,
  rating,
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [
      ...Array(fullStars).fill(
        <FaStar className="text-yellow-500" size={26} />
      ),
      ...Array(halfStars).fill(
        <FaStarHalfAlt className="text-yellow-500" size={26} />
      ),
      ...Array(emptyStars).fill(
        <FaRegStar className="text-yellow-500" size={26} />
      ),
    ];

    return stars;
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-sky-50 p-2 rounded-md mt-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">{renderStars(rating)}</div>
        {rating > 0 && <p className="text-gray-700">{rating}</p>}
      </div>
      {share_link && <ShareButton share_link={share_link} />}
    </div>
  );
};

export default RatingShareSection;
