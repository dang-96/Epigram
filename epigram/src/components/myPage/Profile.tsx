import { patchProfileImage, postImageUrl } from '@/lib/apis/api';
import { useAuth } from '@/lib/context/AuthContext';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ModalFrame from '../modal/ModalFrame';
import NicknameModifyModal from '../modal/NicknameModifyModal';
import { useQueryClient } from '@tanstack/react-query';
import { useModifyNickname } from '@/lib/hooks/useModifyNickname';
import clsx from 'clsx';

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
    router.push('/');
    logout();
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
      <div
        className={clsx(
          'mb-14 flex translate-y-[-40px] flex-col items-center justify-center',
          'xl:mb-24 xl:translate-y-[-60px]'
        )}
      >
        <div
          style={{
            backgroundImage: `url(${userData?.image || '/images/profile-default.png'})`,
          }}
          className={clsx(
            'relative h-20 w-20 rounded-full border-2 border-blue-300 bg-white bg-cover bg-center',
            'xl:h-[120px] xl:w-[120px]'
          )}
        >
          <input
            type="file"
            id="imageChange"
            className="absolute bottom-0 right-0 h-0 w-0"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageChange"
            className={clsx(
              'absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-300',
              'xl:h-8 xl:w-8'
            )}
          >
            <Image
              src="/icons/camera-ico.svg"
              className={clsx(
                'mb-[1px] h-4 w-4',
                'xl:w-[22px xl:mb-0] xl:h-[22px]'
              )}
              width={22}
              height={22}
              alt="카메라 아이콘"
            />
          </label>
        </div>
        <div className={clsx('relative mb-4 mt-2 gap-2', 'xl:mb-6 xl:mt-4')}>
          <span
            className={clsx(
              'text-base font-medium text-black-950',
              'xl:text-2xl'
            )}
          >
            {userData?.nickname}
          </span>
          <button
            type="button"
            className={clsx(
              'absolute right-[-24px] top-[50%] translate-y-[-50%]',
              'xl:right-[-28px]'
            )}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Image
              src="/icons/setting-ico.svg"
              className={clsx('h-5 w-5', 'xl:h-[22px] xl:w-[22px]')}
              width={22}
              height={22}
              alt="설정 아이콘"
            />
          </button>
        </div>
        <button
          type="button"
          className={clsx(
            'h-9 w-20 rounded-[100px] bg-line-100 text-sm font-medium text-gray-300',
            'sm:text-base',
            'xl:h-12 xl:w-[120px] xl:text-xl'
          )}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
