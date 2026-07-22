import "./Skeleton.css";

function SkeletonCard() {
  return (
    <div className="skeletonCard">

      <div className="skeletonImage"></div>

      <div className="skeletonBody">

        <div className="skeletonTitle"></div>

        <div className="skeletonText"></div>

        <div className="skeletonText short"></div>

        <div className="skeletonPrice"></div>

      </div>

    </div>
  );
}

export default SkeletonCard;