import clsx from 'clsx';

export default function ImageContent() {
  const contentWrap = clsx(
    'mx-auto flex w-full max-w-[1200px] flex-col items-center  gap-10 px-[10px] py-[98px]',
    'sm:py-[110px]',
    'xl:flex-row xl:items-end xl:justify-between xl:px-5 xl:py-[180px]'
  );
  const imageClass = clsx(
    'h-[210px] w-full max-w-[744px] rounded-2xl border-[1px] border-[#D2D9E3] bg-blue-200 bg-cover bg-center bg-no-repeat',
    'sm:h-[388px]'
  );
  const bigText = clsx(
    'mb-[16px] text-[24px] font-bold leading-normal',
    'sm:mb-[20px]',
    'xl:mb-10 xl:text-[32px]'
  );
  const smallText = clsx(
    'text-base font-medium leading-normal text-blue-600',
    'xl:text-2xl'
  );
  return (
    <div
      className={clsx(
        'relative bg-background pt-[30px]',
        'xl:pb-[30px] xl:pt-[60px]'
      )}
    >
      <div
        className="absolute left-0 top-0 z-10 h-[15px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/line-top.png)' }}
      />

      <div className={contentWrap}>
        <div
          className={imageClass}
          style={{ backgroundImage: 'url(/images/landing01.png)' }}
          data-aos="fade-right"
          data-aos-duration="1500"
        />
        <div
          className={clsx('w-full text-left ', 'sm:max-w-[744px]', 'xl:w-auto')}
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
        >
          <h3 className={clsx(bigText, 'xl-text')}>
            명언이나 글귀,
            <br />
            토막 상식들을 공유해 보세요.
          </h3>
          <p className={smallText}>
            나만 알던 소중한 글들을
            <br /> 다른 사람들에게 전파하세요.
          </p>
        </div>
      </div>

      <div className={contentWrap}>
        <div
          className={clsx(
            'order-2 w-full text-right',
            'sm:max-w-[744px]',
            'xl:order-1 xl:w-auto'
          )}
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
        >
          <h3 className={bigText}>
            감정 상태에 따라,
            <br />
            알맞은 위로를 받을 수 있어요.
          </h3>
          <p className={smallText}>태그를 통해 글을 모아 볼 수 있어요.</p>
        </div>
        <div
          className={clsx(imageClass, 'order-1', 'xl:order-2')}
          style={{ backgroundImage: 'url(/images/landing02.png)' }}
          data-aos="fade-left"
          data-aos-duration="1500"
        />
      </div>

      <div className={contentWrap}>
        <div
          className={imageClass}
          style={{ backgroundImage: 'url(/images/landing03.png)' }}
          data-aos="fade-right"
          data-aos-duration="1500"
        />
        <div
          className={clsx('w-full text-left ', 'sm:max-w-[744px]', 'xl:w-auto')}
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
        >
          <h3 className={bigText}>
            내가 요즘 어떤 감정 상태인지
            <br />
            통계로 한눈에 볼 수 있어요.
          </h3>
          <p className={smallText}>
            감정 달력으로
            <br />내 마음에 담긴 감정을 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
