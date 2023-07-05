import { PostType } from "../static/types";

interface PhotoProp {
  posts: PostType
}

const UserPhoto = ({ posts }: PhotoProp) => {
  console.log(posts);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold hover:underline cursor-pointer">Photos</div>
        {/* <button className="text-fb-blue p-2 hover:bg-gray-200 rounded-lg">See all photos</button> */}
      </div>
      <div className="grid grid-cols-3 rounded-xl overflow-hidden gap-2 mt-3">
        {posts?.map((item: PostType, index: number) => (
          <div key={index}>
            {item.type === "picture"
              && <img style={{ aspectRatio: "1/1" }} className="w-full object-cover h-1/1"
                src={item?.mediaUrl} />}
          </div>
        ))}

      </div>
    </>
  )
}

export default UserPhoto