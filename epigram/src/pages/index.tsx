import ImageContent from '@/components/landing/ImageContent';
import KeyVisual from '@/components/landing/KeyVisual';
import LandingLast from '@/components/landing/LandingLast';
import UserEpigram from '@/components/landing/UserEpigram';

export default function Landing() {
  return (
    <div className="overflow-hidden">
      <KeyVisual />
      <ImageContent />
      <UserEpigram />
      <LandingLast />
    </div>
  );
}
