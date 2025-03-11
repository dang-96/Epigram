import { patchProfileImage, postImageUrl } from '@/lib/apis/api';
import { useAuth } from '@/lib/context/AuthContext';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ModalFrame from '../modal/ModalFrame';
import NicknameModifyModal from '../modal/NicknameModifyModal';
import { useQueryClient } from '@tanstack/react-query';
import { useModifyNickname } from '@/lib/hooks/useModifyNickname';

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();
  const { userData, refetch } = useUserInfo();
  const { isOpen, setIsOpen, handleModifyNickname } = useModifyNickname();
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.invalidateQueries<any>(['myComment']);
    refetch;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const imageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await postImageUrl(formData);

      if (res) {
        await patchProfileImage({
          nickname: userData?.nickname,
          image: res.url,
        });
        handleRefetch();
      }
    } catch (error) {
      console.log('프로필 이미지 업로드 api 호출 에러', error);
      throw new Error('프로필 이미지 업로드 api 호출에 실패했습니다.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0];

    if (fileData) {
      imageUrl(fileData);
    }
  };

  return (
    <>
      <ModalFrame isOpen={isOpen} setIsOpen={setIsOpen}>
        <NicknameModifyModal
          setIsOpen={setIsOpen}
          userImage={userData?.image}
          handleModifyNickname={handleModifyNickname}
          refetch={handleRefetch}
        />
      </ModalFrame>
      <div className="mb-24 flex translate-y-[-60px] flex-col items-center justify-center">
        <div
          style={{
            backgroundImage: `url(${userData?.image || '/images/profile-default.png'})`,
          }}
          className="relative h-[120px] w-[120px] rounded-full border-2 border-blue-300 bg-white bg-cover bg-center"
        >
          <input
            type="file"
            id="imageChange"
            className="absolute bottom-0 right-0 h-0 w-0"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageChange"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-300"
          >
            <Image
              src="/icons/camera-ico.svg"
              width={22}
              height={22}
              alt="카메라 아이콘"
            />
          </label>
        </div>
        <div className="relative mb-6 mt-4 gap-2">
          <span className="text-2xl font-medium text-black-950">
            {userData?.nickname}
          </span>
          <button
            type="button"
            className="absolute right-[-28px] top-[50%] translate-y-[-50%]"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Image
              src="/icons/setting-ico.svg"
              width={22}
              height={22}
              alt="설정 아이콘"
            />
          </button>
        </div>
        <button
          type="button"
          className="h-12 w-[120px] rounded-[100px] bg-line-100 text-xl font-medium text-gray-300"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
