import { postEpigram } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Write() {
  const subTitleClass = 'mb-7 text-xl font-semibold';
  const contentMb = 'relative mb-14';
  const inputTextClass =
    'h-16 w-full rounded-xl border-[1px] border-blue-300 p-4 text-xl font-normal placeholder:text-blue-400 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:placeholder:text-gray-300';
  const customInputRadio =
    'flex h-6 w-6 appearance-none items-center justify-center rounded-full border-2 border-blue-300 checked:border-blue-500 checked:before:block checked:before:h-3 checked:before:w-3 checked:before:rounded-full checked:before:bg-blue-800';
  const radioList = [
    {
      id: 'manual',
      text: '직접 입력',
    },
    {
      id: 'unknown',
      text: '알 수 없음',
    },
    {
      id: 'self',
      text: '본인',
    },
  ];
  const [tagList, setTagList] = useState<string[]>([]); // 태그 리스트
  const [inputTag, setInputTag] = useState<string>(''); // 태그 input값
  const [isRadio, setIsRadio] = useState<string>('manual'); // 저자 체크값
  const { userData, userDataLoading, userDataError } = useUserInfo(); // 유저 정보
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    shouldFocusError: true, // 에러가 발생한 input에 포커스 적용
  });

  // 태그 리스트 추가
  const handleAddTag = () => {
    if (inputTag !== '') {
      const newInputTag = inputTag.trim();

      setTagList((prev) => [...prev, newInputTag]);
      setInputTag('');
    }
  };

  // 태그 리스트 삭제
  const handleDeleteTag = (removeIndex: number) => {
    setTagList((prev) => prev.filter((_, index) => index !== removeIndex));
  };

  const onSubmit = async (data: any) => {
    const defaultUrl =
      data.referenceUrl === '' ? 'https://example.com' : data.referenceUrl;
    try {
      const response = await postEpigram({
        tags: tagList,
        referenceUrl: defaultUrl,
        referenceTitle: data.referenceTitle,
        author: data.author,
        content: data.content,
      });

      reset();
      console.log(response);
      router.push('/feed');
      return response;
    } catch (error) {
      console.log('에피그램 작성 api 호출 에러', error);
      // throw new Error('에피그램 작성 api 호출에 실패했습니다.');
    }
  };

  useEffect(() => {
    switch (isRadio) {
      case 'manual':
        setValue('author', '정훈', { shouldValidate: true, shouldDirty: true });
        break;
      case 'unknown':
        setValue('author', '익명', {
          shouldValidate: true,
          shouldDirty: true,
        });
        break;
      case 'self':
        setValue('author', userData.nickname, {
          shouldValidate: true,
          shouldDirty: true,
        });
        break;
      default:
        setValue('author', '', { shouldValidate: true, shouldDirty: true });
    }
  }, [isRadio, setValue]);

  if (userDataLoading) {
    return <div>로딩중</div>;
  }

  if (userDataError) {
    return <div>에러</div>;
  }

  return (
    <div className="py-14">
      <div className="mx-auto w-full max-w-[640px]">
        <h2 className="mb-10 text-2xl font-semibold">에피그램 만들기</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={contentMb}>
            <h3 className={subTitleClass}>
              <label htmlFor="feedContent">내용</label>{' '}
              <span className="text-lg text-red">*</span>
            </h3>
            <textarea
              id="feedContent"
              className={clsx(
                'h-36 w-full resize-none rounded-xl border-[1px] border-blue-300 px-4 py-[10px] text-xl font-normal placeholder:text-blue-400',
                errors.content && 'border-red focus:border-red'
              )}
              placeholder="500자 이내로 입력해주세요."
              maxLength={500}
              {...register('content', { required: '내용을 입력해주세요.' })}
            ></textarea>
            {errors.content && (
              <p className="absolute bottom-[-22px] left-0 text-base text-red">
                {String(errors.content?.message) || '오류가 발생했습니다.'}
              </p>
            )}
          </div>

          <div className={contentMb}>
            <h3 className={subTitleClass}>
              <label htmlFor="author">
                저자 <span className="text-sm text-red">*</span>
              </label>
            </h3>
            <div className="mb-4 flex items-center justify-start gap-6">
              {radioList.map((radio) => {
                return (
                  <div
                    key={radio.id}
                    className="flex items-center justify-start gap-2"
                  >
                    <input
                      id={radio.id}
                      type="radio"
                      name="author"
                      className={customInputRadio}
                      checked={isRadio === radio.id}
                      onChange={() => {
                        setIsRadio(radio.id);
                      }}
                    />
                    <label
                      htmlFor={radio.id}
                      className="text-xl font-medium text-black-600"
                    >
                      {radio.text}
                    </label>
                  </div>
                );
              })}
            </div>

            <input
              type="text"
              id="author"
              className={clsx(
                inputTextClass,
                errors.author && 'border-red focus:border-red'
              )}
              placeholder="저자 이름 입력"
              disabled={isRadio !== 'manual'}
              {...register('author', { required: '저자를 입력해주세요.' })}
            />
            {errors.author && (
              <p className="absolute bottom-[-28px] left-0 text-base text-red">
                {String(errors.author?.message) || '오류가 발생했습니다.'}
              </p>
            )}
          </div>

          <div className={clsx(contentMb, 'relative')}>
            <h3 className={subTitleClass}>출처</h3>
            <input
              type="text"
              className={clsx(inputTextClass, 'mb-4')}
              placeholder="출처 제목 입력"
              {...register('referenceTitle')}
            />
            <input
              type="text"
              className={clsx(
                inputTextClass,
                errors.sourceUrl && 'border-red focus:border-red'
              )}
              placeholder="URL (ex. https://www.website.com)"
              {...register('referenceUrl', {
                pattern: {
                  value: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                  message: '유효한 URL을 입력해주세요.',
                },
              })}
            />
            {errors.referenceUrl && (
              <p className="absolute bottom-[-28px] left-0 text-base text-red">
                {String(errors.sourceUrl?.message) || '오류가 발생했습니다.'}
              </p>
            )}
          </div>

          <div className={contentMb}>
            <h3 className={subTitleClass}>태그</h3>
            <div className="relative mb-5">
              <input
                type="text"
                className={clsx(inputTextClass, 'pr-[100px]')}
                placeholder="입력하여 태그 작성 (최대 10자)"
                value={inputTag}
                onChange={(e) => {
                  setInputTag(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute right-4 top-[50%] h-12 min-w-20 translate-y-[-50%] rounded-xl bg-black-500 font-semibold text-white disabled:bg-[#CBD3E1]"
                onClick={handleAddTag}
              >
                추가
              </button>
            </div>
            {tagList.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {tagList.map((tag, index) => {
                  return (
                    <li
                      key={tag}
                      className="relative flex h-14 items-center justify-center rounded-xl bg-background px-3 text-xl font-normal text-black-300"
                    >
                      {tag}
                      <button
                        type="button"
                        className="absolute right-[-5px] top-[-5px] flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 pb-[2px] text-sm font-semibold text-white"
                        onClick={() => {
                          handleDeleteTag(index);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div>
            <button
              type="submit"
              className={clsx(
                'h-16 w-full rounded-xl bg-black-500 text-xl font-semibold text-white disabled:bg-[#CBD3E1]'
              )}
              disabled={!isValid}
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
