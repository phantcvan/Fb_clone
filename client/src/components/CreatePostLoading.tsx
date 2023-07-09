import { RotatingLines } from "react-loader-spinner";

const CreatePostLoading = () => {
  return (
    <div className="bg-fb-blue py-1 px-4 rounded-md flex items-center justify-center">
      <RotatingLines
        strokeColor="#ffffff"
        strokeWidth="5"
        animationDuration="0.75"
        width="24"
        visible={true}
      />
    </div>
  );
};

export default CreatePostLoading;
