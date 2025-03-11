import ImageContent from '@/components/landing/ImageContent';
import KeyVisual from '@/components/landing/KeyVisual';
import LandingLast from '@/components/landing/LandingLast';
import UserEpigram from '@/components/landing/UserEpigram';
import CalendarEmotion from '@/components/myPage/CalendarEmotion';

export default function Landing() {
  return (
    <div>
      <KeyVisual />
      <ImageContent />
      <UserEpigram />
      <LandingLast />
    </div>
  );
}
