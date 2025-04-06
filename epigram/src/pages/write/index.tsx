import Loading from '@/components/share/Loading';
import { postEpigram } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Write() {
  const subTitleClass = clsx(
    'mb-2 text-sm font-semibold',
    'sm:text-base',
    'xl:mb-7 xl:text-xl'
  );
  const contentMb = clsx('relative mb-10', 'xl:mb-14');
  const inputTextClass = clsx(
    'h-11 w-full rounded-lg border-[1px] border-blue-300 px-4 py-2 text-base font-normal placeholder:text-blue-400 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:placeholder:text-gray-300',
    'xl:h-16 xl:rounded-xl xl:py-4 xl:text-xl'
  );
  const customInputRadio = clsx(
    'flex h-5 w-5 appearance-none items-center justify-center rounded-full border-[1px] border-blue-300 checked:border-blue-500 checked:before:block checked:before:h-[10px] checked:before:w-[10px] checked:before:rounded-full checked:before:bg-blue-800',
    'xl:h-6 xl:w-6 xl:border-2 xl:checked:before:h-3 xl:checked:before:w-3'
  );
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

  // 에피그램 작성
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
      router.push('/feed');
      return response;
    } catch (error) {
      console.log('에피그램 작성 api 호출 에러', error);
      throw new Error('에피그램 작성 api 호출에 실패했습니다.');
    }
  };

  // 저자의 radio 체크값에 따른 author값 지정
  useEffect(() => {
    switch (isRadio) {
      case 'manual':
        setValue('author', '', {
          shouldValidate: true,
          shouldDirty: true,
        });
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
    return <Loading height={160} width={640} />;
  }

  if (userDataError) {
    return <div>에러</div>;
  }

  return (
    <div className={clsx('px-[10px] py-6', 'sm:py-8', 'xl:px-5 xl:py-14')}>
      <div className="mx-auto w-full max-w-[640px]">
        <h2
          className={clsx(
            'mb-6 text-base font-semibold',
            'sm:mb-8 sm:text-xl',
            'xl:mb-10 xl:text-2xl'
          )}
        >
          에피그램 만들기
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={contentMb}>
            <h3 className={subTitleClass}>
              <label htmlFor="feedContent">내용</label>{' '}
              <span className="text-lg text-red">*</span>
            </h3>
            <textarea
              id="feedContent"
              className={clsx(
                'h-32 w-full resize-none rounded-lg border-[1px] border-blue-300 px-4 py-[10px] text-base font-normal placeholder:text-blue-400',
                'xl:h-36 xl:rounded-xl xl:text-xl',
                errors.content && 'border-red focus:border-red'
              )}
              placeholder="500자 이내로 입력해주세요."
              maxLength={500}
              {...register('content', { required: '내용을 입력해주세요.' })}
            ></textarea>
            {errors.content && (
              <p
                className={clsx(
                  'absolute bottom-[-22px] left-0 text-sm text-red',
                  'xl:text-base'
                )}
              >
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
            <div
              className={clsx(
                'mb-3 flex items-center justify-start gap-6',
                'xl:mb-4'
              )}
            >
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
                      className={clsx(
                        'text-base font-medium text-black-600',
                        'xl:text-xl'
                      )}
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
              <p
                className={clsx(
                  'absolute bottom-[-28px] left-0 text-sm text-red',
                  'xl:text-base'
                )}
              >
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
                errors.referenceUrl && 'border-red focus:border-red'
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
              <p
                className={clsx(
                  'absolute bottom-[-28px] left-0 text-sm text-red',
                  'xl:text-base'
                )}
              >
                {String(errors.referenceUrl?.message) || '오류가 발생했습니다.'}
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
                className={clsx(
                  'absolute right-4 top-[50%] h-8 min-w-16 translate-y-[-50%] rounded-lg bg-black-500 text-sm font-semibold text-white disabled:bg-[#CBD3E1]',
                  'xl:h-12 xl:min-w-20 xl:rounded-xl xl:text-base'
                )}
                onClick={handleAddTag}
              >
                추가
              </button>
            </div>
            {tagList.length > 0 && (
              <ul className={clsx('flex flex-wrap gap-3', 'xl:gap-4')}>
                {tagList.map((tag, index) => {
                  return (
                    <li
                      key={tag}
                      className={clsx(
                        'relative flex h-12 items-center justify-center rounded-xl bg-background px-3 text-base font-normal text-black-300',
                        'xl:h-14 xl:text-xl'
                      )}
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
                'h-12 w-full rounded-xl bg-black-500 text-base font-semibold text-white disabled:bg-[#CBD3E1]',
                'xl:h-16 xl:text-xl'
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
