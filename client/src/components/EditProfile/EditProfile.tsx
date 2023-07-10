import { useState, useCallback, useEffect } from 'react'
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import { getUser } from '../../slices/whitelist';
import axios from 'axios';
import { BiSolidHome } from 'react-icons/bi';
import { PiBagFill } from 'react-icons/pi';
import { GiGraduateCap } from 'react-icons/gi';
import { IoLocationSharp } from 'react-icons/io5';
import { getAllUsers, getRelation } from '../../slices/userSlice';
import { UserType } from '../../static/types';
import Tippy from '@tippyjs/react/headless';



interface EditProfile {
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AvatarUpdate {
  id: number;
  img: string;
}
interface UserUpdate {
  bio: string | null;
  job: string | null;
  highSchool: string | null;
  college: string | null;
  currentCity: string | null;
  hometown: string | null;
  relationship: string | null;
  relationship_to: number | undefined | null;
}

const EditProfile = ({ setIsEditProfile, setEditedProfile }: EditProfile) => {
  const userNow = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [previewAvatarSrc, setPreviewAvatarSrc] = useState("");
  const [selectedCover, setSelectedCover] = useState("");
  const [previewCoverSrc, setPreviewCoverSrc] = useState("");
  const [newBio, setNewBio] = useState(userNow?.bio);
  const [newJob, setNewJob] = useState(userNow?.job);
  const [newHighSchool, setNewHighSchool] = useState(userNow?.highSchool);
  const [newCollege, setNewCollege] = useState(userNow?.college);
  const [newCurrentCity, setNewCurrentCity] = useState(userNow?.currentCity);
  const [newHometown, setNewHometown] = useState(userNow?.hometown);
  const [newRelationship, setNewRelationship] = useState(userNow?.relationship);
  const [newRelationshipTo, setRelationshipTo] = useState<number | null>(null);
  const [newRelationshipToUser, setRelationshipToUser] = useState<UserType[] | []>([]);
  const [message, setMessage] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [editIntro, setEditIntro] = useState(false);
  const relation = useSelector(getRelation);
  const [showTooltip, setShowTooltip] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<UserType[] | null>(null);
  const [partner, setPartner] = useState<string | null | undefined>(null)

  const handleClose = () => {
    setIsEditProfile(false);
    // setSelectedAvatar("");
    // setPreviewAvatarSrc("");
    // setSelectedCover("");
    // setPreviewCoverSrc("");
    // setEditBio(false);
    // setMessage("");

  }

  useEffect(() => {
    const partnerFind = relation.filter((item: UserType) => item.id === userNow?.relationship_to)
    console.log("partnerFind", partnerFind);
    if (partnerFind.length > 0) {
      setRelationshipToUser(partnerFind);
      // const partnerName = partnerFind[0].first_name + " " + partnerFind[0].last_name;
      // setPartner(partnerName)
      setRelationshipTo(userNow?.relationship_to)
    }
  }, [])

  // Thêm mối quan hệ
  const handleInputPartner = (e: any) => {
    const inputValue = e.target.value.trim().replace(/\s+/g, " ").toLowerCase();
    const findUsers = allUsers?.filter(
      (user: UserType) =>
      (user.first_name.toLowerCase().includes(inputValue) ||
        user.last_name.toLowerCase().includes(inputValue))
    )
    setMatchedUsers(findUsers);
    console.log("findUsers", findUsers);

    if (findUsers?.length > 0) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }


  // const handleAddPartner = useCallback((user: UserType) => {
  //   // Xử lý logic thêm đối tác
  //   setShowTooltip(false);
  //   setRelationshipTo(user.id)

  //   setPartner(user);
  // }, []);
  const handleAddPartner = (user: UserType) => {
    // Xử lý logic thêm đối tác
    setShowTooltip(false);
    setRelationshipTo(user.id);
    const partnerName = user.first_name + " " + user.last_name;
    setPartner(partnerName);
    const updatedRelationship = [user, ...newRelationshipToUser];
    setRelationshipToUser(updatedRelationship);

  };

  // Add avatar
  const handleAddAvatar = (event: any) => {
    const mediaFileArr = event.target.files[0].name.split('.');
    const typeOfMedia = mediaFileArr[mediaFileArr.length - 1].toLowerCase();
    if (typeOfMedia === "png" || typeOfMedia === 'jpg' || typeOfMedia === 'jpeg' || typeOfMedia === 'bmp' || typeOfMedia === 'gif') {
      setSelectedAvatar(event.target.files[0]);
      // xem trước media
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event: any) {
        setPreviewAvatarSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  // Update cover
  const handleUpdateCover = (event: any) => {
    const mediaFileArr = event.target.files[0].name.split('.');
    const typeOfMedia = mediaFileArr[mediaFileArr.length - 1].toLowerCase();
    if (typeOfMedia === "png" || typeOfMedia === 'jpg' || typeOfMedia === 'jpeg' || typeOfMedia === 'bmp' || typeOfMedia === 'gif') {
      setSelectedCover(event.target.files[0]);
      // xem trước media
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event: any) {
        setPreviewCoverSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleEditInfo = async () => {
    const requests = [];

    if (selectedAvatar) {
      const avatarData = new FormData();
      avatarData.append('file', selectedAvatar);
      avatarData.append('upload_preset', 'facebook');

      requests.push(
        axios.post('https://api.cloudinary.com/v1_1/dbs47qbrd/image/upload', avatarData)
          .then(response => response.data.secure_url)
          .then(avatar => {
            const avatarUpdate: AvatarUpdate = {
              id: userNow?.id,
              img: avatar,
            };
            return axios.put(`http://localhost:8000/api/v1/users/updateAvatar`, avatarUpdate);
          })
      );
    }

    if (selectedCover) {
      const coverData = new FormData();
      coverData.append('file', selectedCover);
      coverData.append('upload_preset', 'facebook');

      requests.push(
        axios.post('https://api.cloudinary.com/v1_1/dbs47qbrd/image/upload', coverData)
          .then(response => response.data.secure_url)
          .then(cover => {
            const coverUpdate: AvatarUpdate = {
              id: userNow?.id,
              img: cover,
            };
            return axios.put(`http://localhost:8000/api/v1/users/updateCover`, coverUpdate);
          })
      );
    }
    if (newRelationship !== "In a relationship" || newRelationship !== "Married") {
      setRelationshipTo(null);
    }
    const userUpdate: UserUpdate = {
      bio: newBio,
      job: newJob,
      highSchool: newHighSchool,
      college: newCollege,
      currentCity: newCurrentCity,
      hometown: newHometown,
      relationship: newRelationship,
      relationship_to: newRelationshipTo,
    }
    console.log("userUpdate", userUpdate);

    requests.push(axios.put(`http://localhost:8000/api/v1/users/updateUser/${userNow.id}`, userUpdate))

    try {
      await axios.all(requests);

      console.log('Upload Successfully');
    } catch (error) {
      console.log(error);
      setMessage('Error! Please try again');
    }

    // handleClose();
    setIsEditProfile(false);
    setEditedProfile(true);
  };
  console.log("newRelationshipToUser", newRelationshipToUser[0]?.last_name);


  return (
    <div className='w-full absolute top-0 z-[60] min-h-screen h-fit bg-overlay-40 flex items-center justify-center '>
      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
        onClick={handleClose} >
      </div>
      <div className={`login_box w-[650px] top-14 bg-white pt-4 flex flex-col items-center
                justify-center fixed rounded-md z-[80] `}>
        <div className='absolute top-2 right-2 cursor-pointer p-2 rounded-full bg-fb-gray hover:bg-fb-dark'
          onClick={handleClose}>
          <AiOutlineClose size={20} />
        </div>
        <span className="font-semibold text-lg border-b border-fb-gray w-full pb-2 text-center">
          Edit profile
        </span>
        <Scrollbars autoHide style={{ width: '100%', height: `390px`, overflow: 'hidden' }}>
          <div className='flex flex-col gap-3 my-2 mx-3'>
            {/* AVATAR */}
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Profile picture</span>
              <div className='text-fb-blue'>
                <label htmlFor="uploadMedia" className="flex gap-3 cursor-pointer flex-col items-center justify-center">
                  <p className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md">
                    Edit
                  </p>
                </label>
                <input type="file" name="uploadMedia" id="uploadMedia"
                  className="hidden" onChange={handleAddAvatar} />
              </div>

            </div>
            {previewAvatarSrc
              ? <div className='m-auto w-[168px] h-[168px] rounded-full'>
                <img src={previewAvatarSrc} alt="" className='w-[168px] h-[168px] rounded-full object-cover overflow-hidden' />
              </div>
              : <div className='m-auto w-[168px] h-[168px] rounded-full'>
                <img src={userNow?.avatar} alt="" className='w-[168px] h-[168px] rounded-full object-cover overflow-hidden' />
              </div>}
            {/* COVER */}
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Cover photo</span>
              <div className='text-fb-blue'>
                <label htmlFor="uploadCover" className="flex gap-3 cursor-pointer flex-col items-center justify-center">
                  <p className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md">
                    Edit
                  </p>
                </label>
                <input type="file" name="uploadCover" id="uploadCover"
                  className="hidden" onChange={handleUpdateCover} />
              </div>

            </div>
            {previewCoverSrc
              ? <div className='m-auto w-[500px] h-[200px] rounded-md'>
                <img src={previewCoverSrc} alt="" className='w-[500px] h-[200px] rounded-md object-cover overflow-hidden' />
              </div>
              : <div className='m-auto w-[500px] h-[200px] rounded-md'>
                <img src={userNow?.cover} alt="" className='w-[500px] h-[200px] rounded-md object-cover overflow-hidden' />
              </div>}
            {/* BIO */}
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Bio</span>
              {editBio ? <span className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => setEditBio(false)}>
                Cancel
              </span>
                : <span className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => setEditBio(true)}>
                  Edit
                </span>}

            </div>
            {editBio
              ? <textarea className='mx-24 p-2 text-fb-gray-text border border-fb-gray-text
            shadow-sm resize-none rounded-md outline-none' placeholder='Describe yourself...'
                value={userNow?.bio} onChange={(e: any) => setNewBio(e.target.value)}>
              </textarea>
              : userNow?.bio
                ? <span className='mx-24 text-fb-gray-text'>{userNow?.bio}</span>
                : <span className='text-fb-gray-text'>Describe yourself...</span>}

            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Customize your intro</span>
              {editIntro ? <span className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => setEditIntro(false)}>
                Cancel
              </span>
                : <span className="text-fb-blue px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => setEditIntro(true)}>
                  Edit
                </span>}
            </div>
            {/* CurrentCity */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3 items-center'>
                <BiSolidHome size={22} style={{ color: "#8C939D" }} />
                {newCurrentCity
                  ? editIntro
                    ? <input type='text' value={newCurrentCity} onChange={(e: any) => setNewCurrentCity(e.target.value)}
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'></input>
                    : <span>{newCurrentCity}</span>
                  : <input type='text' placeholder='Add current city'
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewCurrentCity(e.target.value)} ></input>}
              </div>
            </div>
            {/* JOB */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3 items-center'>
                <PiBagFill size={22} style={{ color: "#8C939D" }} />
                {newJob
                  ? editIntro
                    ? <input type='text' value={newJob} onChange={(e: any) => setNewJob(e.target.value)}
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'></input>
                    : <span>{newJob}</span>
                  : <input type='text' placeholder='Add a workplace'
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewJob(e.target.value)} ></input>}
              </div>
            </div>
            {/* HIGHSCHOOL */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3 items-center'>
                <GiGraduateCap size={22} style={{ color: "#8C939D" }} />
                {newHighSchool
                  ? editIntro
                    ? <input type='text' value={newHighSchool} onChange={(e: any) => setNewHighSchool(e.target.value)}
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'></input>
                    : <span>{newHighSchool}</span>
                  : <input type='text' placeholder='Add high school'
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewHighSchool(e.target.value)} ></input>}
              </div>
            </div>
            {/* COLLEGE */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3 items-center'>
                <GiGraduateCap size={22} style={{ color: "#8C939D" }} />
                {newCollege
                  ? editIntro
                    ? <input type='text' value={newCollege} onChange={(e: any) => setNewCollege(e.target.value)}
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'></input>
                    : <span>{newCollege}</span>
                  : <input type='text' placeholder='Add college'
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewCollege(e.target.value)} ></input>}
              </div>
            </div>
            {/* HOMETOWN */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3 items-center'>
                <IoLocationSharp size={22} style={{ color: "#8C939D" }} />
                {newHometown
                  ? editIntro
                    ? <input type='text' value={newHometown} onChange={(e: any) => setNewHometown(e.target.value)}
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'></input>
                    : <span>{newHometown}</span>
                  : <input type='text' placeholder='Add your hometown'
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text
               shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewHometown(e.target.value)} ></input>}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              {/* RELATION */}
              <div className='flex gap-3 items-center'>
                <AiFillHeart size={22} style={{ color: "#8C939D" }} />
                {newRelationship ? (
                  editIntro ? (
                    <select
                      className='w-full p-2 text-fb-gray-text border border-fb-gray-text shadow-sm rounded-md outline-none'
                      value={newRelationship}
                      onChange={(e: any) => setNewRelationship(e.target.value)}
                    >
                      <option value="Single">Single</option>
                      <option value="In a relationship">In a relationship</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  ) : (
                    <span>{newRelationship}</span>
                  )
                ) : (
                  <select
                    className='w-full p-2 text-fb-gray-text border border-fb-gray-text shadow-sm rounded-md outline-none'
                    onChange={(e: any) => setNewRelationship(e.target.value)}
                  >
                    <option value="">-- Select Relationship Status --</option>
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                )}

              </div>
              <div className='flex items-center '>
                {editIntro
                  ? <span>{(newRelationship === "In a relationship") ? "with"
                    : (newRelationship === "Married") && "to"}</span>
                  : <span>{(newRelationship === "In a relationship" && newRelationshipToUser?.length > 0) ? "with"
                    : (newRelationship === "Married" && newRelationshipToUser?.length > 0) && "to"}</span>}
              </div>
              {/* RELATIONSHIP TO */}
              {editIntro
                ? (newRelationship === "In a relationship" || newRelationship === "Married")
                &&
                <Tippy interactive
                  render={() => (
                    <div className="box addOn-box py-1 px-2 bg-white rounded-lg w-[608px] flex gap-2 flex-col mt-[-2px] ml-[-43px]">
                      {matchedUsers?.map((user) => (
                        < div
                          key={user?.id}
                          className="flex items-center gap-3 mx-1 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
                          onClick={() => handleAddPartner(user)}
                        >
                          <div className="w-8 h-8 rounded-full">
                            <img
                              src={user?.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full overflow-hidden object-cover"
                            />
                          </div>
                          {user?.first_name} {user?.last_name}
                        </div>
                      ))}

                    </div>
                  )}
                  visible={showTooltip}
                >
                  <input
                    type='text'
                    placeholder="Partner"
                    onChange={handleInputPartner}
                    className='p-2 text-fb-gray-text border border-fb-gray-text shadow-sm rounded-md outline-none'
                    value={newRelationshipToUser[0]?.first_name}
                  />
                </Tippy>
                : newRelationshipToUser.length > 0
                && <span>
                  {partner}
                </span>}
            </div>




          </div>
        </Scrollbars >
        <button className={`w-[85%] mt-2 mb-3 bg-blue-100 mx-3 py-[6px] rounded-md  text-fb-blue
        font-semibold cursor-pointer hover:bg-blue-200`}
          onClick={handleEditInfo}>
          Edit your About info
        </button>
      </div >

    </div >

  )
}

export default EditProfile