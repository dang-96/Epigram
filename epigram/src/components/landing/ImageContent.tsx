export default function ImageContent() {
  const contentWrap =
    'mx-auto flex w-full max-w-[1200px] items-end justify-between py-[180px]';
  const imageClass =
    'h-[388px] w-[744px] rounded-2xl border-[1px] border-[#D2D9E3] bg-blue-200 bg-center bg-cover bg-no-repeat';
  const bigText = 'mb-10 text-[32px] font-bold leading-normal';
  const smallText = 'text-2xl font-medium leading-normal text-blue-600';
  return (
    <div className="relative bg-background pb-[30px] pt-[60px]">
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
          className="text-left"
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
        >
          <h3 className={bigText}>
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
          className="text-right"
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
          className={imageClass}
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
          className="text-left"
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
